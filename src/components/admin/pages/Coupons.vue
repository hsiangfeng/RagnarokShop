<template>
  <div class="container">
    <loading :active.sync="isLoading" :opacity="1">
      <img src="@/assets/loading.gif" alt srcset>
      <vue-typed-js :strings="['波利加載中…']" class="justify-content-center align-items-center">
        <small class="font-weight-normal typing"></small>
      </vue-typed-js>
    </loading>
    <div class="text-right my-2">
      <button type="button"
      class="btn btn-ro text-white"
      @click="openModel('new')"
      >
        <font-awesome-icon :icon="['fas', 'plus']"/> 新增優惠卷
      </button>
    </div>
    <table class="table table-hover table-border table-striped">
      <thead>
        <tr class="text-center bg-ro text-white">
          <th>標題</th>
          <th width="10%">折購(%)</th>
          <th width="10%">折扣碼</th>
          <th width="10%">停用日期</th>
          <th width="10%">狀態</th>
          <th width="20%">功能</th>
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
            <button class="btn btn-outline-ro" @click="openModel('edit', item)">
              <font-awesome-icon :icon="['fas', 'edit']"/> 編輯
            </button>
            <button class="btn btn-outline-danger" @click="openModel('delete', item)">
              <font-awesome-icon :icon="['fas', 'trash-alt']"/> 刪除
            </button>
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
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{modelTitle}}
            </h5>
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
                  <div class="text-center">折扣比：
                    <span id="percentValue"
                    v-html="cacheCoupons.percent">0</span>%
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="due-date">過期日期</label>
                <p v-if="cacheCoupons.due_date">{{cacheCoupons.due_date | timestamp}}</p>
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
            <button type="button" class="btn btn-primary" @click="updataCoupons">
              <font-awesome-icon
              :icon="['fas', 'spinner']"
              v-if="status.loadingItem"
              spin/>確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteCouponsModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modelTitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ cacheCoupons.title }}</strong> 優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupons()">
              <font-awesome-icon
              :icon="['fas', 'spinner']"
              v-if="status.loadingItem"
              spin/>
              確認刪除
            </button>
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
      coupons: [],
      cacheCoupons: {},
      cacheDatetime: '',
      pagination: {},
      isLoading: false,
      modelTitle: '',
      modelStatus: '',
      status: {
        loadingItem: false,
      },
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
        if (response.data.success) {
          vm.pagination = response.data.pagination;
          vm.coupons = response.data.coupons;
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
    updataCoupons() {
      const vm = this;
      let httpMethods = 'post';
      let url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/coupon`;
      if (vm.modelStatus === 'edit') {
        httpMethods = 'put';
        url = `${process.env.APIPATH}/api/${
          process.env.COUSTOMPATH
        }/admin/coupon/${
          vm.cacheCoupons.id
        }`;
      }
      vm.status.loadingItem = true;
      this.$http[httpMethods](url, { data: vm.cacheCoupons }).then((response) => {
        if (response.data.success) {
          vm.status.loadingItem = false;
          switch (httpMethods) {
            case 'post':
              this.$bus.$emit('message:push',
                '資料新增成功(*ゝ∀･)v'
                , 'success');
              break;
            case 'put':
              this.$bus.$emit('message:push',
                '資料更新成功(*ゝ∀･)v'
                , 'success');
              break;
            default:
              this.$bus.$emit('message:push',
                '資料新增成功(*ゝ∀･)v'
                , 'success');
              break;
          }
          this.getCoupons();
          $('#couponsModal').modal('hide');
        } else {
          vm.status.loadingItem = false;
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    deleteCoupons() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/coupon/${vm.cacheCoupons.id}`;
      vm.status.loadingItem = true;
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.status.loadingItem = false;
          this.$bus.$emit('message:push',
            '資料刪除成功(*ゝ∀･)v'
            , 'success');
          $('#deleteCouponsModal').modal('hide');
          this.getCoupons();
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
        case 'new':
          vm.modelTitle = '新增優惠卷';
          vm.modelStatus = 'created';
          $('#couponsModal').modal('show');
          break;
        case 'edit':
          vm.modelTitle = '編輯優惠卷';
          vm.modelStatus = 'edit';
          $('#couponsModal').modal('show');
          vm.cacheCoupons = Object.assign({}, item);
          break;
        case 'delete':
          vm.modelTitle = '刪除優惠卷';
          vm.modelStatus = 'delete';
          $('#deleteCouponsModal').modal('show');
          vm.cacheCoupons = Object.assign({}, item);
          break;
        default:
          $('#couponsModal').modal('show');
          break;
      }
    },
    removeCache() {
      $('#couponsModal').on('hidden.bs.modal', () => {
        this.cacheCoupons = {};
      });
      $('#deleteCouponsModal').on('hidden.bs.modal', () => {
        this.cacheCoupons = {};
      });
    },
    getRanger() {
      const percent = document.getElementById('percent').value;
      document.getElementById('percentValue').innerHTML = `${percent}`;
    },
    getDatetime() {
      const vm = this;
      const date = new Date(vm.cacheDatetime);
      vm.cacheCoupons.due_date = date.getTime();
    },
  },
  components: {
    PaginationComponents,
  },
  created() {
    this.getCoupons();
  },
  mounted() {
    this.removeCache();
  },
};
</script>
