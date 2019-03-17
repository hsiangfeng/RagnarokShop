<template>
  <div>
    <audio loop muted webkit-playsinline="true" playsinline="true" id="roBGM">
      <source src="@/assets/08.mp3" type="audio/mpeg">
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
        @click.prevent="musicStatus"
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
        @click.prevent="musicStatus"
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
  mounted() {
    $(() => {
      $('[data-toggle="popover"]').popover();
    });
    this.roBGM();
  },
};
</script>
