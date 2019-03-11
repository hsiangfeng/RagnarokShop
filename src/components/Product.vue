<template>
  <div>
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
    <ul class="nav justify-content-center nav-tabs sticky-top">
      <li class="nav-item">
        <router-link class="nav-link" to="/ProductList">
          <font-awesome-icon :icon="['fab','hotjar']"/>
          推薦商品
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/ProductList">
          <font-awesome-icon :icon="['fas','chess-king']"/>
          MVP武器
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/ProductList">
          <font-awesome-icon :icon="['fas','democrat']"/>
          MVP防具
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/ProductList">
          <font-awesome-icon :icon="['fas','shopping-bag']"/>
          組合優惠
        </router-link>
      </li>
    </ul>
    <router-view/>
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
    height: 100vh;
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
