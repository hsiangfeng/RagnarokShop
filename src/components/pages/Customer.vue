<template lang="pug">
  section.p-top
    loading(:active.sync='isLoading', :opacity='0.85')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    section.container
      .text-center
        .d-flex.justify-content-center.align-items-center.cart-bg
          vue-typed-js(:strings="['請務必要確認訂單唷~']", :fadeOut='true')
            h3.text-white.typing.cart-text
      .my-5.row.justify-content-center
        .col-md-6
          table.table
            thead
              tr
                th
                th 品名
                th 數量
                th 單價
            tbody
              tr(v-for='item in carts.carts', :key='item.id')
                td.align-middle
                  button.btn.btn-outline-danger.btn-sm(type='button', @click='removeCart(item.id)')
                    font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.loadingItem === item.id')
                    font-awesome-icon(:icon="['far','trash-alt']", v-if='status.loadingItem !== item.id')
                td.align-middle
                  | {{ item.product.title }}
                  .text-success(v-if='item.coupon') 已套用優惠券
                td.align-middle {{ item.qty }}
                td.align-middle.text-right {{ item.final_total | currency}}
            tfoot
              tr
                td.text-right(colspan='3') 總計
                td.text-right {{ carts.total | currency}}
              tr(v-if='carts.final_total !== carts.total')
                td.text-right.text-success(colspan='3') 折扣價
                td.text-right.text-success {{ carts.final_total | currency}}
          .input-group.mb-3.input-group-sm
            input.form-control(type='text', placeholder='請輸入優惠碼', v-model='coupon')
            .input-group-append
              button.btn.btn-outline-secondary.customer-submit(type='button', @click='userCoupon()')
                | 套用優惠碼
              button.btn.btn-outline-secondary.customer-code(type='button'
              data-container="body"
              data-toggle="popover"
              data-content="試試輸入code打五折")
                | 取得優惠碼
              button.btn.btn-outline-secondary.customer-ragnarok(type='button'
              data-container="body"
              data-toggle="popover"
              data-content="如果想打到骨折就輸入ragnarok")
                | 想打到骨折
      .my-5.row.justify-content-center
        form.col-md-6(@submit.prevent='createOrder()')
          .form-group
            label(for='useremail') Email
            input#useremail.form-control(type='email', name='email', v-validate="'required|email'", :class="{'is-invalid': errors.has('email')}", v-model='form.user.email', placeholder='請輸入 Email')
            span.text-danger(v-if="errors.has('email')") {{ errors.first('email') }}
          .form-group
            label(for='username') 收件人姓名
            input#username.form-control(type='text', name='name', :class="{'is-invalid': errors.has('name')}", v-model='form.user.name', v-validate="'required'", placeholder='輸入姓名')
            span.text-danger(v-if="errors.has('name')") 姓名必須輸入
          .form-group
            label(for='usertel') 收件人電話
            input#usertel.form-control(type='tel', name='tel', :class="{'is-invalid': errors.has('tel')}", v-model='form.user.tel', v-validate="'required'", placeholder='請輸入電話')
            span.text-danger(v-if="errors.has('tel')") 電話必須輸入
          .form-group
            label(for='useraddress') 收件人地址
            input#useraddress.form-control(type='address', name='address', :class="{'is-invalid': errors.has('address')}", v-model='form.user.address', v-validate="'required'", placeholder='請輸入地址')
            span.text-danger(v-if="errors.has('address')") 地址欄位不得留空
          .form-group
            label(for='useraddress') 留言
            textarea.form-control(name='', id='', cols='30', rows='10', v-model='form.message')
          .text-right
            button.btn.btn-danger 送出訂單
</template>

<style lang="scss" scoped>
  .p-top {
    padding-top: 91px;
  }
  .cart-bg {
    background-image: url(../../assets/img/1378827490-3875360817.jpg);
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 375px;
  }
  .cart-text {
    background-color: rgba(0,0,0,0.6);
    padding: 10px;
  }
</style>

<script>
/* global $ */
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
    getCarts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.carts = response.data.data;
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
          vm.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    userCoupon() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/coupon`;
      vm.isLoading = true;
      const couponCode = {
        code: vm.coupon,
      };
      vm.$http.post(url, { data: couponCode }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push',
            '優惠碼套用成功(*ゝ∀･)v'
            , 'success');
          vm.getCarts();
        } else if (response.data.message === '找不到優惠券!') {
          vm.isLoading = false;
          vm.$bus.$emit('message:push',
            ';沒有這張優惠卷唷，好糗Σ( ° △ °|||)︴'
            , 'danger');
        } else if (response.data.message === '優惠券無法無法使用或已過期') {
          vm.isLoading = false;
          vm.$bus.$emit('message:push',
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
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push',
            '產品刪除成功(*ゝ∀･)v'
            , 'success');
          vm.status.loadingItem = '';
          vm.getCarts();
        } else {
          vm.status.loadingItem = '';
          vm.$bus.$emit('message:push',
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
      vm.$validator.validate().then((result) => {
        if (result) {
          vm.$http.post(url, { data: vm.form }).then((response) => {
            if (response.data.message === '已建立訂單') {
              vm.$bus.$emit('message:push',
                '產品已成功建立訂單啦(*ゝ∀･)v'
                , 'success');
              vm.$router.push(`/check_order/${response.data.orderId}`);
            } else if (response.data.message === '說明欄位為必填') {
              vm.$bus.$emit('message:push',
                `說明欄位為必填，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            } else if (response.data.message === '尚無用戶資料') {
              vm.$bus.$emit('message:push',
                `尚無用戶資料，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            } else if (response.data.message === '購物車內無資料') {
              vm.$bus.$emit('message:push',
                `你購物車內沒東西要我怎麼送資料，好糗Σ( ° △ °|||)︴
                ${response.data.message}`
                , 'danger');
            } else {
              vm.$bus.$emit('message:push',
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
    popoverBtn() {
      $(() => {
        $('[data-toggle="popover"]').popover();
      });
      $('.customer-code').popover({ placement: 'top' }).click(() => {
        setTimeout(() => {
          $('.customer-code').popover('hide');
        }, 2500);
      });
      $('.customer-ragnarok').popover({ placement: 'top' }).click(() => {
        setTimeout(() => {
          $('.customer-ragnarok').popover('hide');
        }, 2500);
      });
      $('.customer-code').on('show.bs.popover', () => {
        $('.customer-ragnarok').popover('hide');
      });
      $('.customer-ragnarok').on('show.bs.popover', () => {
        $('.customer-code').popover('hide');
      });
      $('.customer-submit').click(() => {
        $('.customer-code').popover('hide');
        $('.customer-ragnarok').popover('hide');
      });
    },
  },
  created() {
    this.getCarts();
  },
  mounted() {
    this.popoverBtn();
  },
};
</script>
