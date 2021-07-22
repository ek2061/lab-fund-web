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
          label-width="80px"
          style="margin: 20px; width: 400px"
        >
          <el-form-item label="類別" prop="types">
            <el-select v-model="formData.types" placeholder="類別">
              <el-option
                v-for="(types, index) in types_list"
                :key="index"
                :label="types"
                :value="types"
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
          <el-form-item prop="purchaseDate" label="購買日期">
            <el-date-picker
              v-model="purchaseDate"
              type="date"
              placeholder="選擇日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="支付者" prop="payer_id">
            <el-select
              v-model="formData.payer_id"
              filterable
              placeholder="支付者"
              no-match-text="你太會取名了吧我都找不到"
              no-data-text="無任何支付者可選"
            >
              <el-option
                v-for="item in payer_list"
                :key="item.value"
                :label="item.name"
                :value="item._id"
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
      purchaseDate: new Date(),
      types_list: ["餐費", "用品費", "入帳", "其他"],
      payer_list: [],
      form_rules: {
        types: [
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
  created() {
    this.getPayer();
  },
  methods: {
    getPayer() {
      this.$axios({
        method: "get",
        url: "http://140.125.45.167:3000/api/user/all",
      })
        .then((res) => {
          this.payer_list = res.data;
        })
        .catch((err) => console.log(err));
    },
    onSumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.formData.purchaseDate = this.purchaseDate;
          const form_method = this.dialog.option === "add" ? "post" : "put";
          const form_url =
            this.dialog.option === "add" ? "" : `/${this.formData.id}`;
          this.formData.payer_id;
          this.$axios({
            method: form_method, // post or put
            url: "http://140.125.45.167:3000/api/fund" + form_url,
            data: JSON.stringify(this.formData),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              this.$message({
                message: this.dialog.option == "add" ? "添加成功" : "編輯成功",
                type: "success",
              });
            })
            .then(() => {
              // 關閉dailog
              this.dialog.show = false;
              this.$emit("update");
            });
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