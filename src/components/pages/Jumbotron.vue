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
