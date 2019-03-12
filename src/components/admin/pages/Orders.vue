<template>
  <div class="container">
    <loading :active.sync="isLoading" :opacity="1">
      <img src="@/assets/loading.gif" alt srcset>
      <vue-typed-js :strings="['波利加載中…']" class="justify-content-center align-items-center">
        <small class="font-weight-normal typing"></small>
      </vue-typed-js>
    </loading>
    <table class="table table-border table-hover text-center my-2">
      <thead>
        <tr class="text-center bg-ro text-white">
          <th width="5%">訂單編號</th>
          <th>訊息留言</th>
          <th width="10%">付款方式</th>
          <th width="10%">付款狀態</th>
          <th width="15%">購買人</th>
          <th width="25%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td class="align-middle">{{item.create_at}}</td>
          <td class="align-middle">{{item.message}}</td>
          <td class="align-middle">{{item.payment_method}}</td>
          <td class="align-middle" :class="{'bg-success':item.is_paid, 'bg-danger': !item.is_paid}">
            <span class="text-white" v-if="item.is_paid">已付款</span>
            <span class="text-white font-weight-bold" v-else>未付款</span>
          </td>
          <td class="align-middle">{{item.user.name}}</td>
          <td class="align-middle">
            <button class="btn btn-outline-ro" @click="openModel('look', item)">
              <font-awesome-icon :icon="['fas', 'eye']"/>詳情
            </button>
            <button class="btn btn-outline-ro" @click="openModel('edit', item)">
              <font-awesome-icon :icon="['fas', 'edit']"/>編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponents :paginationService="pagination" v-on:pageService="getOrders"/>
    <div
      class="modal fade"
      id="ordersModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modelTitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">訂單編號</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="title"
                    placeholder="請輸入訂單編號"
                    v-model="tempOrders.create_at"
                    readonly
                  >
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">付款狀態</label>
                    <select id="category" class="form-control" v-model="tempOrders.is_paid">
                      <option value disabled>--請選擇狀態--</option>
                      <option value="true">已付款</option>
                      <option value="false">未付款</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="total">購買總數</label>
                    <input
                      type="number"
                      class="form-control"
                      id="total"
                      placeholder="請輸入數量"
                      v-model="tempOrders.total"
                    >
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <h5>信用卡付款方式</h5>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio1"
                      name="customRadio"
                      class="custom-control-input"
                      value="一次付清"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio1">一次付清</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio2"
                      name="customRadio"
                      class="custom-control-input"
                      value="紅利折抵"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio2">紅利折抵</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio3"
                      name="customRadio"
                      class="custom-control-input"
                      value="分期0利率"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio3">分期0利率</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio4"
                      name="customRadio"
                      class="custom-control-input"
                      value="分期付款"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio4">分期付款</label>
                  </div>
                  <hr>
                  <h5>其他付款方式</h5>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio5"
                      name="customRadio"
                      class="custom-control-input"
                      value="貨到付款"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio5">貨到付款</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio6"
                      name="customRadio"
                      class="custom-control-input"
                      value="ATM轉帳"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio6">ATM轉帳</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio7"
                      name="customRadio"
                      class="custom-control-input"
                      value="即時轉帳"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio7">即時轉帳</label>
                  </div>
                  <hr>
                  <h5>其他支付方式</h5>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio8"
                      name="customRadio"
                      class="custom-control-input"
                      value="LINE PAY"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio8">LINE PAY</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio9"
                      name="customRadio"
                      class="custom-control-input"
                      value="APPLE PAY"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio9">APPLE PAY</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio10"
                      name="customRadio"
                      class="custom-control-input"
                      value="Google PAY"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio10">Google PAY</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio11"
                      name="customRadio"
                      class="custom-control-input"
                      value="Pi錢包 PAY"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio11">Pi錢包 PAY</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio12"
                      name="customRadio"
                      class="custom-control-input"
                      value="Samsung PAY"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio12">Samsung PAY</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio13"
                      name="customRadio"
                      class="custom-control-input"
                      value="街口支付"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio13">街口支付</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio14"
                      name="customRadio"
                      class="custom-control-input"
                      value="微信支付"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio14">微信支付</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadio15"
                      name="customRadio"
                      class="custom-control-input"
                      value="支付寶"
                      v-model="tempOrders.payment_method"
                    >
                    <label class="custom-control-label" for="customRadio15">支付寶</label>
                  </div>
                  <hr>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="category">購買人</label>
                    <input
                      type="text"
                      class="form-control"
                      id="total"
                      placeholder="請輸入姓名"
                      v-model="tempOrders.user.name"
                    >
                  </div>
                  <div class="form-group col-md-4">
                    <label for="total">連絡電話</label>
                    <input
                      type="number"
                      class="form-control"
                      id="total"
                      placeholder="請輸入號碼"
                      v-model="tempOrders.user.tel"
                    >
                  </div>
                  <div class="form-group col-md-4">
                    <label for="total">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="total"
                      placeholder="請輸入Email"
                      v-model="tempOrders.user.email"
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label for="description">訂單訊息</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempOrders.message"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_paid"
                  v-model="tempOrders.is_paid"
                  :true-value="true"
                  :false-value="false">
                <label class="form-check-label" for="is_paid">
                  是否已付款
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataOrders()">
              <font-awesome-icon
              :icon="['fas', 'spinner']"
              v-if="status.loadingItem"
              spin/>
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="ordersLookModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modelTitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">訂單編號</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="title"
                    placeholder="請輸入訂單編號"
                    v-model="tempOrders.create_at"
                    readonly
                  >
                </div>
                <div class="form-group">
                  <label for="total">購買總數</label>
                  <input
                    type="number"
                    class="form-control"
                    id="total"
                    placeholder="請輸入數量"
                    v-model="tempOrders.total"
                    readonly>
                </div>
                <hr>
                <div class="form-group">
                  <h5>付款方式</h5>
                    <input
                      type="text"
                      class="form-control"
                      v-model="tempOrders.payment_method"
                      readonly>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="category">購買人</label>
                    <input
                      type="text"
                      class="form-control"
                      id="total"
                      placeholder="請輸入姓名"
                      v-model="tempOrders.user.name"
                      readonly
                    >
                  </div>
                  <div class="form-group col-md-4">
                    <label for="total">連絡電話</label>
                    <input
                      type="number"
                      class="form-control"
                      id="total"
                      placeholder="請輸入號碼"
                      v-model="tempOrders.user.tel"
                      readonly
                    >
                  </div>
                  <div class="form-group col-md-4">
                    <label for="total">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="total"
                      placeholder="請輸入Email"
                      v-model="tempOrders.user.email"
                      readonly
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label for="description">訂單訊息</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempOrders.message"
                    readonly
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">關閉</button>
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
      orders: [],
      tempOrders: {
        user: {
          name: '',
          tel: '',
          email: '',
        },
      },
      pagination: {},
      modelTitle: '',
      modelStatus: '',
      isLoading: false,
      status: {
        loadingItem: false,
      },
    };
  },
  methods: {
    getOrders(page) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.pagination = response.data.pagination;
          vm.orders = response.data.orders;
          vm.isLoading = false;
        } else if (response.data.message === '驗證錯誤, 請重新登入') {
          vm.$router.push('/login');
          vm.isLoading = false;
        } else {
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
          vm.isLoading = false;
        }
      });
    },
    updataOrders() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/order/${vm.tempOrders.id}`;
      vm.status.loadingItem = true;
      this.$http.put(url, { data: vm.tempOrders }).then((response) => {
        if (response.data.success) {
          vm.status.loadingItem = false;
          $('#ordersModal').modal('hide');
          this.$bus.$emit('message:push',
            '資料更新成功(*ゝ∀･)v'
            , 'success');
          this.getOrders();
        } else {
          vm.status.loadingItem = false;
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    openModel(status, item) {
      const vm = this;
      switch (status) {
        case 'edit':
          vm.modelTitle = '修改訂單';
          vm.modelStatus = 'edit';
          $('#ordersModal').modal('show');
          vm.tempOrders = Object.assign({}, item);
          break;
        case 'look':
          vm.modelTitle = '查看訂單';
          vm.modelStatus = 'delete';
          $('#ordersLookModal').modal('show');
          vm.tempOrders = Object.assign({}, item);
          break;
        default:
          $('#ordersModal').modal('show');
          break;
      }
    },
  },
  components: {
    PaginationComponents,
  },
  created() {
    this.getOrders();
  },
};
</script>
