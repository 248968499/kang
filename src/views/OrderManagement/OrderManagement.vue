<template>
	<section>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="所有订单" name="all">
				<el-template>
					<!--工具条-->
					<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
								<el-input v-model="filters.endDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="至">
								<el-input v-model="filters.endDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="">
								<el-select v-model="value" placeholder="订单状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-on:click="getOrderList">筛选</el-button>
							</el-form-item>
						</el-form>
					</el-col>

					<!--列表-->
					<el-table :data="Orders1" ref="multipleTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
						<el-table-column type="selection" width="55">

						</el-table-column>
						<el-table-column label="商品" width="240">
							<template scope="scope">
								<el-button @click="handleExpressNo(scope.row.expressNo)" type="text">订单号：{{scope.row.expressNo}}</el-button>
								<el-button @click="handleExpressNo(scope.row.expressNo)" type="text">墨绿色长裤</el-button>
								<img style="width:140px;height:140px;" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png">
							</template>
						</el-table-column>
						<el-table-column prop="goodsNum" label="数量" width="120">
						</el-table-column>
						<el-table-column prop="money" label="实付金额">
						</el-table-column>
						<el-table-column label="买家">
							<template scope="scope">
								<el-button @click="handleUser(scope.row.user.id)" type="text">{{scope.row.user.name}}</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="goods" label="颜色分类">
						</el-table-column>
						<el-table-column prop="createTime" label="备注">
						</el-table-column>
						<el-table-column label="订单状态">
							<template scope="scope">
								代发货<br>
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">发货</el-button>
							</template>
						</el-table-column>
						<el-table-column label="发货备注" width="150">
							<template scope="scope">
								<span>订单号：{{scope.row.expressNo}}</span>
								送个小礼物
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">添加</el-button>
							</template>
						</el-table-column>
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-button @click="toggleSelection()">全选</el-button>
						<el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button>
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total1" style="float:right;">
						</el-pagination>
					</el-col>

				</el-template>
			</el-tab-pane>
			<el-tab-pane label="待发货" name="pane2">
				<el-template>
					<!--工具条-->
					<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
								<el-input v-model="filters.endDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="至">
								<el-input v-model="filters.startDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="">
								<el-select v-model="value" placeholder="订单状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-on:click="getOrderList">筛选</el-button>
							</el-form-item>
						</el-form>
					</el-col>

					<!--列表-->
					<el-table :data="Orders1" ref="multipleTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
						<el-table-column type="selection" width="55">

						</el-table-column>
						<el-table-column label="商品" width="240">
							<template scope="scope">
								<span>订单号：{{scope.row.expressNo}}</span>
								<img style="width:140px;height:140px;" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png">
							</template>
						</el-table-column>
						<el-table-column prop="goodsNum" label="数量" width="120">
						</el-table-column>
						<el-table-column prop="money" label="实付金额">
						</el-table-column>
						<el-table-column prop="user" label="买家">
						</el-table-column>
						<el-table-column prop="goods" label="颜色分类">
						</el-table-column>
						<el-table-column prop="createTime" label="备注">
						</el-table-column>
						<el-table-column label="订单状态">
							<template scope="scope">
								待发货<br>
								<el-button size="small" @click="editUser(scope.$index, scope.row)">发货</el-button>
							</template>
						</el-table-column>
						<el-table-column label="发货备注" width="150">
							<template scope="scope">
								送个小礼物
								<el-button size="small" @click="editUser(scope.$index, scope.row)">添加</el-button>
							</template>
						</el-table-column>
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-button @click="toggleSelection()">全选</el-button>
						<el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button>
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total1" style="float:right;">
						</el-pagination>
					</el-col>

				</el-template>
			</el-tab-pane>
			<el-tab-pane label="以发货" name="pane3">
				<el-template>
					<!--工具条-->
					<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
								<el-input v-model="filters.endDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="至">
								<el-input v-model="filters.startDateTime" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="">
								<el-select v-model="value" placeholder="订单状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-on:click="getOrderList">筛选</el-button>
							</el-form-item>
						</el-form>
					</el-col>

					<!--列表-->
					<el-table :data="Orders1" ref="multipleTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
						<el-table-column type="selection" width="55">

						</el-table-column>
						<el-table-column label="商品" width="240">
							<template scope="scope">
								<span>订单号：{{scope.row.expressNo}}</span>
								<img style="width:140px;height:140px;" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png">
							</template>
						</el-table-column>
						<el-table-column prop="goodsNum" label="数量" width="120">
						</el-table-column>
						<el-table-column prop="money" label="实付金额">
						</el-table-column>
						<el-table-column prop="user" label="买家">
						</el-table-column>
						<el-table-column prop="goods" label="颜色分类">
						</el-table-column>
						<el-table-column prop="createTime" label="备注">
						</el-table-column>
						<el-table-column label="订单状态">
							<template scope="scope">
								已发货<br>
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">物流</el-button>
							</template>
						</el-table-column>
						<el-table-column label="发货备注" width="150">
							<template scope="scope">
								送个小礼物
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">添加</el-button>
							</template>
						</el-table-column>
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-button @click="toggleSelection()">全选</el-button>
						<el-button @click="batchdown()" :disabled="this.sels.length===0">删除</el-button>
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total1" style="float:right;">
						</el-pagination>
					</el-col>

				</el-template>
			</el-tab-pane>
		</el-tabs>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			
			<el-row><el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				&nbsp; 0/2
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="name" label="产品" width="120">
					</el-table-column>
					<el-table-column prop="nickName" label="数量" width="100">
					</el-table-column>
					<el-table-column prop="mobile" label="物流/单号" width="180">
					</el-table-column>
					<el-table-column prop="followNum" label="状态" width="100">
					</el-table-column>
				</el-table>
				<br>
				<el-col :span="7"> 
					<el-form-item label="物流公司" prop="name">
						<el-input v-model="editForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="收货地址">
						XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
					</el-form-item>
				</el-col>

				<el-col :span="7">
					<el-form-item label="快递单号">
						<el-input-number v-model="editForm.age"></el-input-number>
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
					<el-button @click="goBack()">返回</el-button>
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
	</section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress' this.$route.query.receiveID
