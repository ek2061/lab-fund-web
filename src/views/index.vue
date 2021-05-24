<template>
  <div class="index">
    <HeadNav></HeadNav>
    <div class="rightContainer">
      <router-view></router-view>
      <!-- 要有這個才有把router裡的home導入 -->
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
export default {
  name: "index",
  components: {
    HeadNav,
  },
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>