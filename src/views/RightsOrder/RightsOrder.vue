<template>
    <section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="退款中" name="first">
                <el-template>
                    <section>
                        <!--工具条-->
                        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                            <el-form :inline="true" :model="filters">
                                <el-form-item label="买家昵称">
                                    <el-input v-model="filters.name" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="订单编号 ">
                                    <el-input v-model="filters.oderNo" placeholder=""></el-input>
                                </el-form-item> <br>
                                <el-form-item label="退货单号">
                                    <el-input v-model="filters.refundOrderCode" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="提交时间">
                                        <el-date-picker v-model="filters.startDateTime" type="date" placeholder="选择日期"> </el-date-picker>
                                </el-form-item>
                                <el-form-item label="至">
                                    <el-date-picker v-model="filters.endDateTime" type="date" placeholder="选择日期"> </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" v-on:click="getOrder1">筛选</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>

                            <!--列表-->
                            <el-table :data="order1"  ref="multipleTable1"   highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                                <el-table-column type="selection" width="55">
                                </el-table-column> 
                                <el-table-column prop="goodsName" label="商品"  >
                                </el-table-column>
                                <el-table-column prop="money" label="支付金额" >
                                </el-table-column> 
                                <el-table-column prop="money" label="退款金额" >
                                </el-table-column>
                                <el-table-column prop="refundMessage" label="退款原因">
                                </el-table-column>
                                <el-table-column prop="userName" label="买家" >
                                </el-table-column>
                                    <el-table-column prop="expressNo" label="退货物流">
                                </el-table-column>
                                    <el-table-column prop="createTime" label="状态" >
                                      <template scope="scope">
                                            退款中
                                        </template>
                                </el-table-column>
                                <el-table-column label="操作" width="240">
                                    <template scope="scope">
                                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                                        <el-button size="small" @click="Pass(scope.$index, scope.row)">通过</el-button>
                                        <el-button type="danger" size="small" @click="Pass(scope.$index, scope.row)">不通过</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="toggleSelection(order1,1)">全选</el-button>
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">退款</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total1" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </section>
                </el-template>
            </el-tab-pane>
            <el-tab-pane label="已退款" name="second">
                <el-template>
                    <section>
                        <!--工具条-->
                        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                            <el-form :inline="true" :model="filters">
                                <el-form-item label="买家昵称">
                                    <el-input v-model="filters.name" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="订单编号 ">
                                    <el-input v-model="filters.oderNo" placeholder=""></el-input>
                                </el-form-item> <br>
                                <el-form-item label="退货单号">
                                    <el-input v-model="filters.refundOrderCode" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="提交时间">
                                        <el-date-picker v-model="filters.startDateTime" type="date" placeholder="选择日期"> </el-date-picker>
                                </el-form-item>
                                <el-form-item label="至">
                                    <el-date-picker v-model="filters.endDateTime" type="date" placeholder="选择日期"> </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" v-on:click="getOrder1">筛选</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>

                            <!--列表-->
                            <el-table :data="order2" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                                <el-table-column type="selection" width="55">
                                </el-table-column> 
                                <el-table-column prop="goodsName" label="商品"  >
                                </el-table-column>
                                <el-table-column prop="money" label="支付金额" >
                                </el-table-column> 
                                <el-table-column prop="money" label="退款金额" >
                                </el-table-column>
                                <el-table-column prop="refundMessage" label="退款原因">
                                </el-table-column>
                                <el-table-column prop="userName" label="买家" >
                                </el-table-column>
                                    <el-table-column prop="expressNo" label="退货物流">
                                </el-table-column>
                                    <el-table-column prop="createTime" label="状态" >
                                      <template scope="scope">
                                            已退款
                                        </template>
                                </el-table-column>
                                <el-table-column label="操作" width="240">
                                    <template scope="scope">
                                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total2" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </section>

                </el-template>
            </el-tab-pane>
        </el-tabs>
                      <!--编辑界面-->
                            <el-dialog title="订单详情" v-model="editFormVisible" :close-on-click-modal="false">
                                <el-form :model="editForm" label-width="80px"  ref="editForm">
                                    <el-form-item label="退款原因" >
                                        {{editForm.refundMessage}}
                                    </el-form-item>
                                    <el-form-item label="申请时间">
                                       {{editForm.apllyRefundDate}}
                                    </el-form-item>
                                    <el-form-item label="状态">
                                        {{editForm.refundState}}
                                    </el-form-item>
                                    <el-form-item label="所属顾问">
                                        {{editForm.userName}}
                                    </el-form-item>
                                    <el-form-item label="退货单号">
                                        {{editForm.expressNo}} 
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary"  @click.native="editFormVisible = false">确定</el-button>
                                  
                                </div>
                            </el-dialog>

    </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress' this.$route.query.receiveID
