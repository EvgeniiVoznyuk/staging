<template>
  <div class="address-wrapper d-flex h-100">
    <AddressModal />

    <b-card class="address-card">
      <div class="address-card__inner">
        <div class="address-card__left">
          <div class="address-card__coin-info">
            <div class="coin-container mb-2 mb-md-0 mr-md-4">
              <img
                :src="coinIcon"
                alt="Coin"
                class="coin-icon">
            </div>
            <div class="address-card__container">
              <h1 class="mb-2 mb-md-0 address-card__title">
                <slot name="main-title">
                  {{ name }}:
                </slot>
                <span class="address-card__address">
                  {{ address }}
                  <b-button variant="link"
                            class="p-0 ml-1 mb-2"
                            v-if="address"
                            v-clipboard:copy="address"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onCopyError">
                    <i class="fa fa-copy fa-lg fs-18"></i>
                  </b-button>
                </span>
              </h1>
              <h2 class="address-card__subtitle grey">
                <slot name="main-subtitle">
                  {{ $t('common.youCanLease') }}
                </slot>
              </h2>
            </div>
          </div>

          <slot name="extra-block">
          </slot>
        </div>

        <!-- TODO: if there are more uniquely handled coins, implement more universal approach -->
        <div class="address-card__right">
          <b-button
            variant="warning"
            size="lg"
            v-b-modal.AddressModal>
            {{ $t('common.addAddressToDashboard') }}
          </b-button>
        </div>
      </div>

      <template slot="footer">
        <div class="address-card__footer">
          <slot name="address-card-footer">
          </slot>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import AddressModal from '@/components/eth2/AddressModalNew.vue';

export default {
  name: 'AddressCardNew',
  components: {
    AddressModal,
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    address: {
      type: String,
    },
    coinIcon: {
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    onCopy() {
      this.showSuccessfulMsg({
        title: this.$t('notifications.success'),
        message: this.$t('notifications.copied'),
      });
    },
    onCopyError() {
      this.showErrorMsg({
        title: this.$t('notifications.error'),
        message: this.$t('notifications.failedToCopy'),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-card {
  flex: 1 0 100%;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__coin-info {
    display: flex;
    align-items: center;
    margin: 0 10px 10px 0;
  }

  &__title {
    font-size: 28px;
  }

  &__subtitle {
    font-size: 20px;
  }

  &__address {
    display: inline-block;
    vertical-align: middle;
    /*padding-bottom: 2px;*/
    font-size: 20px;
    color: $yellow--dark;
    word-break: break-all;
  }

  &__footer {
    color: $grey;
    text-align: center;
    font-size: 16px;
  }
}

.coin-container {
  background: $yellow;
  width: 88px;
  height: 88px;
  min-width: 88px;
  border: 9px solid $yellow--dark;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coin-icon {
  max-width: 34px;

  &--remme, &--daobet {
    max-width: 54px;
  }
}

@media(max-width: 1440px) {
  .address-card {
    &__title {
      font-size: 24px;
    }

    &__subtitle {
      font-size: 18px;
    }
  }
}

@media(max-width: 1199px) {
  .address-card {
    &__inner {
      flex-direction: column;
    }

    &__coin-info {
      margin-bottom: 18px;
    }
  }
}

@media(max-width: 767px) {
  .address-card {
    max-width: 100%;

    &__left,
    &__container {
      max-width: 100%;
    }

    &__coin-info {
      flex-direction: column;
      text-align: center;
    }

    &__address {
      display: block;
    }
  }
}
</style>
