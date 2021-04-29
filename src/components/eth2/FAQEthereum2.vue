<template>
  <FAQ :faq-items="faqItemsEthereum2">
    <template #question-0-answer-0="answer">
      <i18n path="ethereum2.faq.1.answer[0]">
        <template #link>
          <a
            href="https://medium.com/everstake/ethereum-2-0-blockchain-platform-validators-projects-prospects-and-risks-8419be50f8a3"
            target="_blank"
            rel="noopener noreferrer"
            class="d-inline-flex"
          >
            {{ $t('ethereum2.here') }}
          </a>
        </template>
      </i18n>
    </template>

    <template #question-1-answer-0="answer">
      <i18n path="ethereum2.faq.2.answer[0]">
        <template #link>
          <a
            href="https://medium.com/everstake/f-a-q-on-ethereum-2-0-b16056d82b52"
            target="_blank"
            rel="noopener noreferrer"
            class="d-inline-flex"
          >
            {{ $t('ethereum2.here') }}
          </a>
        </template>
      </i18n>
    </template>

    <template #question-3-answer-2="answer">
      <i18n path="ethereum2.faq.4.answer[2]">
        <template #link>
          <a
            href="https://beaconcha.in/"
            target="_blank"
            rel="noopener noreferrer"
            class="d-inline-flex"
          >
            beaconcha.in
          </a>
        </template>
      </i18n>
    </template>

    <template #question-6-answer-0="answer">
      <i18n path="ethereum2.faq.7.answer[0]">
        <template #link>
          <a
            href="https://everstake.one/icon"
            target="_blank"
            rel="noopener noreferrer"
            class="d-inline-flex"
          >
            {{ $t('ethereum2.faq.7.ethereumLaunchpadPage') }}
          </a>
        </template>
      </i18n>
    </template>

    <template #question-7-answer-0="answer">
      <i18n path="ethereum2.faq.8.answer[0]">
        <template #link>
          <a
            href="https://t.me/everstake_bot"
            target="_blank"
            rel="noopener noreferrer"
            class="d-inline-flex"
          >
            {{ $t('ethereum2.here') }}
          </a>
        </template>
      </i18n>
    </template>
  </FAQ>
</template>

<script>
import FAQ from '@/components/eth2/FAQ.vue';

export default {
  name: 'FAQEthereum2',
  components: {
    FAQ,
  },
  computed: {
    faqItemsEthereum2() {
      return [
        {
          question: this.$t('ethereum2.faq.1.question'),
          answer: this.$t('ethereum2.faq.1.answer'),
        },
        {
          question: this.$t('ethereum2.faq.2.question'),
          answer: this.$t('ethereum2.faq.2.answer'),
        },
        {
          question: this.$t('ethereum2.faq.3.question'),
          answer: this.$t('ethereum2.faq.3.answer'),
        },
        {
          question: this.$t('ethereum2.faq.4.question'),
          answer: this.$t('ethereum2.faq.4.answer'),
        },
        {
          question: this.$t('ethereum2.faq.5.question'),
          answer: this.$t('ethereum2.faq.5.answer'),
        },
        {
          question: this.$t('ethereum2.faq.6.question'),
          answer: this.$t('ethereum2.faq.6.answer'),
        },
        {
          question: this.$t('ethereum2.faq.7.question'),
          answer: this.$t('ethereum2.faq.7.answer'),
        },
        {
          question: this.$t('ethereum2.faq.8.question'),
          answer: this.$t('ethereum2.faq.8.answer'),
        },
      ];
    },
  },
};
</script>
