ARG NGINX_VERSION

FROM nginx:${NGINX_VERSION}

COPY ./deployment/docker/nginx.conf.nginx /etc/nginx/conf.d/default.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./dist /webroot

STOPSIGNAL SIGTERM

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
