<template>
  <div>
    <audio loop muted webkit-playsinline="true" playsinline="true" id="roBGM">
      <source src="@/assets/robgm.mp3" type="audio/mpeg">
    </audio>
    <div class="play-bgm">
      <a href="#">
        <font-awesome-icon
        :icon="['fas','sync']"
        spin size="3x"
        id="stopBGM"
        class="text-primary"
        data-container="body"
        data-toggle="popover"
        data-trigger="hover"
        data-placement="top"
        data-content="停止播放BGM"
        @click.prevent="stopBGM"
        v-if="bgmStatus"/>
        <font-awesome-icon
        :icon="['fas','play-circle']"
        size="3x"
        id="playBGM"
        class="text-primary"
        data-container="body"
        data-toggle="popover"
        data-trigger="hover"
        data-placement="top"
        data-content="播放BGM"
        @click.prevent="playBGM"
        v-else/>
      </a>
    </div>
  </div>
</template>

<script>
/* global $ */

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
        vm.bgmStatus = false;
      } else {
        vm.bgmStatus = true;
      }
      BGM.volume = 0.2;
    },
    stopBGM() {
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
    $(() => {
      $('[data-toggle="popover"]').popover();
    });
    this.roBGM();
  },
};
</script>
