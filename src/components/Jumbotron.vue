<template>
  <header class="py-10">
    <div class="jumbotron container text-center bg-transparent">
      <div class="h1 text-ro"></div>
      <vue-typed-js :strings="['我在仙境傳說等你/妳哦~']"
      :fadeOut="true"
      class="justify-content-center align-items-center">
        <h1 class="text-ro">
          一起找回最初的感動...
          <br>
          <span class="typing"></span>
        </h1>
      </vue-typed-js>
      <div class="banner">
        <img src="../assets/img/poring.gif" class="img-fluid logo-poring" width="50px">
        <img src="../assets/img/1181362684.gif" class="img-fluid" width="500px">
        <img src="../assets/img/UTMuP.gif"
        class="img-fluid logo-poring-end d-none d-md-block"
        width="180px">
      </div>
    </div>
  </header>
</template>

<style lang="scss" scope>
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
  @media (max-width:1024px) {
    .logo-poring-end{
    right:17%;
    }
  }
</style>
