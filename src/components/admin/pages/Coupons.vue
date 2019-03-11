<template>
  <div class="container">
    <loading :active.sync="isLoading" :opacity="1">
      <img src="@/assets/loading.gif" alt srcset>
      <vue-typed-js :strings="['波利加載中…']" class="justify-content-center align-items-center">
        <small class="font-weight-normal typing"></small>
      </vue-typed-js>
    </loading>
    <div class="text-right my-2">
      <button type="button" class="btn btn-ro text-white"
      data-toggle="modal" data-target="#couponsModal">新增優惠卷</button>
    </div>
    <table class="table table-hover table-border table-striped">
      <thead>
        <tr class="text-center bg-ro text-white">
          <th>標題</th>
          <th>折購(%)</th>
          <th>折扣碼</th>
          <th>停用日期</th>
          <th>狀態</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id" class="text-center">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.code}}</td>
          <td>{{item.due_date | timestamp}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">已啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-ro">編輯</button>
            <button class="btn btn-outline-danger">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponents
    :paginationService="pagination"
    v-on:pageService="getCoupons"/>
    <div
      class="modal fade"
      id="couponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="title">優惠卷標題</label>
                  <input type="text" class="form-control"
                  id="title" placeholder="標題"
                  v-model="cacheCoupons.title">
                </div>
                <div class="form-group col-md-6">
                  <label for="percent">折扣比(%)</label>
                  <input type="range" class="form-control" id="percent"
                  placeholder="百分比"
                  min="0"
                  max="100"
                  value="90"
                  @input="getRanger"
                  v-model="cacheCoupons.percent">
                  <div class="text-center">折扣比：<span id="percentValue">0%</span></div>
                </div>
              </div>
              <div class="form-group">
                <label for="due-date">過期日期</label>
                <input type="date"
                class="form-control"
                id="due-date"
                v-model="cacheDatetime"
                @input="getDatetime()">
              </div>
              <div class="form-group">
                <label for="code">折扣碼</label>
                <input type="text" class="form-control"
                id="code"
                v-model="cacheCoupons.code">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                  id="isEnabled"
                  v-model="cacheCoupons.is_enabled">
                  <label class="form-check-label" for="isEnabled">
                    啟用
                  </label>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataCoupons">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationComponents from './Pagination';

export default {
  data() {
    return {
      coupons: [],
      cacheCoupons: {},
      cacheDatetime: '',
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log(response);
        if (response.data.success) {
          vm.pagination = response.data.pagination;
          vm.coupons = response.data.coupons;
          vm.isLoading = false;
        } else {
          window.alert(`
          出現錯誤惹Σ( ° △ °|||)︴
          錯誤訊息：${response.data.message}`);
          vm.isLoading = false;
        }
      });
    },
    updataCoupons() {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/coupon`;
      const vm = this;
      vm.isLoading = true;
      this.$http.post(url, { data: vm.cacheCoupons }).then((response) => {
        if (response.data.success) {
          this.getCoupons();
          vm.isLoading = false;
        } else {
          window.alert(`
          出現錯誤惹Σ( ° △ °|||)︴
          錯誤訊息：${response.data.message}`);
          vm.isLoading = false;
        }
      });
    },
    getRanger() {
      const percent = document.getElementById('percent').value;
      document.getElementById('percentValue').innerHTML = `${percent}%`;
    },
    getDatetime() {
      const vm = this;
      const date = new Date(vm.cacheDatetime);
      console.log(date.getTime());
      vm.cacheCoupons.due_date = date.getTime();
    },
  },
  components: {
    PaginationComponents,
  },
  created() {
    this.getCoupons();
  },
};
</script>