import { getUserList, getOrderList, delGoods, upGoods, downGoods } from '../../api/api';

export default {
	data() {
		return {
			filters: {
				name: ''
			},
			editFormVisible: false,//编辑界面是否显示
			//编辑界面数据
			editForm: {
				id: 0,
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			},
			//显示编辑界面
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			activeName: 'all',
			Orders1:
			[
				{
					"goods": {},
					"money": 123.00,
					"goodsNum": 2,//商品数量
					"receiver": {},
					"pay": true,//是否支付
					"state": "UNSEND",//未付款 NONE, 未发货 UNSEND,未收获 UNRECEIVED,已完成 FINISH
					"detial": "",
					"user": { id: 10000001, name: "皮皮" },
					"message": "留言",
					"distributionType": "配送方式",
					"expressCompany": "快递公司",
					"expressNo": "23141234123cdssfd"//单号
				}
			],
			total1: 0,
			page: 1,
			Orders2: [],
			total2: 0,
			page: 1,
			Orders3: [],
			total3: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
		}
	},
	methods: {
		handleExpressNo: function(expressNo) {
			this.$router.push({ path: '/OrderDetalis', query: { pageType: "edit", token: expressNo } });
		},
		handleUser: function(id) {
			this.$router.push({ path: '/CustomerDetails', query: { pageType: "edit", token: id } });
		},
		loaddata: function() {
			if (activeName == 'first') {
				this.getGoods1();
			}
			if (activeName == 'second') {
				this.getOrders2();
			}
			if (activeName == 'third') {
				this.getOrders3();
			}
		},
		handleClick(tab, event) {
			if (tab.name == 'first') {
				this.$refs.multipleTable.clearSelection();
				this.getGoods1();
			}
			if (tab.name == 'second') {
				this.$refs.multipleTable.clearSelection();
				this.getOrders2();
			}
			if (tab.name == 'third') {
				this.$refs.multipleTable.clearSelection();
				this.getOrders3();
			}
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getGoods1();
			this.getOrders2();
			this.getOrders3();
		},

		batchup() {
			var ids = this.sels.map(item => item.id);
			this.$confirm('确认上架选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				ids.forEach(id => {
					let para = { goodsid: id };
					upGoods(para).then((res) => {

					});
				});
				this.listLoading = false;
				this.$message({
					message: '上架成功',
					type: 'success'
				});
				this.loaddata();
			}).catch(() => {

			});
		},
		batchdown() {
			var ids = this.sels.map(item => item.id);
			this.$confirm('确认下架选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				ids.forEach(id => {
					let para = { goodsid: id };
					downGoods(para).then((res) => {

					});
				});
				this.listLoading = false;
				//NProgress.done();
				this.$message({
					message: '下架成功',
					type: 'success'
				});
				this.loaddata();
			}).catch(() => { });
		},
		//获取用户列表
		getOrderList() {
			let para = {
				param: sessionStorage.getItem('token')
			}
			this.listLoading = true;
			getOrderList(para).then((res) => {
				if (res.status == 200) {
					this.$message({
						message: '加载成功',
						type: 'success'
					});
					this.total1 = 20;
					this.users = res.data;
					this.listLoading = false;
				} else {
					this.$message({
						message: '加载失败',
						type: 'warning'
					});
				}
			});

		},
		//获取热卖列表
		getGoods1() {
			let para = {
				param: "59e57700336a527e8594c76a"//sessionStorage.getItem('token'),
			}
			this.listLoading = true;
			getOrderList(para).then((res) => {
				if (res.status == 200) {
					this.$message({
						message: '热卖列表加载成功',
						type: 'success'
					});
					this.total1 = 20;
					this.goods1 = res.data;
					this.listLoading = false;
				} else {
					this.$message({
						message: '热卖列表加载失败',
						type: 'warning'
					});
				}

				console.log(res)
			});
		},
		//获取已售罄列表
		getOrders2() {
			let para = {
				data: { type: 'sellout' }
			}
			this.listLoading = true;
			getGoodsList(para).then((res) => {
				if (res.status == 200) {
					this.$message({
						message: '已售罄列表加载成功',
						type: 'success'
					});
					this.total2 = 20;
					this.Orders2 = res.data;
					this.listLoading = false;
				} else {
					this.$message({
						message: '已售罄列表加载失败',
						type: 'warning'
					});
				}

				console.log(res)
			});
		},
		//获取已下架列表
		getOrders3() {
			let para = {
				data: { type: 'offsell' }
			}
			this.listLoading = true;
			getGoodsList(para).then((res) => {
				if (res.status == 200) {
					this.$message({
						message: '已下架列表加载成功',
						type: 'success'
					});
					this.total3 = 20;
					this.Orders3 = res.data;
					this.listLoading = false;
				} else {
					this.$message({
						message: '已下架列表加载失败',
						type: 'warning'
					});
				}

				console.log(res)
			});
		},
		down: function(index, row) {
			this.$confirm('确认下架该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				let para = { goodsid: row.id };
				downGoods(para).then((res) => {
					this.listLoading = false;
					this.$message({
						message: '下架成功',
						type: 'success'
					});
					this.loaddata();
				});
			}).catch(() => {

			});
		},
		up: function(index, row) {
			this.$confirm('确认上架该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				let para = { goodsid: row.id };
				downGoods(para).then((res) => {
					this.listLoading = false;
					this.$message({
						message: '上架成功',
						type: 'success'
					});
					this.loaddata();
				});
			}).catch(() => {

			});
		},
		addUser: function() {
			var pageType = "add";
			this.$router.push({ path: '/GoodsAdd', query: { pageType: "add" } })
		},
		editUser: function(index, row) {
			this.$router.push({ path: '/GoodsAdd', query: { pageType: "edit", goodsid: row.id } });
		},
		selsChange: function(sels) {
			this.sels = sels;
		},
		toggleSelection() {
			var length = this.users.length;
			var checklength = this.sels.length;
			this.$refs.multipleTable.clearSelection();
			if (length != checklength) {
				this.users.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		//批量删除
		batchRemove: function() {
			var ids = this.sels.map(item => item.id);
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				ids.forEach(id => {
					let para = { goodsid: id };
					delGoods(para).then((res) => {

					});
				});
				this.listLoading = false;
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.loaddata();
			}).catch(() => {

			});
		}
	},
	mounted() {
		this.getGoods1();
	}
}

</script>

<style scoped>

</style>