import { getRightsOrderList, passRefund } from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: "",
        oderNo: "",
        refundOrderCode: "",
        startDateTime: "",
        endDateTime: ""
      },
      activeName: "first",
      pageSize: 10,
      page: 0,
      order1: [],
      total1: 0,
      order2: [],
      total2: 0,
      listLoading: false,
      sels: [], //列表选中列
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      //编辑界面数据
      editForm: {
        refundMessage: "",
        apllyRefundDate: "",
        refundState: "",
        userName: "",
        expressNo: ""
      }
    };
  },
  methods: {
    loaddata: function() {
      if (activeName == "first") {
        this.getOrder1(0);
      }
      if (activeName == "second") {
        this.getOrder2(0);
      }
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.getOrder1(0);
      }
      if (tab.name == "second") {
        this.getOrder2(0);
      }
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      if (this.activeName == "first") {
        this.getOrder1(val - 1);
      }
      if (this.activeName == "second") {
        this.getOrder2(val - 1);
      }
    },
    //获取退款中列表
    getOrder1() {
      let para = {
        token: sessionStorage.getItem("token"),
        data: { refundState: "APPLY", size: this.pageSize, page: this.page }
      };
      this.listLoading = true;
      getRightsOrderList(para).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "退款中列表加载成功",
            type: "success"
          });
          this.total1 = res.data.totalSize;
          this.order1 = res.data.orders;
          this.listLoading = false;
        } else {
          this.$message({
            message: "退款中列表加载失败",
            type: "warning"
          });
        }
      });
    },
    //获取已退款列表
    getOrder2() {
      let para = {
        token: sessionStorage.getItem("token"),
        data: { refundState: "FINISH", size: this.pageSize, page:this.page }
      };
      this.listLoading = true;
      getRightsOrderList(para).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "已退款列表加载成功",
            type: "success"
          });
          this.total2 = res.data.totalSize;
          this.order2 = res.data.orders;
          this.listLoading = false;
        } else {
          this.$message({
            message: "已退款中列表加载失败",
            type: "warning"
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    toggleSelection(rows, index) {
      var length = rows.length;
      var checklength = this.sels.length;
      if (length != checklength) {
        if (index == 1) this.$refs.multipleTable1.clearSelection();
        if (index == 2) this.$refs.multipleTable2.clearSelection();
      }
      if (rows) {
        rows.forEach(row => {
          if (index == 1) this.$refs.multipleTable1.toggleRowSelection(row);
          if (index == 2) this.$refs.multipleTable2.toggleRowSelection(row);
        });
      } else {
        if (index == 1) this.$refs.multipleTable1.clearSelection();
        if (index == 2) this.$refs.multipleTable2.clearSelection();
      }
    },
    Pass: function(index, row) {
      this.$confirm("确认通过该退款申请吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = {
            token: sessionStorage.getItem("token"),
            data: {
              orderId: row.id,
              agree: true
            }
          };
          passRefund(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "通过退款申请成功",
              type: "success"
            });
            this.loaddata();
          });
        })
        .catch(() => {});
    },
    NotPass: function(index, row) {
      this.$confirm("确认不通过该退款申请吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = {
            token: sessionStorage.getItem("token"),
            data: {
              orderId: row.id,
              agree: true
            }
          };
          passRefund(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "不通过退款申请成功",
              type: "success"
            });
            this.loaddata();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      if (this.editForm.refundState == "APPLY") {
        this.editForm.refundState = "退款中";
      } else {
        this.editForm.refundState = "已退款";
      }
    }
  },
  mounted() {
    this.getOrder1(0);
  }
};
</script>

<style scoped>

</style>