<template>
  <div class="bg-ro fixed-top">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-ro">
        <a class="navbar-brand" href="#">
          <img src="@/assets/img/1181362684.gif"
          alt srcset width="150px"
          class="img-fluid">
          </a>
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
              <router-link class="nav-link font-weight-bold p-5" to="/">
                首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/product">
                產品列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/login">
                登入
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .navbar{
    padding: 0;
  }
  .nav-link{
    transition: all 0.5s;
  }
  .nav-link.active{
    border-bottom: 2px solid #fff;
  }
  .nav-link:hover{
    border-bottom: 2px solid #fff;
  }
</style>
