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
        添加
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
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
          {{ scope.row.item_type }}
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

      <el-table-column label="支付者" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.payer_id }}
        </template>
      </el-table-column>

      <el-table-column label="記錄者" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.recorder_id }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="created_at"
        label="記帳日期"
        sortable
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span> {{ scope.row.date }}</span>
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
      <Dialog
        :dialog="dialog"
        :formData="formData"
        @update="getFund"
      ></Dialog>
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
      formData: {
        id: "",
        item_type: "",
        items: "",
        cost: "",
        date: "",
        payer_id: "",
        recorder_id: "",
      },
      fundData: [
        {
          id: 1,
          item_type: "用品費",
          items: "購買垃圾袋",
          cost: -120,
          date: "2021/05/23 16:25",
          payer_id: "張瑞鴻",
          recorder_id: "張瑞鴻",
        },
        {
          id: 2,
          item_type: "餐費",
          items: "購買中午開會便當",
          cost: -1095,
          date: "2021/05/23 16:27",
          payer_id: "鄭友智",
          recorder_id: "鄭友智",
        },
        {
          id: 3,
          item_type: "入帳",
          items: "科技部計劃入帳",
          cost: 6000,
          date: "2021/05/23 17:53",
          payer_id: "鄒學緯",
          recorder_id: "鄒學緯",
        },
        {
          id: 4,
          item_type: "用品費",
          items: "購買實驗用雞蛋",
          cost: -300,
          date: "2021/05/23 18:05",
          payer_id: "徐仕勳",
          recorder_id: "徐仕勳",
        },
      ],
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
    this.getFund()
  },
  methods: {
    getFund() {
      this.listLoading = true
      // 獲取表格數據
      // this.$axios
      //   .get("/api/profiles")
      //   .then((res) => {
      //     this.tableData = res.data;
      //   })
      //   .catch((err) => console.log(err));    
      this.tableData = this.fundData
      this.listLoading = false
    },
    handleFilter() {
      console.log("handleFilter");
    },
    handleCreate() {
      this.dialog = {
        show: true,
        title: "添加經費",
        option: "add",
      },
      this.formData = {
        id: "",
        item_type: "",
        items: "",
        cost: "",
        date: "",
        payer_id: "",
        recorder_id: "",
      },
      console.log("handleCreate");
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改經費",
        option: "edit",
      };
      this.formData = {
        id: row.id,
        item_type: row.item_type,
        items: row.items,
        cost: row.cost,
        date: row.date,
        payer_id: row.payer_id,
        recorder_id: row.recorder_id, 
      };
    },
    handleDelete(index, row){
      // this.$axios.delete(`api/profiles/delete/${row._id}`).then(res => {
      //   this.$message("刪除成功")
      //   this.getFund()
      // })
      console.log("handleDelete")
      console.log(index, row)
    }
  },
  components: {
    Dialog,
  },
};
</script>