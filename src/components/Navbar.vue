<template>
  <div class="bg-ro fixed-top">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-ro">
        <div class="collapse navbar-collapse d-md-none" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/index">
                <font-awesome-icon :icon="['fas', 'home']"/> 首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/product">
                <font-awesome-icon :icon="['fab', 'product-hunt']"/> 全部商品
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/login">
                <font-awesome-icon :icon="['fab', 'hotjar']"/> 熱門商品
              </router-link>
            </li>
          </ul>
        </div>
        <a class="navbar-brand" href="#">
          <img src="@/assets/img/logo.png"
          alt srcset width="100px"
          class="img-fluid">
          </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/">
                <font-awesome-icon :icon="['fas', 'box-open']"/> 組合優惠
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/login">
                <font-awesome-icon :icon="['fas', 'user-tie']"/> 關於作者
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/login">
                <font-awesome-icon :icon="['fas', 'sign-in-alt']"/> 登入
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
  .fixed-top{
  z-index: 998 !important;
}
</style>
