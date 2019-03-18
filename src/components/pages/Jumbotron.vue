<<<<<<< HEAD
<template lang="pug">
  header.header
    .jumbotron.container.text-center.bg-transparent
      vue-typed-js.justify-content-center.align-items-center(:strings="['我在仙境傳說等你哦~']",
      :fadeout='true')
        h3.text-ro
          | 找回最初的感動⋯
          br
          span.typing
      .banner
        img.img-fluid.logo-poring(src='@/assets/img/poring.gif', width='50px')
        img.img-fluid(src='@/assets/img/1181362684.png', width='500px')
        img.img-fluid.logo-poring-end.d-none.d-md-block(src='@/assets/img/UTMuP.gif', width='180px')
=======
<template>
  <header class="py-10">
    <div class="jumbotron container text-center bg-transparent">
      <div class="h1 text-ro"></div>
      <vue-typed-js :strings="['我在仙境傳說等你/妳哦~']"
      :fadeOut="true"
      class="justify-content-center align-items-center">
        <h1 class="text-ro">
          一起找回最初的感動…
          <br>
          <span class="typing"></span>
        </h1>
      </vue-typed-js>
      <div class="banner">
        <img src="@/assets/img/poring.gif" class="img-fluid logo-poring" width="50px">
        <img src="@/assets/img/1181362684.gif" class="img-fluid" width="500px">
        <img src="@/assets/img/UTMuP.gif"
        class="img-fluid logo-poring-end d-none d-md-block"
        width="180px">
      </div>
    </div>
  </header>
>>>>>>> parent of b53abf2... 後檯登入頁面調整
</template>

<style lang="scss" scoped>
  .banner {
    position: relative;
  }
  .logo-poring {
    position: absolute;
    bottom: 0;
  }
  .logo-poring-end{
    position: absolute;
    bottom: 0;
    right:23%;
  }
  .header{
    padding-top: 91px;
  }
  @media (max-width:1024px) {
    .logo-poring-end{
    right:17%;
    }
  }
</style>
