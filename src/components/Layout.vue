<template lang="pug">
  div
    Navbar
    router-view
    Footer
    audio#roBGM(loop='', muted='', webkit-playsinline='true', playsinline='true')
      source(src='@/assets/08.mp3', type='audio/mpeg')
    .play-bgm
      a(href='#')
        font-awesome-icon#stopBGM.text-primary(:icon="['fas','sync']", spin='', size='3x', data-container='body', data-toggle='popover', data-trigger='hover', data-placement='top', data-content='停止播放BGM', @click.prevent='musicStatus', v-if='bgmStatus')
        font-awesome-icon#playBGM.text-primary(:icon="['fas','play-circle']", size='3x', data-container='body', data-toggle='popover', data-trigger='hover', data-placement='top', data-content='播放BGM', @click.prevent='musicStatus', v-else='')
</template>

<style lang="scss">
.play-bgm {
  position: fixed;
  right: 50px;
  bottom: 30px;
  z-index: 10;
}
</style>

<script>
/* global $ */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  data() {
    return {
      bgmStatus: false,
    };
  },
  methods: {
    roBGM() {
      const vm = this;
      const BGM = document.getElementById('roBGM');
      if (BGM.paused) {
        vm.bgmStatus = true;
        BGM.play();
      }
      BGM.volume = 0.2;
    },
    musicStatus() {
      const vm = this;
      const roBGM = document.getElementById('roBGM');
      if (roBGM.paused) {
        vm.bgmStatus = true;
        roBGM.play();
      } else {
        vm.bgmStatus = false;
        roBGM.pause();
      }
    },
  },
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    $(() => {
      $('[data-toggle="popover"]').popover();
    });
    this.roBGM();
  },
};
</script>
