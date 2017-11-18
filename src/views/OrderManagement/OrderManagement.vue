<template>
	<section>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="所有订单" name="first">
				<el-template>
					<!--工具条-->
					<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<!-- <el-form-item label="">
								<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item> -->
							<el-form-item label="订单号">
								<el-input v-model="orderNum" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="下单时间">
									<el-date-picker v-model="startType" type="date" placeholder="选择日期"> </el-date-picker>
							</el-form-item>
							<el-form-item label="至">
									<el-date-picker v-model="endType" type="date" placeholder="选择日期"> </el-date-picker>
							</el-form-item>
							<el-form-item label="">
                 <el-select v-model="type" placeholder="订单状态">
                  <el-option label="未发货" value="NONE-UNSEND"></el-option>
                  <el-option label="已发货" value="UNRECEIVED-FINISH"></el-option>  
                </el-select> 
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-on:click="getOrder1('s')">筛选</el-button>
							</el-form-item>
						</el-form>
					</el-col>

					<!--列表-->
					<el-table :data="Orders1" ref="multipleTable1" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
						<el-table-column type="selection"> 
						</el-table-column>
						<el-table-column label="商品" >
							<template scope="scope">
                <table style="width:140px;height:140px;"><tr style="background-color: rgba(255, 255, 255, 0);"><td colspan="2" style="border-bottom-width: 0px;">
								<el-button @click="handleExpressNo(scope.row.id)" type="text" style=" color: rgb(165, 99, 16);">订单号：{{scope.row.id}}</el-button>
                </td></tr><tr  style="background-color: rgba(255, 255, 255, 0);"><td style="border-bottom-width: 0px;">
								 <img style="width:140px;height:140px;" :src="scope.row.goods.img"></td><td style="border-bottom-width: 0px;">
								<el-button @click="editgoods(scope.row.goods.id)" style="width:140px;height:140px;line-height: 120px; color: rgb(165, 99, 16);" type="text">{{scope.row.goods.name}}</el-button></td></tr>
                </table>
							</template>
						</el-table-column>
						<el-table-column prop="goodsNum" width="120" label="数量">
						</el-table-column>
						<el-table-column prop="money" label="实付金额">
						</el-table-column>
						<el-table-column label="买家">
							<template scope="scope">
								<el-button @click="handleUser(scope.row.consulor.id)" style=" color: rgb(165, 99, 16);" type="text">{{scope.row.consulor.nickName}}</el-button>
							</template>
						</el-table-column> 
						<el-table-column label="发货备注" >
							<template scope="scope">
								<span v-if="scope.row.detial!=''" >{{scope.row.detial}}</span> 
								<el-button  v-if="scope.row.detial==''"  size="small" @click="handleEditt(scope.$index, scope.row)">添加</el-button>
							</template>
						</el-table-column>
						<el-table-column label="订单状态" >
							<template scope="scope">  
							<span v-if="scope.row.pay==false">未付款</span> 
							<span v-if="scope.row.state=='UNSEND'">待发货</span> 
							<span v-if="scope.row.state=='UNRECEIVED'">已发货</span> <br>
								<el-button size="small"   v-if="scope.row.state=='UNSEND'"   @click="handleEdit(scope.$index, scope.row)">发货</el-button>
							<el-button size="small"   v-if="scope.row.state=='UNRECEIVED'"   @click="handleEdit(scope.$index, scope.row)">物流</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" :formatter="formatTime"   label="下单时间">
						</el-table-column>
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-button @click="toggleSelection(Orders1,1)">全选</el-button> 
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
						<!-- <el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button> -->
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total1" style="float:right;">
						</el-pagination>
					</el-col>

				</el-template>
			</el-tab-pane>
			<el-tab-pane label="待发货" name="second">
					<el-template>
					<!--工具条-->
					<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<el-form-item label="">
								<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="">
								<el-input v-model="filters.startDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="下单时间">
									<el-date-picker v-model="filters.endTimestamp" type="date" placeholder="选择日期"> </el-date-picker>
							</el-form-item>
							<el-form-item label="至">
									<el-date-picker v-model="filters.endTimestamp" type="date" placeholder="选择日期"> </el-date-picker>
							</el-form-item>
							<el-form-item label="">
								<el-select v-model="value" placeholder="订单状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-on:click="getOrders2">筛选</el-button>
							</el-form-item>
						</el-form>
					</el-col> -->

					<!--列表-->
					<el-table :data="Orders2" ref="multipleTable2" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
							<el-table-column type="selection"> 
						</el-table-column>
						<el-table-column label="商品">
							<template scope="scope">
                <table style="width:140px;height:140px;"><tr style="background-color: rgba(255, 255, 255, 0);"><td colspan="2" style="border-bottom-width: 0px;">
								<el-button @click="handleExpressNo(scope.row.id)" type="text" style=" color: rgb(165, 99, 16);">订单号：{{scope.row.id}}</el-button>
                </td></tr><tr  style="background-color: rgba(255, 255, 255, 0);"><td style="border-bottom-width: 0px;">
								 <img style="width:140px;height:140px;" :src="scope.row.goods.img"></td><td style="border-bottom-width: 0px;">
								<el-button @click="editgoods(scope.row.goods.id)" style="width:140px;height:140px;line-height: 120px; color: rgb(165, 99, 16);" type="text">{{scope.row.goods.name}}</el-button></td></tr>
                </table>
							</template>
						</el-table-column>
						<el-table-column prop="goodsNum"  width="120" label="数量">
						</el-table-column>
						<el-table-column prop="money" label="实付金额">
						</el-table-column>
						<el-table-column label="买家">
							<template scope="scope">
								<el-button @click="handleUser(scope.row.consulor.id)" style=" color: rgb(165, 99, 16);" type="text">{{scope.row.consulor.nickName}}</el-button>
							</template>
						</el-table-column> 
						<el-table-column label="发货备注">
							<template scope="scope">
								<span v-if="scope.row.detial!=''" >{{scope.row.detial}}</span> 
								<el-button  v-if="scope.row.detial==''"  size="small" @click="handleEditt(scope.$index, scope.row)">添加</el-button>
							</template>
						</el-table-column>
						<el-table-column label="订单状态">
							<template scope="scope">
							<span v-if="scope.row.state=='UNSEND'">待发货</span> 
							<span v-if="scope.row.state=='UNRECEIVED'">已发货</span> <br>
								<el-button size="small"   v-if="scope.row.state=='UNSEND'"   @click="handleEdit(scope.$index, scope.row)">发货</el-button>
							<el-button size="small"   v-if="scope.row.state=='UNRECEIVED'"   @click="handleEdit(scope.$index, scope.row)">物流</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" :formatter="formatTime" label="下单时间">
						</el-table-column>
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-button @click="toggleSelection(Orders2,2)">全选</el-button>
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
						<!-- <el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button> -->
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total1" style="float:right;">
						</el-pagination>
					</el-col>

				</el-template>
			</el-tab-pane>
			<el-tab-pane label="已发货" name="third">
					<el-template>
					<!--工具条-->
					<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<el-form-item label="">
								<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="">
								<el-input v-model="filters.startDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="下单时间">
									<el-date-picker v-model="filters.endTimestamp" type="date" placeholder="选择日期"> </el-date-picker>
							</el-form-item>
							<el-form-item label="至">
									<el-date-picker v-model="filters.endTimestamp" type="date" placeholder="选择日期"> </el-date-picker>
							</el-form-item>
							<el-form-item label="">
								<el-select v-model="value" placeholder="订单状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-on:click="getOrders3">筛选</el-button>
							</el-form-item>
						</el-form>
					</el-col> -->

					<!--列表-->
					<el-table :data="Orders3" ref="multipleTable3" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
						<el-table-column type="selection"> 
						</el-table-column>
						<el-table-column label="商品">
							<template scope="scope">
                <table style="width:140px;height:140px;"><tr style="background-color: rgba(255, 255, 255, 0);"><td colspan="2" style="border-bottom-width: 0px;">
								<el-button @click="handleExpressNo(scope.row.id)" type="text" style=" color: rgb(165, 99, 16);">订单号：{{scope.row.id}}</el-button>
                </td></tr><tr  style="background-color: rgba(255, 255, 255, 0);"><td style="border-bottom-width: 0px;">
								 <img style="width:140px;height:140px;" :src="scope.row.goods.img"></td><td style="border-bottom-width: 0px;">
								<el-button @click="editgoods(scope.row.goods.id)" style="width:140px;height:140px;line-height: 120px; color: rgb(165, 99, 16);" type="text">{{scope.row.goods.name}}</el-button></td></tr>
                </table>
							</template>
						</el-table-column>
						<el-table-column prop="goodsNum"  width="120" label="数量">
						</el-table-column>
						<el-table-column prop="money" label="实付金额">
						</el-table-column>
						<el-table-column label="买家">
							<template scope="scope">
								<el-button @click="handleUser(scope.row.consulor.id)" style=" color: rgb(165, 99, 16);" type="text">{{scope.row.consulor.nickName}}</el-button>
							</template>
						</el-table-column>
						<el-table-column label="发货备注">
							<template scope="scope">
								<span v-if="scope.row.detial!=''" >{{scope.row.detial}}</span> 
								<el-button  v-if="scope.row.detial==''"  size="small" @click="handleEditt(scope.$index, scope.row)">添加</el-button>
							</template>
						</el-table-column>
						<el-table-column label="订单状态">
							<template scope="scope">
							<span v-if="scope.row.state=='UNSEND'">待发货</span> 
							<span v-if="scope.row.state=='UNRECEIVED'">已发货</span> <br>
								<el-button size="small"   v-if="scope.row.state=='UNSEND'"   @click="handleEdit(scope.$index, scope.row)">发货</el-button>
							<el-button size="small"   v-if="scope.row.state=='UNRECEIVED'"   @click="handleEdit(scope.$index, scope.row)">物流</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" :formatter="formatTime" label="下单时间">
						</el-table-column>
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-button @click="toggleSelection(Orders3,3)">全选</el-button>
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
						<el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button>
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total1" style="float:right;">
						</el-pagination>
					</el-col>

				</el-template>
			</el-tab-pane>
		</el-tabs>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			
			<el-row><el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
			 
				<el-table :data="goodsWl" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="name" label="产品" width="180">
					</el-table-column>
					<el-table-column prop="num" label="数量" width="130">
					</el-table-column>
					<el-table-column prop="expressCompanyandexpressNo" label="物流/单号" width="180">
					</el-table-column>
					<el-table-column prop="state" label="状态" width="120">
					</el-table-column>
				</el-table>
				<br>
				<el-col :span="7"> 
					<el-form-item label="物流公司" prop="name">
						<el-input v-model="editForm.expressCompany" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="收货地址" >  
            <!-- <el-input v-model="address" auto-complete="off"></el-input>  -->
            <el-tag style="color:#000;background-color:#FFF;"  v-model="address">{{address}}</el-tag> 
					</el-form-item>
				</el-col>

				<el-col :span="7">
					<el-form-item label="快递单号">
            <el-input v-model="editForm.expressNo" auto-complete="off"></el-input> 
					</el-form-item>
					<el-form-item label="">
					</el-form-item>
				</el-col>
			</el-form>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-button @click.native="editFormVisible = false">返回</el-button>
					<el-button type="primary" @click="onSubmit">保存</el-button>
					<br><br><br>
				</el-col>
				<el-col :span="8">
					<el-form-item>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- <div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div> -->
		</el-dialog>
    <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible2" :close-on-click-modal="false">
			
			<el-row>
        <el-form :model="editForm2" label-width="80px" :rules="editFormRules" ref="editForm2">
		 
				<br> 

				<el-col :span="23">
					<el-form-item label="发货备注">
            <el-input v-model="editForm2.detial" placeholder=""></el-input> 
					</el-form-item> 
				</el-col>
			</el-form>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-button @click.native="editFormVisible2 = false">返回</el-button>
					<el-button type="primary" @click="onSubmitt">保存</el-button>
					<br><br><br>
				</el-col>
				<el-col :span="8">
					<el-form-item>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- <div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div> -->
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress' this.$route.query.receiveID
import {
  getUserList,
  getAllOrderList,
  getOrderList,
  getUOrderList,
  getFOrderList,
  delGoods,
  upGoods,
  downGoods,
  setNumber
} from "../../api/api";

