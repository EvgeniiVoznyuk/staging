#!/usr/bin/env bash

set -e

LOCALIMAGE=${HARBOR_PROJECT}/${DEPLOYMENT_NAME}
HELM_CHART_NAME=simple-app
HELM_VALUES_DIR=deployment/helm
HARBOR_CHARTREPO_URL="https://${HARBOR_ENDPOINT}/chartrepo/"

versionize () {
    local VERSION_FILE=VERSION

    if ! test -f ${VERSION_FILE}; then echo "0-0-null" > ${VERSION_FILE}; fi

    if [[ -z "${CI}" ]]; then
        echo $(git rev-parse --short HEAD)-$(($(cat ${VERSION_FILE} | awk -F "-" '{print $2}') + 1))-${BITBUCKET_BRANCH} > ${VERSION_FILE}
    else
        echo ${BITBUCKET_COMMIT}-${BITBUCKET_BUILD_NUMBER}-${BITBUCKET_BRANCH} > ${VERSION_FILE}
    fi
}

docker_image_build () {
    echo  Building image ${DEPLOYMENT_NAME}...

    local VERSION=$(cat VERSION)

    docker build -t ${LOCALIMAGE}:${VERSION} -f ./deployment/docker/Dockerfile ./ --build-arg NGINX_VERSION=${DOCKER_NGINX_VERSION_TAG}

    IMAGE=${HARBOR_ENDPOINT}/${HARBOR_PROJECT}/${DEPLOYMENT_NAME}:${VERSION}

    docker tag ${LOCALIMAGE}:${VERSION} ${IMAGE}
}

docker_image_push () {
    echo Pushing deploy ${DEPLOYMENT_NAME} to remote REPO ...

    docker login ${HARBOR_ENDPOINT} -u ${HARBOR_USER} -p ${HARBOR_PASSWORD}
    docker push ${IMAGE}
}

helm_install_or_upgrade () {
    echo Running Helm...

    [[ -f $(pwd)/helm ]] && HELM_BIN='./helm' || HELM_BIN='helm'

    ${HELM_BIN} repo add stable ${HARBOR_CHARTREPO_URL}${HARBOR_PROJECT} --password ${HARBOR_PASSWORD} --username ${HARBOR_USER}
    ${HELM_BIN} repo update

    local DEPLOYS=$(${HELM_BIN} ls | grep ${DEPLOYMENT_NAME}-${DEPLOYMENT_ENV} | wc -l)

    if  [[ -z ${HELM_CHART_VERSION} ]] || [[ "${HELM_CHART_VERSION}" = 'latest' ]]; then
        HELM_CHART_VERSION_STRING=''
    else
        HELM_CHART_VERSION_STRING=$(echo "--version="${HELM_CHART_VERSION})
    fi

    if [[ ${DEPLOYS}  -eq 0 ]]; then
        echo install...
        ${HELM_BIN} install --name=${DEPLOYMENT_NAME}-${DEPLOYMENT_ENV} ${HELM_CHART_VERSION_STRING} stable/${HELM_CHART_NAME} -f ${HELM_VALUES_DIR}/values.${DEPLOYMENT_ENV}.yaml --namespace=${KUBE_NAMESPACE} --set image.name=${IMAGE}
    else
        echo upgrade...
        ${HELM_BIN} upgrade ${DEPLOYMENT_NAME}-${DEPLOYMENT_ENV} ${HELM_CHART_VERSION_STRING} stable/${HELM_CHART_NAME} -f ${HELM_VALUES_DIR}/values.${DEPLOYMENT_ENV}.yaml --set image.name=${IMAGE}
    fi
}

case ${1} in
    upgrade-deploy)
        versionize
        docker_image_build
        docker_image_push
        helm_install_or_upgrade
        ;;
    versionize)
        versionize
        ;;
    *)
        echo $"Usage: $0 {upgrade-deploy|versionize}"
        exit 1
        ;;
esac
