<template lang="pug">
  div
    .d-none.d-md-block.cart-pop
      a(href="#" data-toggle="modal" @click.prevent="openModel()" v-if="carts.carts")
        img(src="../../assets/img/cart.png" width="100px").cart-img
        p.cart-text.bg-danger
          | {{carts.carts.length}}
    #cartsModal.modal.fade(tabindex='-1', role='dialog')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5.modal-title 購物車
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            div(v-if='carts.carts.length !== 0' )
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
                  button.btn.btn-outline-secondary(type='button', @click='userCoupon()')
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
            div(v-else-if='carts.carts.length === 0' )
              .text-center
                font-awesome-icon(:icon="['fas', 'shopping-cart']" size="4x").text-ro
                .h3.text-ro oh! 竟然沒東西 !
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') 取消
            a(href="http://localhost:8080/#/customer").btn.btn-outline-ro 結帳
</template>

<style lang="scss" scoped>
  .cart-pop{
    position: fixed;
    bottom: 5%;
    left: 5%;
    .cart-img{
      position: relative;
    }
    .cart-text{
      position: absolute;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      text-align: center;
      top: 20%;
      left: 12%;
      color:#fff;
    }
  }
  .cart-null {
    height: 150px;
  }
</style>

<script>
/* global $ */
export default {
  name: 'Cart',
  data() {
    return {
      carts: [],
      coupon: '',
      status: {
        loadingItem: false,
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
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
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.carts = response.data.data;
        } else {
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
          vm.status.loadingItem = '';
          this.getCarts();
        } else {
          vm.status.loadingItem = '';
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    openModel() {
      $('#cartsModal').modal('show');
    },
  },
  created() {
    const vm = this;
    this.getCarts();
    vm.$cartBus.$on('cartCreate:push', () => {
      vm.getCarts();
    });
  },
};
</script>
