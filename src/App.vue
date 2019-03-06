<template>
  <div id="app">
    <router-view/>
    <audio autoplay loop id="roBGM">
      <source src="./assets/robgm.mp3" type="audio/mpeg"/>
    </audio>
    <div class="play-bgm">
      <a href="#" @click.prevent="stopBGN" v-if="bgmStatus">
        <font-awesome-icon :icon="['fas','sync']"
        spin size="3x"
        class="text-primary"/>
      </a>
      <a href="#" @click.prevent="playBGM" v-else>
        <font-awesome-icon :icon="['fas','play-circle']"
        size="3x"
        class="text-primary"
        id="bgmPaly"/>
      </a>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      bgmStatus: true,
    };
  },
  methods: {
    roBGM() {
      const BGM = document.getElementById('roBGM');
      BGM.volume = 0.2;
    },
    stopBGN() {
      const BGM = document.getElementById('roBGM');
      BGM.pause();
      this.bgmStatus = false;
    },
    playBGM() {
      const BGM = document.getElementById('roBGM');
      BGM.play();
      this.bgmStatus = true;
    },
  },
  mounted() {
    this.roBGM();
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
body{
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Microsoft JhengHei",
  Roboto, "Helvetica Neue", Arial, sans-serif;
}
.play-bgm{
  position: fixed;
  right: 30px;
  bottom: 20px;
  z-index: 10;
}
</style>
