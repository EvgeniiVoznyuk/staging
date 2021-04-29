<template>
  <section
    class="mb-5"
  >
    <h2 class="title text-white title--lap mb-sm-5">
      {{ $t('icx.educationMaterials') }}
    </h2>

    <b-row>
      <b-col xl="8">
        <p class="paragraph paragraph--big mb-5">
          {{ $t('icx.educationMaterialsP') }}
        </p>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6">
        <h3 class="title title--white title--medium">
          {{ $t('icx.inEnglish') }}
        </h3>
        <ul
          class="list list--yellow"
        >
          <li
            v-for="(tutorial, index) in tutorials"
            :key="index"
            class="mb-3"
          >
            <a
              :href="tutorial.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ tutorial.title }}
            </a>
          </li>
        </ul>
      </b-col>
      <b-col md="6">
        <h3 class="title title--white title--medium">
          {{ $t('icx.inRussian') }}
        </h3>

        <ul
          class="list list--yellow"
        >
          <li
            v-for="(tutorial, index) in tutorialsRU"
            :key="index"
            class="mb-3"
          >
            <a
              :href="tutorial.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ tutorial.title }}
            </a>
          </li>
        </ul>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { tutorials, tutorialsRU } from '@/constants/iconEducationMaterials';

export default {
  name: 'EducationMaterials',
  data() {
    return {
      tutorials,
      tutorialsRU,
    };
  },
};
</script>

<style scoped>

</style>
