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
  <div class="login-section d-flex justify-content-center align-items-center">
    <loading :active.sync="isLoading"
    :opacity="1">
      <img src="@/assets/loading.gif" alt="" srcset="">
      <vue-typed-js :strings="['波利加載中…']"
      class="justify-content-center align-items-center">
        <small class="font-weight-normal typing">
        </small>
      </vue-typed-js>
    </loading>
    <form class="form-signin text-center text-white p-5 rounded" @submit.prevent="signin">
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
    </form>
  </div>
>>>>>>> parent of 9bb00f8... 後臺登入調整
</template>

<style scoped>
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
};
</script>
