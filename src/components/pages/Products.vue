<template>
  <section class="container">
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
                <div class="description text-truncate">
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
  </section>
</template>

<style lang="scss" scoped>
  .content{
    display: flex;
    .category-list{
      width: 20%;
    }
    .products{
      width: 80%;
    }
  }
  .list-items{
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      text-align: center;
      margin-bottom: 5px;
      &:nth-child(6) {
        margin-bottom: 0px;
      }
    }
    .items {
      width: 100%;
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
    }
  }
  .products{
    margin-left: 40px;
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
    }
    .products-content{
      width: 60%;
    }
    .products-footer{
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .description{
      height: 103px;
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
      console.log(url);
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
        } else {
          return item.category === vm.category;
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

