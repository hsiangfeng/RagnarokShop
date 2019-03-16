<template>
  <footer class="bg-ro-dark mt-10">
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
          <img src="@/assets/img/logo.png"
          alt srcset width="150px"
          class="img-fluid">
        </div>
        <div class="col-md-4 d-flex justify-content-center align-items-center text-left">
          <small>資料、圖片來源皆來自網路，僅用來做為學習用途。</small>
        </div>
      </div>
    </div>
  </footer>
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