export default {
  data() {
    return {
      startType: "",
      endType: "",
      orderNum: "",
      type: "",
      address: "",
      editFormVisible: false, //编辑界面是否显示
      editFormVisible2: false, //编辑界面是否显示
      //编辑界面数据
      id: "",
      id2: "",
      editForm: {
        detial: "",
        distributionType: "", //快递方式
        expressCompany: "", //快递公司
        expressNo: "" //单号
      },
      editForm2: {
        detial: "",
        distributionType: "", //快递方式
        expressCompany: "", //快递公司
        expressNo: "" //单号
      },
      goodsWl: [
        {
          goodname: "",
          num: "",
          expressCompanyandexpressNo: "",
          state: ""
        }
      ],
      //显示编辑界面
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        this.id = row.id;
        this.editForm.detial = row.detial;
        this.editForm.distributionType = row.distributionType;
        this.editForm.expressCompany = row.expressCompany;
        this.editForm.expressNo = row.expressNo;
        this.address = row.address.site;

        this.goodsWl[0].name = row.goodsName;
        this.goodsWl[0].num = row.goodsNum;
        this.goodsWl[0].expressCompanyandexpressNo =
          row.expressCompany + " " + row.expressNo;
        this.goodsWl[0].state = row.state == "UNRECEIVED" ? "已发货" : "未发货";
        //  this.editForm = Object.assign({}, row);
      },
      //显示编辑界面
      handleEditt: function(index, row) {
        this.editFormVisible2 = true;
        this.id2 = row.id;
        this.editForm2.detial = row.detial;
        this.editForm2.distributionType = row.distributionType;
        this.editForm2.expressCompany = row.expressCompany;
        this.editForm2.expressNo = row.expressNo;
        // this.editForm2 = Object.assign({}, row);
      },
      activeName: "first",
      Orders1: [],
      Orders2: [],
      Orders3: [],
      total1: 0,
      page: 1,
      Orders2: [],
      total2: 0,
      page: 1,
      Orders3: [],
      total3: 0,
      page: 1,
      listLoading: false,
      sels: [] //列表选中列
    };
  },
  methods: {
    formatTime: function(row, column) {
      return util.formatDate.format(new Date(row.createTime), "yyyy-MM-dd");
      //row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
    },
    onSubmit() {
      var that = this;
      that.Loading = true;
      let para = {
        data: Object.assign({}, this.editForm)
      };
      para.param = sessionStorage.getItem("token") + "/" + that.id; // "59cbb548336a522ad06efe7e";
      setNumber(para).then(res => {
        if (res.status == 200) {
          that.Loading = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
        }
        this.editFormVisible = false;
        that.loaddata();
      });
    },
    onSubmitt() {
      var that = this;
      that.Loading = true;
      let para = {
        data: Object.assign({}, this.editForm2)
      };
      para.param = sessionStorage.getItem("token") + "/" + that.id2; // "59cbb548336a522ad06efe7e";
      setNumber(para).then(res => {
        if (res.status == 200) {
          that.Loading = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
          //that.goBack();
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
        }
        this.editFormVisible2 = false;
        that.loaddata();
      });
    },
    handleExpressNo: function(expressNo) {
      this.$router.push({
        path: "/OrderDetalis",
        query: { pageType: "Detalis", id: expressNo }
      });
    },
    // handleExpressNo: function(expressNo) {
    //   this.$router.push({
    //     path: "/OrderDetalis",
    //     query: { pageType: "edit", token: expressNo }
    //   });
    // },
    editgoods: function(id) {
      this.$router.push({
        path: "/GoodsAdd",
        query: { pageType: "edit", goodsid: id }
      });
    },
    handleUser: function(id) {
      this.$router.push({
        path: "/CustomerDetails",
        query: { pageType: "edit", token: id }
      });
    },
    loaddata: function() {
      var activeName = this.activeName;
      if (activeName == "first") {
        this.getOrder1();
      } else if (activeName == "second") {
        this.getOrders2();
      } else if (activeName == "third") {
        this.getOrders3();
      }
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.$refs.multipleTable1.clearSelection();
        this.getOrder1();
      } else if (tab.name == "second") {
        this.$refs.multipleTable2.clearSelection();
        this.getOrders2();
      } else if (tab.name == "third") {
        this.$refs.multipleTable3.clearSelection();
        this.getOrders3();
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getOrder1();
      this.getOrders2();
      this.getOrders3();
    },

    batchup() {
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认上架选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          ids.forEach(id => {
            let para = { goodsid: id };
            upGoods(para).then(res => {});
          });
          this.listLoading = false;
          this.$message({
            message: "上架成功",
            type: "success"
          });
          this.loaddata();
        })
        .catch(() => {});
    },
    batchdown() {
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认下架选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          ids.forEach(id => {
            let para = { goodsid: id };
            downGoods(para).then(res => {});
          });
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: "下架成功",
            type: "success"
          });
          this.loaddata();
        })
        .catch(() => {});
    },
    //获取用户列表
    getOrderList() {},
    //获取全部列表
    getOrder1(type1) {
      var that = this;
      var pstartType = Date.parse(that.startType) / 1000;
      var pendType = Date.parse(that.endType) / 1000;
      var porderNum = that.orderNum;
      var ptype = that.type;
      let para = {
        param:
          "?size=20&&page=" +
          (that.page - 1) +
          // (!!type && (!!pstartType || !!pendType || !!porderNum || !!ptype)
          //   ?
             (pstartType? ("&&startType=" + pstartType) :"") +
              (pendType? ("&&endType=" +  pendType) :"") +
               (porderNum? ("&&orderNum=" + porderNum) :"")+
           (!!type1? (ptype? ("&&state=" +  ptype):""):"&state=NONE-UNSEND-UNRECEIVED-FINISH")
           // : "") // "sessionStorage.getItem("token")"
      };
      this.listLoading = true;
      getAllOrderList(para).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "加载成功",
            type: "success"
          });
          this.total1 = res.data.totalSize;
          this.Orders1 = res.data.orders;
          this.listLoading = false;
        } else {
          this.$message({
            message: "加载失败",
            type: "warning"
          });
        }
      });
    },
    //获取待发货列表
    getOrders2() {
      let para = {
        param:"?state=NONE-UNSEND"
         // sessionStorage.getItem("token")// + "?refundState=NONE-APPLY-WAITING"
      };
      this.listLoading = true;
      getAllOrderList(para).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "加载成功",
            type: "success"
          });
          debugger
          this.total2 = 20;
          this.Orders2 = res.data.orders;
          this.listLoading = false;
        } else {
          this.$message({
            message: "加载失败",
            type: "warning"
          });
        }

        console.log(res);
      });
    },
    //获取已发货列表
    getOrders3() {
      let para = {
        param: "?state=UNRECEIVED-FINISH"
      };
      this.listLoading = true;
      getAllOrderList(para).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "加载成功",
            type: "success"
          });
          this.total3 = 20;
          this.Orders3 = res.data.orders;
          this.listLoading = false;
        } else {
          this.$message({
            message: "加载失败",
            type: "warning"
          });
        }

        console.log(res);
      });
    },
    down: function(index, row) {
      this.$confirm("确认下架该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = { goodsid: row.id };
          downGoods(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "下架成功",
              type: "success"
            });
            this.loaddata();
          });
        })
        .catch(() => {});
    },
    up: function(index, row) {
      this.$confirm("确认上架该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = { goodsid: row.id };
          downGoods(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "上架成功",
              type: "success"
            });
            this.loaddata();
          });
        })
        .catch(() => {});
    },
    addUser: function() {
      var pageType = "add";
      this.$router.push({ path: "/GoodsAdd", query: { pageType: "add" } });
    },
    editUser: function(index, row) {
      this.$router.push({
        path: "/GoodsAdd",
        query: { pageType: "edit", goodsid: row.id }
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
        if (index == 3) this.$refs.multipleTable3.clearSelection();
      }
      if (rows) {
        rows.forEach(row => {
          if (index == 1) this.$refs.multipleTable1.toggleRowSelection(row);
          if (index == 2) this.$refs.multipleTable2.toggleRowSelection(row);
          if (index == 3) this.$refs.multipleTable3.toggleRowSelection(row);
        });
      } else {
        if (index == 1) this.$refs.multipleTable1.clearSelection();
        if (index == 2) this.$refs.multipleTable2.clearSelection();
        if (index == 3) this.$refs.multipleTable3.clearSelection();
      }
      // var checklength = this.sels.length;
      // var activeName = this.activeName;
      // this.$refs.multipleTable.clearSelection();
      // var orderlist = [];
      // if (activeName == "first") {
      //   orderlist = this.Orders1;
      // } else if (activeName == "second") {
      //   orderlist = this.Orders2;
      // } else if (activeName == "third") {
      //   orderlist = this.Orders3;
      // }

      // var length = this.orderlist.length;
      // if (length != checklength) {
      //   orderlist.forEach(row => {
      //     this.$refs.multipleTable.toggleRowSelection(row);
      //   });
      // } else {
      //   this.$refs.multipleTable.clearSelection();
      // }
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          ids.forEach(id => {
            let para = { goodsid: id };
            delGoods(para).then(res => {});
          });
          this.listLoading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.loaddata();
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getOrder1();
  }
};
</script>

<style scoped>

</style>