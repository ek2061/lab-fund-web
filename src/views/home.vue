<template>
  <div class="index">
    <div class="container">
      <h1 class="title">Welcome</h1>
      <p class="lead">這裡是記帳系統</p>
    </div>
    <div>
        <img src="../assets/hsipl.png" alt="" >
    </div>
  </div>
</template>

<style scoped>
img {
    max-width:100%;
    height:auto;
}

.index {
  width: 100%;
  height: 100%;
  text-align: center;
}
.container {
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  padding-top: 1rem;
  background-color: rgba(96, 108, 216, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 1.5rem;
  font-size: 22px;
}
</style>