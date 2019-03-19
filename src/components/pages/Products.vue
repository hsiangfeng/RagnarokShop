<template lang="pug">
  section
    loading(:active.sync='isLoading', :opacity='1')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    .banner.d-flex.justify-content-center.align-items-center
      .banner-text
        vue-typed-js(:strings="['公~我回來了~']", :fadeOut='true')
          h3.text-white.typing
    .container
      nav(aria-label='breadcrumb')
        ol.breadcrumb.bg-transparent
          li.breadcrumb-item
            a(href='#') 首頁
          li.breadcrumb-item.active(aria-current='page') 全部商品
      .content
        .category-list
          ul.list-items
            li
              a.items(href='#', @click.prevent="category = '全部商品',getProducts()", :class="{'active': category == '全部商品' }")
                img.items-img(src='@/assets/img/yJFR7SP.gif')
                div 全部商品
            li
              a.items(href='#', @click.prevent="category = '熱門商品', getProducts()", :class="{'active': category == '熱門商品' }")
                img.items-img(src='@/assets/img/0d86f9da98cabdbbcf6040053a83aaf8.png')
                div 熱門商品
            li
              a.items(href='#', @click.prevent="category = '組合優惠', getProducts()", :class="{'active': category == '組合優惠' }")
                img.items-img(src='@/assets/img/9d8265cf8508453204d3ec5184ab7b99.png')
                div 組合優惠
            li
              a.items(href='#', @click.prevent="category = 'MVP卡片', getProducts()", :class="{'active': category == 'MVP卡片' }")
                img.items-img(src='@/assets/img/663ffbf1ed4fd82dc0f66202293c016d.png')
                div MVP卡片
            li
              a.items(href='#', @click.prevent="category = 'MVP武器', getProducts()", :class="{'active': category == 'MVP武器' }")
                img.items-img(src='@/assets/img/5a293f45bbbe31fe5fe1de93a5615da8.png')
                div MVP武器
            li
              a.items(href='#', @click.prevent="category = 'MVP防具', getProducts()", :class="{'active': category == 'MVP防具' }")
                img.items-img(src='@/assets/img/05249f42bb0c86e0a3f2c55b70e79b75.png')
                div MVP防具
        .products
          h3 {{category}}
          ul.products-list
            li.products-item(v-for='item in getCategory', :key='item.id')
              .products-top.text-center
                .badge.badge-danger.category-top {{item.category}}
                img.card-img(:src='item.imageUrl')
              .products-content.p-2
                h6.font-weight-bold
                  a.text-ro(href='http://') {{item.title}}
                div
                  .description.text-truncate
                    | {{item.description}}
                    | {{item.content}}
                .d-flex.justify-content-between
                  | 特價 NT$ {{item.price}}
                  del
                    small 原價 NT$ {{item.origin_price}}
              .products-footer
                a.btn.btn-outline-ro.btn-block(href='#') 詳情了解
                a.btn.btn-outline-ro.btn-block(href='#') 手刀搶購
    audio#roBGM(loop='', muted='', webkit-playsinline='true', playsinline='true')
      source(src='/static/login@2.mp3', type='audio/mpeg')
</template>

<style lang="scss" scoped>
  .banner{
    background-image: url(../../assets/img/Product/banner.jpg);
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
  .content{
    display: flex;
    .category-list{
      width: 20%;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
    .products{
      width: 80%;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
    @media (max-width: 992px) {
      display: block;
    }
  }
  .list-items{
    list-style: none;
    margin: 0;
    padding: 0;
    @media (max-width: 992px) {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      text-align: center;
      margin-bottom: 5px;
      @media (max-width: 992px) {
        width: 33.33333333%;
      }
    }
    .items {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid #ced4da;
      transition: all .5s;
      color: #769bd3;
      font-weight: 800;
      text-decoration: none;
      &:hover{
        color: #044273;
        border: 1px solid #769bd3;
      }
      &.active{
        color: #044273;
        border: 1px solid #769bd3;
      }
      @media (max-width: 992px) {
        flex-direction: column;
      }
    }
  }
  .products{
    margin-left: 40px;
    @media (max-width: 992px) {
      margin-left: 0px;
    }
    .products-list{
    list-style: none;
    margin: 0;
    padding: 0;
    }
  }
  .products-item {
    display: flex;
    box-shadow: 0 1px 5px #000;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    transition: all .5s;
    &:hover{
      box-shadow: 0 2px 10px #000;
    }
    .products-top{
      width: 20%;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    .products-content{
      width: 60%;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    .products-footer{
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    .description{
      height: 103px;
    }
    @media (max-width: 768px) {
      display: block;
    }
  }
  .items-img{
    max-width: 50px;
    margin-right: 10px;
  }
  .products-top {
    position: relative;
    .category-top{
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
  .card-img{
    width: 150px;
    @media (max-width: 992px) {
        width: 100px;
      }
  }
</style>

<script>
export default {
  data() {
    return {
      products: [],
      category: '全部商品',
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    autoPlayMusic() {
      const roBGM = document.getElementById('roBGM');
      if (roBGM.paused) {
        roBGM.play();
        roBGM.volume = 0.2;
      }
    },
  },
  computed: {
    getCategory() {
      const vm = this;
      return vm.products.filter((item) => {
        if (vm.category === '全部商品') {
          return item;
          // eslint-disable-next-line no-else-return
        } else {
          return item.category === vm.category;
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.category = this.$route.params.data ? this.$route.params.data : '全部商品';
  },
  mounted() {
    this.autoPlayMusic();
  },
};
</script>

