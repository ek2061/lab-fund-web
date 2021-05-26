<template>
  <div class="infoshow">
    <div class="user">
      <img
        src="https://lh3.googleusercontent.com/-mp9SvyMXorA/X80Pm35K9lI/AAAAAAAABRU/akQQG7SpcJUuBOCwwAF16Je6qIMcYpM7wCEwYBhgLKtMDAL1OcqxCWbwfpepOsw7CF80YXIJ2qY2_vVqNPS_sO2ukzarWZsrWAULldKpBx1wyshYn4Wj_OUkUhDZrS_H3RTnDrfpjH0mD2YqKfaX-AhxTTb0pGQF3rStlYh2yInlq9wA0FhjX7-khZt-7Fg91w0f1x6fIdCDnXaiZImqdRMF2hmRG_DKcrrrT7Qs6ftGqN1dsMSD7SkRGhjjnu4iku0bPxOLXf11GLxb-PTpmhDgAKzUt28g2ojz4KSYYSet9qKrpgxYNpx2BXP0zMiqG12mEW9aodJ5Q0djFaXiox_X1_wEdz8jcH8eIoordQLhrSVSXORF-XJpP73cRMKRmwvyYi_d1VYFIRUgxeDRuwH2kK_l2hNdDso_ecrRxsPJ8yi-kTe8IkB8D-1NyWbunDTk5EleeHjNz7EV-PaLd8NMHNIIvyFFK2yLxYJpmSvZaSPXd1XdL6Xyz49kDgxIEayagFSnyIDBWNRLG0AScXKFz7j21sd6JOAQ7oJsLn0BOATSsrKclSxgcnDaCJBA2LpuSasp2wWSW5VKDHRu0oO0xwGzmKlpYShkSTQBL-2IE_8lCdmZ_W06b0kVXVr9mU64hN_5U3yLAliTAI65TDkPK1EwwkamuhQY/w140-h140-p/t019fcbbc1ed98ba0fc.jpg"
        class="avatar"
        alt=""
      />
    </div>
    <div class="userinfo">
      <div class="user-item">
        <h4>關於</h4>
      </div>
      <div class="user-item">
        <svg-icon icon-class="user" />
        <span> Yuchi</span>
      </div>
      <div class="user-item">
        <svg-icon icon-class="email" />
        <span> m10817038</span>
      </div>
      <div class="user-item">
        <svg-icon icon-class="github" />
        <span> ek2061</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
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
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
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
  top: 30%;
  padding: 0.5rem;
  text-align: center;
  font-size: 28px;
  color: #333;
}
</style>