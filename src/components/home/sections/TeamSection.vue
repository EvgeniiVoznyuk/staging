<template>
  <section class="team" id="team">
    <b-container class="container--custom">
      <h2 class="title title--white">
        {{ $t('home.team') }}
      </h2>

      <div class="team__members">
        <div class="team__row">
          <div class="team__col"
               v-for="(memberObj, index) in members"
               :key="index">
            <TeamMember :photo="memberObj.photo">
              <template slot="position">{{ memberObj.position }}</template>
              <template slot="name">
                {{ memberObj.name.split(' ')[0] }}
                <br>
                {{ memberObj.name.split(' ')[1] }}
              </template>
              <template slot="vitae">{{ memberObj.vitae }}</template>
            </TeamMember>
          </div>
        </div>
        <div class="d-flex justify-content-between"></div>
      </div>
    </b-container>
  </section>
</template>

<script>
import TeamMember from '@/components/home/TeamMember.vue';

// Photos
import Vas from '@/assets/img/members/vas.jpg';
import Fen from '@/assets/img/members/fen.jpg';
import Chern from '@/assets/img/members/chern.jpg';
import Boh from '@/assets/img/members/boh.jpg';
import Vit from '@/assets/img/members/vit.jpg';

export default {
  name: 'TeamSection',
  components: {
    TeamMember,
  },
  data() {
    return {
      members: [
        {
          position: this.$t('home.members.vas.position'),
          name: this.$t('home.members.vas.name'),
          vitae: this.$t('home.members.vas.vitae'),
          photo: Vas,
        },
        {
          position: this.$t('home.members.fen.position'),
          name: this.$t('home.members.fen.name'),
          vitae: this.$t('home.members.fen.vitae'),
          photo: Fen,
        },
        {
          position: this.$t('home.members.chern.position'),
          name: this.$t('home.members.chern.name'),
          vitae: this.$t('home.members.chern.vitae'),
          photo: Chern,
        },
        {
          position: this.$t('home.members.boh.position'),
          name: this.$t('home.members.boh.name'),
          vitae: this.$t('home.members.boh.vitae'),
          photo: Boh,
        },
        {
          position: this.$t('home.members.vit.position'),
          name: this.$t('home.members.vit.name'),
          vitae: this.$t('home.members.vit.vitae'),
          photo: Vit,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .team {
    &__row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      grid-gap: 20px;
      justify-items: start;
      justify-content: space-between;
    }
  }

  @media (max-width: 1199px) {
    .team {
      &__row {
        grid-template-columns: repeat(auto-fit, minmax(236px, 1fr));
      }
    }
  }

  @media (max-width: 991px) {
    .team {
      &__row {
        grid-template-columns: repeat(auto-fit,  1fr);
      }
    }
  }

  @media (max-width: 575px) {
    .team {
      &__row {
        grid-template-columns: repeat(auto-fit, 1fr);
        justify-content: center;
      }
    }
  }
</style>
