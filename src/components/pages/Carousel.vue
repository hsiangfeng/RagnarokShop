<template>
  <section class="text-center d-md-block d-none">
    <h3 class="text-ro">各職業展示圖</h3>
    <swiper :options="swiperOption">
      <!-- <swiper-slide><img src="../assets/img/silder/Novice.jpg" width="350"></swiper-slide> -->
      <swiper-slide>
        <img src="@/assets/img/silder/RuneKnight.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Shadow Chaser.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Shura.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Sorcerer.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Mechanic.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/GuillotineCross.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Genetic.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Archbishop.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Minstrel.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Ranger.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Wanderer.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/silder/Warlock.jpg" width="350" class="img-fluid">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css';

import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>
