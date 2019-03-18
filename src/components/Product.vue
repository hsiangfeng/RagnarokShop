<template lang="pug">
  div
    navbar
      .banner.d-flex.justify-content-center.align-items-center
        .banner-text
          vue-typed-js(:strings="['公~我回來了~']", :fadeout='true')
            h3.text-white.typing
      div
        router-view
      footer
        audio#roBGM(loop='', muted='', webkit-playsinline='true', playsinline='true')
          source(src='@/assets/login@2.mp3', type='audio/mpeg')
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  data() {
    return {
    };
  },
  methods: {
    autoPlayMusic() {
      const roBGM = document.getElementById('roBGM');
      if (roBGM.paused) {
        roBGM.play();
        roBGM.volume = 0.2;
      }
    },
  },
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.autoPlayMusic();
  },
};
</script>

<style lang="scss" scoped>
  .banner{
    background-image: url(../assets/img/Product/banner.jpg);
    background-position: center;
    background-repeat: no-repeat;
    padding-top: 60px;
    height: 500px;
  }
  .banner-text {
    background-color: rgba(0, 0, 0, 0.45);
    height: 200px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
  }
  .sticky-top{
    background-color: #fff;
    top: 99.88px;
  }
</style>
