<template>
  <div class="bg-ro">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-ro">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/admin">
                產品列表
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/productscard">
                產品卡片
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/coupons">
                優惠券
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/orders">
                訂單列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/customer_orders">
                模擬訂單
              </router-link>
            </li>
          </ul>
          <a href="#" class="font-weight-bold p-5 text-white" @click.prevent="signOut">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']"/> 登出
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    signOut() {
      const url = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(url, vm.user).then((response) => {
        if (response.data.success) {
          window.alert('已登出');
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
