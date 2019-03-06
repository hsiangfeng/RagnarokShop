<template>
  <section class="container mt-10 text-ro">
    <h2 class="text-center">四步驟 輕鬆遊玩</h2>
    <div class="row mt-5 esay-section">
      <div class="col-md-12">
        <div class="row easy-point">
          <div class="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <h5>步驟一、買裝備只是開始</h5>
            <p>透過買裝備只是一個開始，可是讓你在自己遊玩的時候快速達到你所想要的目標。</p>
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center">
            <img src="../assets/img/Esay/card_10.jpg" width="450px" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row easy-point flex-row-reverse">
          <div class="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <h5>步驟二、隊友交流</h5>
            <p>提供給你一個平台可以隨時隨地立即性找尋隊友，也會有隊友評價指數，確保您不遇到雷雷好朋友。</p>
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center">
            <img src="../assets/img/Esay/img_localize.png" width="450px" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row easy-point">
          <div class="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <h5>步驟三、最佳配裝玩法知識交流</h5>
            <p>透過買裝備只是一個開始，可是讓你在自己遊玩的時候快速達到你所想要的目標。</p>
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center">
            <img src="../assets/img/Esay/with.jpg" width="450px" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row flex-row-reverse easy-point">
          <div class="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <h5>步驟四、最簡易攻略影音教學</h5>
            <p>透過買裝備只是一個開始，可是讓你在自己遊玩的時候快速達到你所想要的目標。</p>
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center">
            <img src="../assets/img/Esay/youtube.png" width="450px" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scope>
.esay-section,
.easy-point {
  position: relative;
}
.esay-section::before {
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 3px solid #1aaef8;
  transform: translateX(-50%);
}
.easy-point::before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 3px solid #1aaef8;
  background-color: #fff;
  transform: translateX(-50%);
}
</style>

<script>
export default {};
</script>
