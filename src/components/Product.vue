<template>
  <div class="container">
    <Navbar/>
    <div class="banner d-flex justify-content-center align-items-center">
      <div class="banner-text">
        <vue-typed-js :strings="['公~我回來了，你呢?']"
        :fadeOut="true">
          <h1 class="text-white typing">
          </h1>
        </vue-typed-js>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

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
