<template>
  <div>
    <Navbar/>
    <router-view/>
    <Footer/>
    <BGM/>
  </div>
</template>

<style lang="scss">
.play-bgm {
  position: fixed;
  right: 30px;
  bottom: 20px;
  z-index: 10;
}
</style>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BGM from '@/components/pages/BGM';

export default {
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Footer,
    BGM,
  },
};
</script>
