<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        placeholder="輸入關鍵字搜尋"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
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
    <span class="showTotalFund" style="color: #721c24">$94870</span>
    <span class="showTotalFund">我的經費</span>
    <span class="showTotalFund" style="color: #721c24">${{myMoney}}</span>
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
          {{ scope.$index }}
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
          {{ scope.row.payer_id }}
        </template>
      </el-table-column>

      <el-table-column label="記錄者" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.recorder_id }}
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
    <div>
      <Dialog :dialog="dialog" :formData="formData" @update="getFund"></Dialog>
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
      tableData: null,
      myMoney: "i dont know",
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
  created() {
    // this.fetchData();
    this.getFund();
    this.getMyMoney();
  },
  methods: {
    getFund() {
      this.listLoading = true;
      // 獲取表格數據
      this.$axios({
        method: "get",
        url: "http://140.125.45.162:3003/api/fund",
      })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => console.log(err));

      this.listLoading = false;
    },
    getMyMoney() {
      this.$axios({
        method: "get",
        url: "http://140.125.45.162:3003/api/user",
      })
        .then((res) => {
          this.myMoney = res.data["money"];
        })
        .catch((err) => console.log(err));
    },
    handleFilter() {
      console.log("handleFilter");
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
        }),
        console.log("handleCreate");
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
        url: `http://140.125.45.162:3003/api/fund/${row._id}`,
      }).then(() => {
        this.$message({
          message: "刪除成功",
          type: "success",
        });
        this.getFund();
      });
    },
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