<template lang="pug">
  section
    loading(:active.sync='isLoading', :opacity='0.85')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    .container.my-10
      h2.text-ro(v-if="localFilter === '快搶購'") 不要浪費時間快搶購
      h2.text-ro(v-else) 我猜你喜歡
      swiper.py-5(:options='swiperOption')
        swiper-slide.border.p-2(v-for='item in productsCard', :key='item.id')
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
          .shop-footer
            .d-flex.justify-content-center.align-items-center(v-if='item.is_enabled')
              router-link.btn.btn-outline-ro.w-50(:to="'/detailed/' + item.id")
                font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingID === item.id')
                | 詳情了解
              a.btn.btn-outline-danger.w-50.ml-1(href='#' @click.prevent="addCart(item.id)")
                font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingID === item.id')
                | 手刀搶購
            div(v-else)
              a.btn.btn-outline-danger.btn-block.disabled(href='#')
                | 下次請早
    .bg-ro-light.d-flex.justify-content-center.align-items-center.flex-column.py-5.text-white.font-weight-bold.h4
      div
        | 購買數上
        span.text-ro-dark 千
        | 人
      div
        .shop-good
          | 好評超過
          span.text-ro-dark 上萬
          | 則
      div
        | 被採訪次數高達
        span.text-ro-dark ∞
        | 次
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
          .shop-footer
            .d-flex.justify-content-center.align-items-center(v-if='item.is_enabled')
              router-link.btn.btn-outline-ro.w-50(:to="'/detailed/' + item.id")
                | 詳情了解
              a.btn.btn-outline-danger.w-50.ml-1(href='#' @click.prevent="addCart(item.id)")
                font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingID === item.id')
                | 手刀搶購
            div(v-else)
              a.btn.btn-outline-danger.btn-block.disabled(href='#')
                | 下次請早
      .text-center
        router-link.btn.btn-ro.text-white(:to="{name: 'Products', params:{ data: '組合優惠' }}")
          | 看更多方案
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
  .text-description{
    height: 120px;
    overflow-y: auto;
  }
}
.shop-img{
  max-height: 250px;
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
      productsCard: [],
      modelTitle: '',
      cacheModelItem: {},
      localFilter: '快搶購',
      isLoading: false,
      status: {
        loadingID: '',
      },
      counts: 0,
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
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.getProductsOff();
        vm.getProductsCard();
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
    getProductsCard() {
      const vm = this;
      const data = vm.products;
      data.forEach((item) => {
        if (vm.localFilter === '快搶購') {
          if (item.category === 'MVP卡片') {
            vm.productsCard.push(item);
          }
        } else if (item.category === vm.localFilter) {
          vm.productsCard.push(item);
        }
      });
    },
    addCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/cart`;
      vm.status.loadingID = id;
      const cartContent = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cartContent }).then((response) => {
        if (response.data.message === '已加入購物車') {
          vm.$bus.$emit('message:push',
            '產品加入購物車成功(*ゝ∀･)v'
            , 'success');
          vm.$bus.$emit('cartCreate:push');
          vm.status.loadingID = '';
        } else if (response.data.message === '加入購物車有誤') {
          vm.status.loadingID = '';
          vm.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        } else {
          vm.status.loadingID = '';
          vm.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    const vm = this;
    this.getProducts();
    vm.localFilter = JSON.parse(localStorage.getItem('likecategory')) || '快搶購';
  },
};
</script>
