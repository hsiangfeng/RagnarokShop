<template lang="pug">
  section.container.p-top
    loading(:active.sync='isLoading', :opacity='0.85')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    Breadcrumb(:breadcrumb='category')
    .row.pt-5
      .col-md-4.d-flex.justify-content-center.align-items-center
        .border.border-ro.w-100.h-100.d-flex.justify-content-center.align-items-center.p-2.rounded
          img(:src="cacheModelItem.imageUrl")
      .col-md-4.my-2.my-md-0
        .border.border-ro.p-2.rounded
          .h5.text-ro.border-bottom.border-ro
            | 商品介紹
          p
            | {{cacheModelItem.description}}
          .h5.text-ro.border-bottom.border-ro
            | 其他說明
          p
            | {{cacheModelItem.content}}
      .col-md-4
        .border.border-ro.p-2.rounded
          span.badge.badge-danger.float-right {{cacheModelItem.category}}
          h1.h5.text-ro-dark
            | {{cacheModelItem.title}}
          .d-flex.justify-content-between.my-2.text-ro-dark
            span 單位
            span 1/{{cacheModelItem.unit}}
          .d-flex.justify-content-between.font-weight-bold.my-2.text-ro-dark
            | 原價
            span
              del {{cacheModelItem.origin_price | currency}}
          .d-flex.justify-content-between.font-weight-bold.my-2.text-ro-dark.h5
            | 現購特價!
            span
              | {{cacheModelItem.price | currency}}
          select.form-control(name='count', v-model='counts')
                option(:value='num', v-for='num in 10', :key='num')
                  | 購買 {{num}} {{cacheModelItem.unit}}
          .d-flex.justify-content-between.font-weight-bold.my-2.h4
            | 小計
            span.text-ro-dark
              | {{counts * cacheModelItem.price | currency}}
          .text-right
            router-link.btn.btn-secondary(:to="{name: 'Products'}") 返回
            button.btn.btn-outline-ro.ml-1(type='button' @click.prevent="addCart(cacheModelItem.id, counts)")
              font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingID === cacheModelItem.id')
              | 加入購物車
      .container.my-10
        h3.text-ro 我猜你也喜歡
        swiper.py-5(:options='swiperOption')
          swiper-slide.border.p-2(v-for='item in products', :key='item.id' v-show="item.id !== productID")
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
</template>
<style lang="scss">
  .p-top{
    padding-top: 91px;
  }
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
import Breadcrumb from './Breadcrumb';

export default {
  data() {
    return {
      productID: '',
      products: [],
      cacheModelItem: {},
      counts: 1,
      category: {
        productsTitle: '',
      },
      categoryFilter: '全部商品',
      status: {
        loadingID: '',
      },
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
      vm.$http.get(url).then((response) => {
        let products = [];
        products = response.data.products;
        vm.products = [];
        products.forEach((item) => {
          if (item.category === vm.categoryFilter) {
            vm.products.push(item);
          }
        });
        vm.isLoading = false;
      });
    },
    getOneProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/product/${id}`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.cacheModelItem = response.data.product;
          vm.categoryFilter = vm.cacheModelItem.category;
          vm.category.productsTitle = vm.cacheModelItem.title;
          localStorage.setItem('likecategory', JSON.stringify(vm.cacheModelItem.category));
        } else {
          vm.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
      vm.getProducts();
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
  watch: {
    $route(to, from) { // eslint-disable-line no-unused-vars
      const vm = this;
      vm.productID = to.params.productsId;
      vm.getOneProduct(vm.productID);
    },
  },
  components: {
    swiper,
    swiperSlide,
    Breadcrumb,
  },
  created() {
    const vm = this;
    vm.productID = vm.$route.params.productsId;
    vm.getOneProduct(vm.productID);
    vm.getProducts();
  },
};
</script>
