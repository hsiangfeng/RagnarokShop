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
          .shop-footer
            .d-flex.justify-content-center.align-items-center(v-if='item.is_enabled')
              a.btn.btn-outline-ro.w-50(href='#' @click.prevent="getOneProduct(item.id)")
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
              a.btn.btn-outline-ro.w-50(href='#' @click.prevent="getOneProduct(item.id)") 詳情了解
              a.btn.btn-outline-danger.w-50.ml-1(href='#' @click.prevent="addCart(item.id)")
                font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingID === item.id')
                | 手刀搶購
            div(v-else)
              a.btn.btn-outline-danger.btn-block.disabled(href='#')
                | 下次請早
      .text-center
        router-link.btn.btn-ro.text-white(:to="{name: 'Products', params:{ data: '組合優惠' }}")
          | 看更多方案
    #openModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header.align-items-center
            h5#exampleModalLabel.modal-title.d-flex.justify-content-between
              div {{cacheModelItem.title}}
            span.badge.badge-danger {{cacheModelItem.category}}
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            .text-center
              img(:src="cacheModelItem.imageUrl" width="100px").img-fluid
            .text-left
              | {{cacheModelItem.description}}
            .text-left.blockquote-footer
              | {{cacheModelItem.content}}
            .d-flex.justify-content-between.align-items-center
              span.text-ro-dark.h3 NT$ {{cacheModelItem.price}}
              del
                small 原價 NT$ {{cacheModelItem.origin_price}}
            select.form-control(name='', v-model='cacheModelItem.num')
              option(:value='num', v-for='num in 10', :key='num')
                | 購買 {{num}} {{cacheModelItem.unit}}
          .modal-footer
            .text-muted.text-nowrap.mr-3(v-if="cacheModelItem.num")
              | 小計
              span
              | {{cacheModelItem.num * cacheModelItem.price}}
            .text-muted.text-nowrap.mr-3(v-else)
              | 請選擇購買數量
            button.btn.btn-secondary(type='button', data-dismiss='modal') 關閉
            button.btn.btn-primary(type='button' @click.prevent="addCart(cacheModelItem.id, cacheModelItem.num)")
              font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingID === cacheModelItem.id')
              | 加入購物車
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
      status: {
        loadingID: '',
      },
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
    getOneProduct(id) {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.status.loadingID = id;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.cacheModelItem = response.data.product;
          $('#openModal').modal('show');
          vm.status.loadingID = '';
        } else {
          vm.status.loadingID = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
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
      this.$http.post(url, { data: cartContent }).then((response) => {
        if (response.data.message === '已加入購物車') {
          this.$bus.$emit('message:push',
            '產品加入購物車成功(*ゝ∀･)v'
            , 'success');
          this.$cartBus.$emit('cartCreate:push');
          $('#openModal').modal('hide');
          vm.status.loadingID = '';
        } else if (response.data.message === '加入購物車有誤') {
          vm.status.loadingID = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        } else {
          vm.status.loadingID = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    removeCache() {
      $('#couponsModal').on('hidden.bs.modal', () => {
        this.cacheCoupons = {};
      });
      $('#deleteCouponsModal').on('hidden.bs.modal', () => {
        this.cacheCoupons = {};
      });
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.removeCache();
  },
};
</script>
