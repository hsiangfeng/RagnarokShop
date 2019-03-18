<<<<<<< HEAD
<template lang="pug">
  .bg-ro.fixed-top
    .container
      nav.navbar.navbar-expand-lg.navbar-dark.bg-ro
        a.navbar-brand.d-lg-none(href='#')
          img.img-fluid(src='@/assets/img/logo.png', alt='', srcset='', width='100px')
        button.navbar-toggler.border-white(type='button', data-toggle='collapse', data-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
          span.navbar-toggler-icon
        #navbarSupportedContent.collapse.navbar-collapse
          ul.navbar-nav.ml-auto
            li.nav-item
              router-link.nav-link.font-weight-bold.p-5(:to="{name: 'Index'}")
                font-awesome-icon(:icon="['fas', 'home']")
                  | 首頁
                  span.sr-only (current)
            li.nav-item
              router-link.nav-link.font-weight-bold.p-5(:to="{name: 'Products', params:{data: '全部商品'}}")
                font-awesome-icon(:icon="['fab', 'product-hunt']")
                  | 全部商品
            li.nav-item
              router-link.nav-link.font-weight-bold.p-5(:to="{name: 'Products', params:{data: '熱門商品'}}")
                font-awesome-icon(:icon="['fab', 'hotjar']")
                  | 關於仙境
        a.navbar-brand.d-none.d-lg-block(href='#')
          img.img-fluid(src='@/assets/img/logo.png', alt='', srcset='', width='100px')
        #navbarSupportedContent.collapse.navbar-collapse
          ul.navbar-nav.mr-auto
            li.nav-item
              router-link.nav-link.font-weight-bold.p-5(to='/')
                font-awesome-icon(:icon="['fas', 'box-open']")
                  | 遊戲指南
                  span.sr-only (current)
            li.nav-item
              router-link.nav-link.font-weight-bold.p-5(to='/login')
                font-awesome-icon(:icon="['fas', 'user-tie']")
                  | 關於作者
            li.nav-item
              router-link.nav-link.font-weight-bold.p-5(to='/login')
                font-awesome-icon(:icon="['fas', 'sign-in-alt']")
                  | 登入
=======
<template>
  <div class="bg-ro fixed-top">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-ro">
        <div class="collapse navbar-collapse d-md-none" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/">
                <font-awesome-icon :icon="['fas', 'home']"/> 首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/product">
                <font-awesome-icon :icon="['fab', 'product-hunt']"/> 產品列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/login">
                <font-awesome-icon :icon="['fas', 'sign-in-alt']"/> 登入
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
                <font-awesome-icon :icon="['fas', 'home']"/> 首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold p-5" to="/product">
                <font-awesome-icon :icon="['fab', 'product-hunt']"/> 產品列表
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
>>>>>>> parent of 9bb00f8... 後臺登入調整
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
