<template>
  <div class="app-container">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-click-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-position="left"
          label-width="70px"
          style="margin: 20px; width: 400px"
        >
          <el-form-item label="類別:" prop="item_type">
            <el-select v-model="formData.item_type" placeholder="類別">
              <el-option
                v-for="(item_type, index) in item_type_list"
                :key="index"
                :label="item_type"
                :value="item_type"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="items" label="描述">
            <el-input type="items" v-model="formData.items"></el-input>
          </el-form-item>
          <el-form-item prop="cost" label="收支">
            <el-input type="cost" v-model="formData.cost"></el-input>
          </el-form-item>
          <el-form-item label="支付者" prop="payer_id">
            <el-select v-model="formData.payer_id" placeholder="支付者">
              <el-option
                v-for="(format_payer_id, index) in format_payer_id_list"
                :key="index"
                :label="format_payer_id"
                :value="format_payer_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button type="primary" @click="onSumbit('form')">
              提交
            </el-button>
            <el-button @click="dialog.show = false"> 取消 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      item_type_list: ["餐費", "用品費", "入帳", "其他"],
      format_payer_id_list: ["張瑞鴻", "鄭友智", "鄒學緯", "徐仕勳"],
      form_rules: {
        item_type: [
          {
            required: true,
            message: "種類不能為空",
            trigger: ["blur", "change"],
          },
        ],
        items: [{ required: true, message: "描述不能為空", trigger: "blur" }],
        cost: [{ required: true, message: "收支不能為空", trigger: "blur" }],
        payer_id: [
          {
            required: true,
            message: "支付者不能為空",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  props: {
    dialog: Object,
    formData: Object,
  },
  methods: {
    onSumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 定義dialog要做的事
          const opt =
            this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          //   this.$axios
          //     .post(`/api/profiles/${opt}`, this.formData)
          //     .then(() => {
          //       //  添加成功
          //       this.$message({
          //         message: opt == "add" ? "添加成功" : "編輯成功",
          //         type: "success",
          //       });
          //       // 關閉dailog
          //       this.dialog.show = false;
          //       this.$emit("update");
          //     });
          console.log(opt);
          console.log(this.formData);
          // 關閉dailog
          this.dialog.show = false;
        }
      });
    },
  },
};
</script>

<style scoped>
/* @media screen and (max-width: 780px) {
  .el-dialog--small {
    width: 380px !important;
  }
}
@media screen and (max-width: 990px) {
  .seqnum-desc {
    display: none;
  }
}
@media screen and (min-width: 990px) {
  .el-dialog--small {
    width: 700px !important;
  }
} */
</style>