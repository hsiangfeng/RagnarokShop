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
            a.btn.btn-outline-ro.w-50(href='#' @click.prevent="openModel(item)") 詳情介紹
            a.btn.btn-outline-ro.w-50(href='#') 手刀搶購
      .text-center
        router-link.btn.btn-ro.text-white(:to="{name: 'Products', params:{ data: '組合優惠' }}")
          | 看更多方案
    #openModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title.d-flex.justify-content-between
              div {{cacheModelItem.title}} 
              span.badge.badge-danger {{cacheModelItem.category}}
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            .text-center 
              img(:src="cacheModelItem.imageUrl").img-fluid
            .text-left
              | {{cacheModelItem.description}}
            .d-flex.justify-content-between.align-items-center
              span.text-ro-dark.h3 NT$ {{cacheModelItem.price}}
              del
                small 原價 NT$ {{cacheModelItem.origin_price}}
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') 關閉
            button.btn.btn-primary(type='button') 加入購物車

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
/* global $ */
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      products: [],
      productsOff: [],
      mvpCard: [],
      modelTitle: '',
      cacheModelItem: {},
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
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        this.getProductsOff();
        this.getMvpCard();
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
    getMvpCard() {
      const vm = this;
      const data = vm.products;
      data.forEach((item) => {
        if (item.category === 'MVP卡片') {
          vm.mvpCard.push(item);
        }
      });
    },
    openModel(item) {
      const vm = this;
      vm.cacheModelItem = item;
      $('#openModal').modal('show');
    },
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
