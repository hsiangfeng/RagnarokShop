<<<<<<< HEAD
<template lang="pug">
  footer.bg-ro-dark.mt-10
    .container.text-white.py-5
      .row
        .col-md-4.d-flex.justify-content-center.align-items-center
          span.author 作者：HisnagFeng(Ray)
          a.author-github(href='https://github.com/hsiangfeng')
            font-awesome-icon.text-white(:icon="['fab','github-square']", size='2x')
          a.author-github(href='https://www.facebook.com/HsiangFeng.hf')
            font-awesome-icon.text-white(:icon="['fab','facebook']", size='2x')
        .col-md-4.d-flex.justify-content-center.align-items-center.text-center
          img.img-fluid(src='@/assets/img/logo.png', alt='', srcset='', width='150px')
        .col-md-4.d-flex.justify-content-center.align-items-center.text-left
          small 資料、圖片來源皆來自網路，僅用來做為學習用途。
=======
<template>
  <footer class="bg-ro mt-10">
    <div class="container text-white py-5">
      <div class="row">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
          <span class="author">作者：HisnagFeng(Ray)</span>
          <a href="https://github.com/hsiangfeng" class="author-github">
            <font-awesome-icon :icon="['fab','github-square']"
            size="2x"
            class="text-white"/>
          </a>
          <a href="https://www.facebook.com/HsiangFeng.hf" class="author-github">
            <font-awesome-icon :icon="['fab','facebook']"
            size="2x"
            class="text-white"/>
          </a>
        </div>
        <div class="col-md-4 d-flex justify-content-center align-items-center text-center">
          <img src="@/assets/img/1181362684.gif"
          alt srcset width="150px"
          class="img-fluid">
        </div>
        <div class="col-md-4 d-flex justify-content-center align-items-center text-left">
          <small>資料、圖片來源皆來自網路，僅用來做為學習用途。</small>
        </div>
      </div>
    </div>
  </footer>
>>>>>>> parent of b53abf2... 後檯登入頁面調整
</template>

<style lang="scss" scoped>
.author {
  border-right: 1px solid #fff;
  padding-right: 10px;
}
.author-github {
  padding-left: 10px;
}
</style>
