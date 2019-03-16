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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle p-5"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
                <font-awesome-icon :icon="['fab','product-hunt']"/>
                產品功能
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/admin">
                <font-awesome-icon :icon="['fas','clipboard-list']"/>
                  產品列表
                  <span class="sr-only">(current)</span>
                </router-link>
                <router-link class="dropdown-item" to="/productscard">
                  <font-awesome-icon :icon="['fas','id-card']"/>
                  產品卡片
                </router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/coupons">
                <font-awesome-icon :icon="['fas','copyright']"/>
                優惠券
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/orders">
                <font-awesome-icon :icon="['fas','cart-arrow-down']"/>
                訂單列表
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle p-5"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
                <font-awesome-icon :icon="['fas','vial']"/>
                模擬功能
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/customer_orders">
                  <font-awesome-icon :icon="['fas','cart-arrow-down']"/>
                  模擬訂單
                </router-link>
              </div>
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
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
