<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        placeholder="輸入關鍵字搜尋"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        >{{ search }}</el-input
      >
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜尋
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>
    <span class="showTotalFund">總經費</span>
    <span
      class="showTotalFund"
      style="color: #721c24"
      v-text="this.labMoney"
      >{{}}</span
    >
    <span class="showTotalFund">我的經費</span>
    <span
      class="showTotalFund"
      style="color: #721c24"
      v-text="this.myMoney"
    ></span>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      highlight-current-row
      border
      fit
      style="width: 100%"
      empty-text="目前沒有資料"
    >
      <el-table-column align="center" label="編號" width="110">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="類別" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.types }}
        </template>
      </el-table-column>

      <el-table-column label="描述" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.items }}
        </template>
      </el-table-column>

      <el-table-column label="收支" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cost }}</span>
        </template>
      </el-table-column>

      <el-table-column label="支付者" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.payer_name }}
        </template>
      </el-table-column>

      <el-table-column label="記錄者" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.recorder_name }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="purchaseDate"
        label="購買日期"
        sortable
        width="240"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span> {{ scope.row.purchaseDate }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="operation" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            icon="delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">分頁測試中</span>
      <el-pagination
        :small="this.pagination_needsmall"
        background
        @current-change="handleCurrentChange"
        :layout="this.pagination_layout"
        :total="1000"
        :pager-count="5"
      >
      </el-pagination>
    </div>
    <div>
      <Dialog :dialog="dialog" :formData="formData" @update="updateAll"></Dialog>
    </div>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Dialog from "@/components/Dialog";
export default {
  name: "Table",
  // 自定義按鈕波紋動畫，使用v-waves
  directives: { waves },
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: "success",
  //       draft: "gray",
  //       deleted: "danger",
  //     };
  //     return statusMap[status];
  //   },
  // },
  data() {
    return {
      pagination_needsmall: false, // 用於確認分頁是否需要縮小
      pagination_layout: "prev, pager, next, jumper", // 用於顯示分頁要多少物件
      tableData: null,
      labMoney: "Nan",
      myMoney: "Nan",
      formData: {
        id: "",
        types: "",
        items: "",
        cost: "",
        purchaseDate: "",
        payer_id: "",
        recorder_id: "",
      },
      listLoading: true,
      search: "",
      dialog: {
        show: false,
        title: "",
        option: "edit",
      },
    };
  },
  mounted() {
    // 監聽網頁寬度
    window.addEventListener("resize", this.Switching);
  },
  created() {
    this.Switching();
    this.updateAll();
  },
  methods: {
    Switching() {
      // 變換瀏覽器尺寸時自適應參數
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      if (w >= 465) {
        this.pagination_layout = "prev, pager, next, jumper";
        this.pagination_needsmall = false;
      } else if (w >= 375) {
        // iphone 6/7/8 寬度
        this.pagination_layout = "prev, pager, next";
        this.pagination_needsmall = false;
      } else {  // 更小寬度
        this.pagination_needsmall = true;
      }
    },
    handleCurrentChange(val) {
      // 獲取分頁當前頁號碼
      console.log(`現在是第 ${val} 頁`);
      console.log(`現在關鍵字是 ${this.search}`)
    },
    getFund() {
      // 獲取每筆經費資料
      this.listLoading = true;
      // 獲取表格數據
      this.$axios({
        method: "get",
        url: "http://localhost:3000/api/fund",
      })
        .then((res) => {
          // console.log(res.data);
          this.tableData = res.data;
        })
        .catch((err) => console.log(err));

      this.listLoading = false;
    },
    getMyMoney() {
      // 獲取登入者身上經費總和
      this.$axios({
        method: "get",
        url: "http://localhost:3000/api/user",
      })
        .then((res) => {
          // console.log(res.data);
          this.myMoney = res.data["money"];
        })
        .catch((err) => console.log(err));
      console.log(this.myMoney);
    },
    getLabMoney() {
      // 獲取實驗室全部經費總和
      this.$axios({
        method: "get",
        url: "http://localhost:3000/api/user/total",
      })
        .then((res) => {
          this.labMoney = res.data["money"];
        })
        .catch((err) => console.log(err));
    },
    handleFilter() {
      console.log(this.search);
      this.$axios({
        method: "get",
        url: "http://localhost:3000/api/fund",
        params: { page: 1, keyword: this.search },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleCreate() {
      (this.dialog = {
        show: true,
        title: "添加經費",
        option: "add",
      }),
        (this.formData = {
          // id: "",
          types: "",
          items: "",
          cost: "",
          purchaseDate: "",
          payer_id: "",
          // recorder_id: "",
        });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改經費",
        option: "edit",
      };
      this.formData = {
        id: row._id,
        types: row.types,
        items: row.items,
        cost: row.cost,
        purchaseDate: row.purchaseDate,
        payer_id: row.payer_id,
        // recorder_id: row.recorder_id,
      };
    },
    handleDelete(index, row) {
      console.log(row._id);
      this.$axios({
        method: "delete",
        url: `http://localhost:3000/api/fund/${row._id}`,
      }).then((res) => {
        this.$message({
          message: "刪除成功",
          type: "success",
        });
        this.updateAll();
      });
    },
    updateAll(){
      this.getFund()
      this.getLabMoney()
      this.getMyMoney()
    }
  },
  components: {
    Dialog,
  },
};
</script>

<style scoped>
.showTotalFund {
  text-align: right;
  margin-left: 10px;
  font-weight: bold;
  /* background:#f8d7da; */
  font-family: "UD Digi Kyokasho N-B";
  font-size: 18px;
}
</style>