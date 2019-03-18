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
    <div class="container my-10">
    <h2 class="text-center text-ro">不要浪費時間快搶購</h2>
      <ul class="list-items d-flex justify-content-center align-items-center">
        <li class="list-item">
          <div class="shop-body p-2">
            <div class="shop-top">
              <img src="@/assets/img/b296b8afcc74427d5e429850aa2a2149.png" alt srcset>
            </div>
            <div class="shop-content">
              <h4>
                <a href="http://" class="text-ro">MVP專屬武器</a>
              </h4>
              <p class="text-left p-3">
                購買後您將會取得您欲指定的MVP武器(劍、弓、槍等)，
                進而體會到MVC武器的強大之處，
                也會配上其他裝備攻略讓你買好武好上手。
              </p>
              <h4>
                <del>原價 NT$ 1600</del> NT$ 1280
              </h4>
            </div>
            <div class="shop-footer">
              <a href="#" class="btn btn-ro btn-block text-white">付款搶購去</a>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="shop-body p-2">
            <div class="shop-top">
              <img src="@/assets/img/b296b8afcc74427d5e429850aa2a2149.png" alt srcset>
            </div>
            <div class="shop-content">
              <h4>
                <a href="http://" class="text-ro">MVP專屬武器</a>
              </h4>
              <p class="text-left p-3">
                購買後您將會取得您欲指定的MVP武器(劍、弓、槍等)，
                進而體會到MVC武器的強大之處，
                也會配上其他裝備攻略讓你買好武好上手。
              </p>
              <h4>
                <del>原價 NT$ 1600</del> NT$ 1280
              </h4>
            </div>
            <div class="shop-footer">
              <a href="#" class="btn btn-ro btn-block text-white">付款搶購去</a>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="shop-body p-2">
            <div class="shop-top">
              <img src="@/assets/img/b296b8afcc74427d5e429850aa2a2149.png" alt srcset>
            </div>
            <div class="shop-content">
              <h4>
                <a href="http://" class="text-ro">MVP專屬武器</a>
              </h4>
              <p class="text-left p-3">
                購買後您將會取得您欲指定的MVP武器(劍、弓、槍等)，
                進而體會到MVC武器的強大之處，
                也會配上其他裝備攻略讓你買好武好上手。
              </p>
              <h4>
                <del>原價 NT$ 1600</del> NT$ 1280
              </h4>
            </div>
            <div class="shop-footer">
              <a href="#" class="btn btn-ro btn-block text-white">付款搶購去</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center">
        <a href="#" class="btn btn-ro text-white">看更多組合包</a>
      </div>
    </div>
    <div class="bg-ro d-flex justify-content-center
    align-items-center flex-column
    py-5 text-white font-weight-bold h4">
      <div>
        購買數
        <span class="text-primary">50,000</span> 人
      </div>
      <div>
        評論超過
        <span class="text-primary">10,000</span> 則
      </div>
      <div>覺得單買太貴？沒關係這裡有組合包！</div>
    </div>
    <div class="container my-10">
      <h2 class="text-center text-ro">組合推薦</h2>
      <ul class="list-items">
        <li class="list-item">
          <div class="shop-body p-2">
            <div class="shop-top">
              <img src="@/assets/img/b296b8afcc74427d5e429850aa2a2149.png" alt srcset>
            </div>
            <div class="shop-content">
              <h4>
                <a href="http://" class="text-ro">MVP專屬武器</a>
              </h4>
              <p class="text-left p-3">
                購買後您將會取得您欲指定的MVP武器(劍、弓、槍等)，
                進而體會到MVC武器的強大之處，
                也會配上其他裝備攻略讓你買好武好上手。
              </p>
              <h4>
                <del>原價 NT$ 1600</del> NT$ 1280
              </h4>
            </div>
            <div class="shop-footer">
              <a href="#" class="btn btn-ro btn-block text-white">付款搶購去</a>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="shop-body p-2">
            <div class="shop-top">
              <img src="@/assets/img/b296b8afcc74427d5e429850aa2a2149.png" alt srcset>
            </div>
            <div class="shop-content">
              <h4>
                <a href="http://" class="text-ro">MVP專屬武器</a>
              </h4>
              <p class="text-left p-3">
                購買後您將會取得您欲指定的MVP武器(劍、弓、槍等)，
                進而體會到MVC武器的強大之處，
                也會配上其他裝備攻略讓你買好武好上手。
              </p>
              <h4>
                <del>原價 NT$ 1600</del> NT$ 1280
              </h4>
            </div>
            <div class="shop-footer">
              <a href="#" class="btn btn-ro btn-block text-white">付款搶購去</a>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="shop-body p-2">
            <div class="shop-top">
              <img src="@/assets/img/b296b8afcc74427d5e429850aa2a2149.png" alt srcset>
            </div>
            <div class="shop-content">
              <h4>
                <a href="http://" class="text-ro">MVP專屬武器</a>
              </h4>
              <p class="text-left p-3">
                購買後您將會取得您欲指定的MVP武器(劍、弓、槍等)，
                進而體會到MVC武器的強大之處，
                也會配上其他裝備攻略讓你買好武好上手。
              </p>
              <h4>
                <del>原價 NT$ 1600</del> NT$ 1280
              </h4>
            </div>
            <div class="shop-footer">
              <a href="#" class="btn btn-ro btn-block text-white">付款搶購去</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center">
        <a href="#" class="btn btn-ro text-white">看更多組合包</a>
      </div>
    </div>
  </section>
>>>>>>> parent of 9bb00f8... 後臺登入調整
</template>

<style lang="scss" scoped>
.list-items {
  padding: 0;
}
.list-item {
  margin-right: 10px;
  width: 31.33333%;
  text-align: center;
  display: inline-block;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.26);
}
.list-item:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.6);
}
.list-item:nth-child(3) {
  margin-right: 0px;
}
@media (max-width: 1024px) {
  .list-item{
    width: 48%;
  }
}
@media (max-width: 769px) {
  .list-item{
    width: 100%;
  }
}
</style>
<<<<<<< HEAD

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
=======
>>>>>>> parent of b53abf2... 後檯登入頁面調整
