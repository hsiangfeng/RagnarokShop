<<<<<<< HEAD
<template lang="pug">
  .login-section.d-flex.justify-content-center.align-items-center.flex-column
    loading(:active.sync='isLoading', :opacity='1')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    #login-logo.login-logo
    #login-bg.login-bg
      #login-top.login-top
      form(@submit.prevent='signin')
        input#email(type='email', required='', autofocus='', v-model='user.username')
        input#password(type='password', required='', v-model='user.password')
        button#musicPlay.btn-play(type='button', @click='musicStatus()')
          | stop
        button.btn-login(type='submit')
          | 登入
        router-link(to='/')
          button.btn-end
            | 結束
    audio#roBGM(loop='', muted='', webkit-playsinline='true', playsinline='true')
      source(src='@/assets/01.mp3', type='audio/mpeg')
=======
<template>
  <div class="login-section d-flex justify-content-center align-items-center flex-column">
    <loading :active.sync="isLoading"
    :opacity="1">
      <img src="@/assets/loading.gif" alt="" srcset="">
      <vue-typed-js :strings="['波利加載中…']"
      class="justify-content-center align-items-center">
        <small class="font-weight-normal typing">
        </small>
      </vue-typed-js>
    </loading>
    <div class="login-logo" id="login-logo">
    </div>
    <div class="login-bg">
      <form @submit.prevent="signin">
        <input
        type="email"
        id="email"
        required
        autofocus
        v-model="user.username">
        <input
        type="password"
        id="password"
        required
        v-model="user.password">
        <button class="btn-replay">
          replay
        </button>
        <button class="btn-login" type="submit">
          登入
        </button>
        <router-link to="/">
          <button class="btn-end">
            結束
          </button>
        </router-link>
      </form>
    </div>
    <!-- <form class="form-signin text-center text-white p-5 rounded" @submit.prevent="signin">
      <img src="@/assets/img/1181362684.gif" alt srcset width="150px" class="img-fluid">
      <vue-typed-js :strings="['快登入你/妳的回憶。']"
      :fadeOut="true"
      class="justify-content-center align-items-center">
        <h1 class="h3 mb-3 font-weight-normal typing">
        </h1>
      </vue-typed-js>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      >
      <button class="btn btn-lg btn-ro text-white" type="submit">
        <font-awesome-icon :icon="['fas', 'sign-in-alt']"/> 登入
      </button>
      <router-link to="/">
        <button class="btn btn-lg btn-ro text-white">
          <font-awesome-icon :icon="['fas', 'undo-alt']"/> 返回
        </button>
      </router-link>
      <p class="mt-5 mb-3 text-white">&copy; 2019</p>
    </form> -->
  </div>
>>>>>>> parent of 9bb00f8... 後臺登入調整
</template>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.6);
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.login-section {
  height: 100vh;
  background-image: url(../assets/img/RTC_1920_1080.jpg);
  background-position: center top;
  position: relative;
}
.login-logo{
  position: absolute;
  top: 20%;
  left: 30%;
  background-image: url(../assets/img/logo.png);
  background-position: center center;
  background-repeat: no-repeat;
  width: 202px;
  height: 130px;
}
.login-bg{
  height: 120px;
  width: 280px;
  background-image: url(../assets/img/login.png);
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 5px;
  position: absolute;
  bottom: 25%;
  #email{
    position: absolute;
    width: 130.5px;
    height: 19px;
    left: 32.4%;
    top: 24%;
    border: 0px;
    border: 1px solid #b9b8b8;
    font-size: 12px;
  }
  #password{
    position: absolute;
    width: 130.5px;
    height: 19px;
    left: 32.4%;
    top: 51%;
    border: 0px;
    border: 1px solid #b9b8b8;
    font-size: 12px;
  }
  .btn-login{
    position: absolute;
    bottom: 3%;
    right: 17.5%;
    width: 42px;
    font-size: 12px;
    height: 21px;
    border-radius: 5px;
    border: 0px;
    box-shadow: 0px 0px 2px #000;
    background-color: #eae8e8;
    font-weight: bold;
  }
  .btn-end{
    position: absolute;
    bottom: 3%;
    right: 1.5%;
    width: 42px;
    font-size: 12px;
    height: 21px;
    border-radius: 5px;
    border: 0px;
    box-shadow: 0px 0px 2px #000;
    background-color: #eae8e8;
    font-weight: bold;
  }
  .btn-replay{
    position: absolute;
    font-size: 12px;
    bottom: 3.5%;
    left: 3%;
    width: 56px;
    height: 20px;
    border-radius: 3px;
    border: 0px;
    box-shadow: 0px 0px 2px #000;
    background-color: #eae8e8;
  }
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signin() {
      const url = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      vm.isLoading = true;
      this.$http.post(url, vm.user).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          vm.$router.push('/admin');
        }
      });
    },
  },
  mounted() {
    const loginLogoId = document.getElementById('login-logo');
    function getPosition(event) {
      loginLogoId.style.left = `${event.clientX}px`;
      loginLogoId.style.top = `${event.clientY}px`;
    }
    function positionOver(event) {
      loginLogoId.style.left = `${event.clientX}px`;
      loginLogoId.style.top = `${event.clientY}px`;
    }
    loginLogoId.addEventListener('drag', getPosition, false);
    loginLogoId.addEventListener('dragend', positionOver, false);
  },
};
</script>
