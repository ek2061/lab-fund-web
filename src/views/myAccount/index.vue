<template>
  <div class="infoshow">
    <div class="user">
      <img
        src="https://avatars.githubusercontent.com/u/15338242?v=4"
        class="avatar"
        alt=""
      />
    </div>
    <div class="userinfo">
      <div class="user-item">
        <h4>我的帳號</h4>
      </div>
      <div class="user-item">
        <svg-icon icon-class="user" />
        <span> {{user.name}}</span>
      </div>
      <div class="user-item">
        <span>「你這麼牛逼，你媽知道嗎」</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.user {
  text-align: center;
  position: relative;
  top: 28%;
}
.user img {
  width: 250px;
  border-radius: 25%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 25%;
  padding: 0.5rem;
  text-align: center;
  font-size: 25px;
  color: #333;
}
</style>