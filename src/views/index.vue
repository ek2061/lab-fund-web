<template>
  <div class="index">
    <Slide disableEsc>
      <a id="myAccount" href="/myAccount">
        <svg-icon icon-class="user" />
        <span>{{user.name}}</span>
      </a>
      <a id="home" href="/home">
        <svg-icon icon-class="homepage" />
        <span>首頁</span>
      </a>
      <a id="table" href="/table">
        <svg-icon icon-class="table" />
        <span>經費表</span>
      </a>
      <a id="add_user" v-if="user.name == 'hsipl_lab'" href="/add_user">
          <svg-icon icon-class="add_user" />
          <span>創建帳戶</span>
      </a>
      <a id="info" href="/info">
        <svg-icon icon-class="info" />
        <span>關於</span>
      </a>
      <a id="logout" @click="logout">
        <svg-icon icon-class="logout" />
        <span>登出</span>
      </a>
    </Slide>
    <router-view></router-view>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";

export default {
  components: {
    Slide, // Register your component
  },
  methods: {
    logout() {
      // 清除token
      localStorage.removeItem("userToken");
      // 設置vuex store
      this.$store.dispatch("clearCurrentState");
      // 跳轉
      this.$router.push("/login");
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>