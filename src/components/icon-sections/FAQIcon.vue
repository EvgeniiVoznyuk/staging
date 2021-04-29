<template>
  <FAQ :faq-items="faqItemsIcon">
    <template #question-3-answer-0="answer">
      <i18n path="icx.faq.4.answer[0]">
        <template #guide>
          <a
            href="https://medium.com/everstake/detailed-guide-to-icon-icx-staking-and-voting-how-things-do-exactly-work-d650e75f5ab9"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('icx.faq.4.icxGuide') }}
          </a>
        </template>
      </i18n>
    </template>

    <template #question-11-answer-1="answer">
      <i18n path="icx.faq.12.answer[1]">
        <template #link>
          <a
            href="https://link.medium.com/umTPr6Wts3"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://link.medium.com/umTPr6Wts3
          </a>
        </template>
      </i18n>
    </template>

    <template #question-11-answer-2="answer">
      <i18n path="icx.faq.12.answer[2]">
        <template #link>
          <a
            href="https://link.medium.com/sMQbeDTts3"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://link.medium.com/sMQbeDTts3
          </a>
        </template>
      </i18n>
    </template>

    <template #question-16-answer-0="answer">
      <i18n path="icx.faq.17.answer[0]">
        <template #link>
          <a
            href="https://everstake.one/icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://everstake.one/icon
          </a>
        </template>
      </i18n>
    </template>

    <template #question-16-answer-1="answer">
      <i18n path="icx.faq.17.answer[1]">
        <template #link>
          <a
            href="https://t.me/everstake_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/everstake_bot
          </a>
        </template>
      </i18n>
    </template>

    <template #question-17-answer-0="answer">
      <i18n path="icx.faq.18.answer[0]">
        <template #voteMonitorSite>
          <a
            href="https://icon.community/iconsensus/candidates/"
            target="_blank"
            rel="noopener noreferrer"
            class="d-inline-flex"
          >
            https://iconvotemonitor.com/
          </a>
        </template>
      </i18n>
    </template>
  </FAQ>
</template>

<script>
import FAQ from '@/components/icon-sections/FAQ.vue';

export default {
  name: 'FAQIcon',
  components: {
    FAQ,
  },
  computed: {
    faqItemsIcon() {
      return [
        {
          question: this.$t('icx.faq.1.question'),
          answer: this.$t('icx.faq.1.answer'),
        },
        {
          question: this.$t('icx.faq.2.question'),
          answer: this.$t('icx.faq.2.answer'),
        },
        {
          question: this.$t('icx.faq.3.question'),
          answer: this.$t('icx.faq.3.answer'),
        },
        {
          question: this.$t('icx.faq.4.question'),
          answer: this.$t('icx.faq.4.answer'),
        },
        {
          question: this.$t('icx.faq.5.question'),
          answer: this.$t('icx.faq.5.answer'),
        },
        {
          question: this.$t('icx.faq.6.question'),
          answer: this.$t('icx.faq.6.answer'),
        },
        {
          question: this.$t('icx.faq.7.question'),
          answer: this.$t('icx.faq.7.answer'),
        },
        {
          question: this.$t('icx.faq.8.question'),
          answer: this.$t('icx.faq.8.answer'),
        },
        {
          question: this.$t('icx.faq.9.question'),
          answer: this.$t('icx.faq.9.answer'),
        },
        {
          question: this.$t('icx.faq.10.question'),
          answer: this.$t('icx.faq.10.answer'),
        },
        {
          question: this.$t('icx.faq.11.question'),
          answer: this.$t('icx.faq.11.answer'),
        },
        {
          question: this.$t('icx.faq.12.question'),
          answer: this.$t('icx.faq.12.answer'),
        },
        {
          question: this.$t('icx.faq.13.question'),
          answer: this.$t('icx.faq.13.answer'),
        },
        {
          question: this.$t('icx.faq.14.question'),
          answer: this.$t('icx.faq.14.answer'),
        },
        {
          question: this.$t('icx.faq.15.question'),
          answer: this.$t('icx.faq.15.answer'),
        },
        {
          question: this.$t('icx.faq.16.question'),
          answer: this.$t('icx.faq.16.answer'),
        },
        {
          question: this.$t('icx.faq.17.question'),
          answer: this.$t('icx.faq.17.answer'),
        },
        {
          question: this.$t('icx.faq.18.question'),
          answer: this.$t('icx.faq.18.answer'),
        },
        {
          question: this.$t('icx.faq.19.question'),
          answer: this.$t('icx.faq.19.answer'),
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
