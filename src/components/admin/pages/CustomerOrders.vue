<template>
  <div class="container">
    <loading :active.sync="isLoading"
    :opacity="1">
      <img src="@/assets/loading.gif" alt="" srcset="">
      <vue-typed-js :strings="['波利加載中…']"
      class="justify-content-center align-items-center">
        <small class="font-weight-normal typing">
        </small>
      </vue-typed-js>
    </loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <img class="card-img-top" :src="item.imageUrl" v-if="item.imageUrl">
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button"
            class="btn btn-outline-secondary btn-sm"
            @click="getOneProduct(item.id)">
              <font-awesome-icon :icon="['fas','spinner']"
              spin
              v-if="status.loadingItem === item.id"/>
              查看更多
            </button>
            <button type="button"
            class="btn btn-outline-danger btn-sm ml-auto"
            @click="addtoCart(item.id)"
            v-on:keyup.enter="addtoCart(item.id)">
              <font-awesome-icon :icon="['fas','spinner']" spin
              v-if="status.loadingItem === item.id"/>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in carts.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCart(item.id)"
                >
                  <font-awesome-icon :icon="['fas','spinner']" spin
                  v-if="status.loadingItem === item.id"/>
                  <font-awesome-icon :icon="['far','trash-alt']"
                  v-if="status.loadingItem !== item.id"/>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="align-middle">{{ item.qty }}</td>
              <td class="align-middle text-right">{{ item.final_total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ carts.total | currency}}</td>
            </tr>
            <tr v-if="carts.final_total !== carts.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ carts.final_total | currency}}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="userCoupon()">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder()">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
            v-model="form.user.email"
            placeholder="請輸入 Email"
          >
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name"
            v-validate="'required'"
            placeholder="輸入姓名"
          >
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            name="tel"
            :class="{'is-invalid': errors.has('tel')}"
            v-model="form.user.tel"
            v-validate="'required'"
            placeholder="請輸入電話"
          >
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="address"
            class="form-control"
            name="address"
            :class="{'is-invalid': errors.has('address')}"
            id="useraddress"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          >
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name id class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <div
      class="modal fade"
      id="productsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ cacheProducth.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="cacheProducth.imageUrl" v-if="cacheProducth.imageUrl" class="img-fluid">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ cacheProducth.content }}</p>
              <footer class="blockquote-footer text-right">{{ cacheProducth.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!cacheProducth.price">{{ cacheProducth.origin_price }} 元</div>
              <del class="h6" v-if="cacheProducth.price">原價 {{ cacheProducth.origin_price }} 元</del>
              <div class="h4" v-if="cacheProducth.price">現在只要 {{ cacheProducth.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="cacheProducth.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{cacheProducth.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ cacheProducth.num * cacheProducth.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(cacheProducth.id, cacheProducth.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ cacheProducth.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <img :src="cacheProducth.imageUrl" v-if="cacheProducth.imageUrl" class="img-fluid">
            </div>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ cacheProducth.content }}</p>
              <footer class="blockquote-footer text-right">{{ cacheProducth.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!cacheProducth.price">
                {{ cacheProducth.origin_price }} 元
              </div>
              <del class="h6" v-if="cacheProducth.price">
                原價 {{ cacheProducth.origin_price }} 元
              </del>
              <div class="h4" v-if="cacheProducth.price">
                現在只要 {{ cacheProducth.price }} 元
              </div>
            </div>
            <select name class="form-control mt-3" v-model="cacheProducth.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{cacheProducth.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ cacheProducth.num * cacheProducth.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(cacheProducth.id, cacheProducth.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import PaginationComponents from './Pagination';

export default {
  data() {
    return {
      products: [],
      cacheProducth: {},
      pagination: {},
      carts: [],
      coupon: '',
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      status: {
        loadingItem: false,
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.pagination = response.data.pagination;
          vm.products = response.data.products;
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    getOneProduct(id) {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.cacheProducth = response.data.product;
          $('#productModal').modal('show');
          vm.status.loadingItem = '';
        } else {
          vm.status.loadingItem = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/cart`;
      vm.status.loadingItem = id;
      const cartContent = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cartContent }).then((response) => {
        if (response.data.message === '已加入購物車') {
          this.$bus.$emit('message:push',
            '產品加入購物車成功(*ゝ∀･)v'
            , 'success');
          $('#productModal').modal('hide');
          this.getCarts();
          vm.status.loadingItem = '';
        } else if (response.data.message === '加入購物車有誤') {
          vm.status.loadingItem = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        } else {
          vm.status.loadingItem = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    getCarts() {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.carts = response.data.data;
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    userCoupon() {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/coupon`;
      const vm = this;
      vm.isLoading = true;
      const couponCode = {
        code: vm.coupon,
      };
      this.$http.post(url, { data: couponCode }).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push',
            '優惠碼套用成功(*ゝ∀･)v'
            , 'success');
          this.getCarts();
        } else if (response.data.message === '找不到優惠券!') {
          vm.isLoading = false;
          this.$bus.$emit('message:push',
            ';沒有這張優惠卷唷，好糗Σ( ° △ °|||)︴'
            , 'danger');
        } else if (response.data.message === '優惠券無法無法使用或已過期') {
          vm.isLoading = false;
          this.$bus.$emit('message:push',
            '優惠券無法無法使用或已過期惹，好糗Σ( ° △ °|||)︴'
            , 'danger');
        }
      });
    },
    removeCart(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/cart/${id}`;
      vm.status.loadingItem = id;
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push',
            '產品刪除成功(*ゝ∀･)v'
            , 'success');
          this.getCarts();
          vm.status.loadingItem = '';
        } else {
          vm.status.loadingItem = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/order`;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: vm.form }).then((response) => {
            if (response.data.message === '已建立訂單') {
              this.$bus.$emit('message:push',
                '產品已成功建立訂單啦(*ゝ∀･)v'
                , 'success');
              vm.$router.push(`/customer_crders/${response.data.orderId}`);
            } else if (response.data.message === '說明欄位為必填') {
              this.$bus.$emit('message:push',
                `說明欄位為必填，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            } else if (response.data.message === '尚無用戶資料') {
              this.$bus.$emit('message:push',
                `尚無用戶資料，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            } else if (response.data.message === '購物車內無資料') {
              this.$bus.$emit('message:push',
                `你購物車內沒東西要我怎麼送資料，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            } else {
              this.$bus.$emit('message:push',
                `出現錯誤惹，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            }
          });
        } else {
          this.$bus.$emit('message:push',
            '出現錯誤惹，一定是你欄位沒填寫完全，好糗Σ( ° △ °|||)︴'
            , 'danger');
        }
      });
    },
    tempRemove() {
      $('#productsModal').on('hidden.bs.modal', () => {
        this.tempProducts = {};
      });
      $('#deleteProductsModal').on('hidden.bs.modal', () => {
        this.tempProducts = {};
      });
    },
  },
  components: {
    PaginationComponents,
  },
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
