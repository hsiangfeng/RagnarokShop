<<<<<<< HEAD
<template lang="pug">
  section.container
    loading(:active.sync='isLoading', :opacity='1')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    nav(aria-label='breadcrumb')
      ol.breadcrumb.bg-transparent
        li.breadcrumb-item
          a(href='#') 首頁
        li.breadcrumb-item.active(aria-current='page') 全部商品
    .content
      .category-list
        ul.list-items
          li
            a.items(href='#',
            @click.prevent="category = '全部商品',getProducts()", :class="{'active': category == '全部商品' }")
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
=======
<template>
  <div>
    <loading :active.sync="isLoading"
    :opacity="1">
      <img src="@/assets/loading.gif" alt="" srcset="">
      <vue-typed-js :strings="['波利加載中…']"
      class="justify-content-center align-items-center">
        <small class="font-weight-normal typing">
        </small>
      </vue-typed-js>
    </loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent">
        <li class="breadcrumb-item">
          <a href="#">首頁</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">全部商品</li>
      </ol>
    </nav>
    <div class="content">
      <div class="category-list">
        <ul class="list-items">
          <li>
            <a href="#" class="items" @click.prevent="category = '全部商品', getProducts()">
              <img src="@/assets/img/yJFR7SP.gif" class="items-img">
              全部商品
            </a>
          </li>
          <li>
            <a href="#" class="items" @click.prevent="category = '熱門商品', getProducts()">
              <img src="@/assets/img/0d86f9da98cabdbbcf6040053a83aaf8.png" class="items-img">
              熱門商品
            </a>
          </li>
          <li>
            <a href="#" class="items" @click.prevent="category = '組合優惠', getProducts()">
              <img src="@/assets/img/9d8265cf8508453204d3ec5184ab7b99.png" class="items-img">
              組合優惠
            </a>
          </li>
          <li>
            <a href="#" class="items" @click.prevent="category = 'MVP卡片', getProducts()">
              <img src="@/assets/img/663ffbf1ed4fd82dc0f66202293c016d.png" class="items-img">
              MVP卡片
            </a>
          </li>
          <li>
            <a href="#" class="items" @click.prevent="category = 'MVP武器', getProducts()">
              <img src="@/assets/img/5a293f45bbbe31fe5fe1de93a5615da8.png" class="items-img">
              MVP武器
            </a>
          </li>
          <li>
            <a href="#" class="items" @click.prevent="category = 'MVP防具', getProducts()">
              <img src="@/assets/img/05249f42bb0c86e0a3f2c55b70e79b75.png" class="items-img">
              MVP防具
            </a>
          </li>
        </ul>
      </div>
      <div class="products">
        <h3>{{category}}</h3>
        <ul class="products-list">
          <li v-for="item in getCategory" :key="item.id" class="products-item">
            <div class="products-top text-center">
                <div class="badge badge-danger category-top">{{item.category}}</div>
                <img :src="item.imageUrl" width="150px">
            </div>
            <div class="products-content p-2">
              <h6 class="font-weight-bold">
                <a href="http://" class="text-ro">{{item.title}}</a>
              </h6>
              <div>
                <div class="description">
                  {{item.description}}
                </div>
                {{item.content}}
              </div>
              <div class="d-flex justify-content-between">
                特價 NT$ {{item.price}} <del><small>原價 NT$ {{item.origin_price}}</small></del>
              </div>
            </div>
            <div class="products-footer">
              <a href="#" class="btn btn-outline-ro btn-block">詳情了解</a>
              <a href="#" class="btn btn-outline-ro btn-block">手刀搶購</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
>>>>>>> parent of 9bb00f8... 後臺登入調整
</template>

<style lang="scss" scoped>
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
      const url = `${process.env.APIPATH}/api/${process.env.COUSTOMPATH}/products?all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
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
};
</script>

