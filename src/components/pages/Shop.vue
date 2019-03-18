<<<<<<< HEAD
<template lang="pug">
  section
    loading(:active.sync='isLoading', :opacity='1')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    .container.my-10
      h2.text-ro 不要浪費時間快搶購
      swiper.py-5(:options='swiperOption')
        swiper-slide.border(v-for='item in mvpCard', :key='item.id')
          .shop-top.text-center
            .badge.badge-danger.category-top {{item.category}}
            img.shop-img(:src='item.imageUrl')
          .shop-content.p-2
            h6
              a.text-ro(href='http://') {{item.title}}
            p.text-left.p-3.text-description
              | {{item.description}}
            .d-flex.justify-content-between
              span.text-ro-dark NT$ {{item.price}}
              del
                small 原價 NT$ {{item.origin_price}}
          .shop-footer.d-flex.justify-content-center.align-items-center
            a.btn.btn-outline-ro.w-50(href='#') 詳情了解
            a.btn.btn-outline-ro.w-50(href='#') 手刀搶購
    .bg-ro-light.d-flex.justify-content-center.align-items-center.flex-column.py-5.text-white.font-weight-bold.h4
      div
        | 購買數上
        span.text-ro-dark 千
        |  人
      div
        .shop-good
          | 好評超過
          span.text-ro-dark 上萬
          |  則
      div
        | 被採訪次數高達
        span.text-ro-dark ∞
        |  次
      p.text-center
        | 創造屬於自己的遊戲人生。
        br
        | 還是覺得
        span.text-ro-dark 太貴
        | ？你還可以看看其他方案！
    .container.my-10
      h2.text-ro 組合推薦
      swiper.py-5(:options='swiperOption')
        swiper-slide.border.p-2(v-for='item in productsOff', :key='item.id')
          .shop-top.text-center
            .badge.badge-danger.category-top {{item.category}}
            img.shop-img(:src='item.imageUrl')
          .shop-content
            h6
              a.text-ro(href='http://') {{item.title}}
            p.text-left.p-3.text-description
              | {{item.description}}
            .d-flex.justify-content-between
              span.text-ro-dark NT$ {{item.price}}
              del
                small 原價 NT$ {{item.origin_price}}
          .shop-footer.d-flex.justify-content-center.align-items-center
            a.btn.btn-outline-ro.w-50(href='#') 詳情介紹
            a.btn.btn-outline-ro.w-50(href='#') 手刀搶購
      .text-center
        router-link.btn.btn-ro.text-white(:to="{name: 'Products', params:{ data: '組合優惠' }}")
          | 看更多方案
=======
<template>
  <section>
    <loading :active.sync="isLoading"
    :opacity="1">
      <img src="@/assets/loading.gif" alt="" srcset="">
      <vue-typed-js :strings="['波利加載中…']"
      class="justify-content-center align-items-center">
        <small class="font-weight-normal typing">
        </small>
      </vue-typed-js>
    </loading>
    <div class="container my-10">
    <h2 class="text-ro">不要浪費時間快搶購</h2>
    <swiper :options="swiperOption" class="py-5">
      <swiper-slide v-for="item in products" :key="item.id" class="border">
        <div class="shop-top text-center">
            <div class="badge badge-danger category-top">{{item.category}}</div>
            <img :src="item.imageUrl" width="150px">
        </div>
        <div class="shop-content p-2">
          <h6>
            <a href="http://" class="text-ro">{{item.title}}</a>
          </h6>
          <p class="text-left p-3">
            {{item.description}}
          </p>
          <div class="d-flex justify-content-between">
            NT$ {{item.price}} <del><small>原價 NT$ {{item.origin_price}}</small></del>
          </div>
        </div>
        <div class="shop-footer d-flex justify-content-center align-items-center">
          <a href="#" class="btn btn-outline-ro w-50">詳情了解</a>
          <a href="#" class="btn btn-outline-ro w-50">手刀搶購</a>
        </div>
      </swiper-slide>
    </swiper>
    </div>
    <div class="bg-ro-light d-flex justify-content-center
    align-items-center flex-column
    py-5 text-white font-weight-bold h4">
      <div>
        購買數上
        <span class="text-ro-dark">千</span> 人
      </div>
      <div>
        <div class="shop-good">
          好評超過
          <span class="text-ro-dark">上萬</span> 則
        </div>
      </div>
      <div>
        被採訪次數高達
        <span class="text-ro-dark">∞</span> 次
      </div>
      <p class="text-center">
        創造屬於自己的遊戲人生，不在上班時間&遊戲時間兩頭燒。
        <br>
        如果你還是覺得<span class="text-ro-dark">太貴</span>？沒關係，你還可以看看其他方案！
      </p>
    </div>
    <div class="container my-10">
      <h2 class="text-ro">組合推薦</h2>
      <swiper :options="swiperOption" class="py-5">
        <swiper-slide v-for="item in productsOff" :key="item.id" class="border">
          <div class="shop-top text-center">
              <div class="badge badge-ro category-top">{{item.category}}</div>
              <img :src="item.imageUrl" width="150px">
          </div>
          <div class="shop-content p-2">
            <h6>
              <a href="http://" class="text-ro">{{item.title}}</a>
            </h6>
            <p class="text-left p-3">
              {{item.description}}
            </p>
            <div class="d-flex justify-content-between">
              NT$ {{item.price}} <del><small>原價 NT$ {{item.origin_price}}</small></del>
            </div>
          </div>
          <div class="shop-footer d-flex justify-content-center align-items-center">
            <a href="#" class="btn btn-outline-ro w-50">詳情介紹</a>
            <a href="#" class="btn btn-outline-ro w-50">手刀搶購</a>
          </div>
        </swiper-slide>
      </swiper>
      <div class="text-center">
        <router-link to="/product" class="btn btn-ro text-white">看更多方案</router-link>
      </div>
    </div>
  </section>
>>>>>>> parent of 9bb00f8... 後臺登入調整
</template>

<style lang="scss" scoped>

.shop-top{
  position: relative;
  .category-top{
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.shop-content{
  height: 200px;
}
</style>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      products: [],
      productsOff: [],
      isLoading: false,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 5,
        speed: 600,
        autoplay: {
          delay: 5000,
        },
        breakpoints:
        {
          992: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        this.getProductsOff();
      });
    },
    getProductsOff() {
      const vm = this;
      const data = vm.products;
      data.forEach((item) => {
        if (item.category === '組合優惠') {
          vm.productsOff.push(item);
        }
      });
    },
<<<<<<< HEAD
    getMvpCard() {
      const vm = this;
      const data = vm.products;
      data.forEach((item) => {
        if (item.category === 'MVP卡片') {
          vm.mvpCard.push(item);
        }
      });
    },
=======
>>>>>>> parent of 9bb00f8... 後臺登入調整
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.getProducts();
  },
};
</script>
