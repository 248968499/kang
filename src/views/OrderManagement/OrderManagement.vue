<template>
	<section>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="所有订单" name="pane1">
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
								<el-button type="primary" v-on:click="getUsers">筛选</el-button>
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
								代发货<br>
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
								<el-button type="primary" v-on:click="getUsers">筛选</el-button>
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
								<el-button type="primary" v-on:click="getUsers">筛选</el-button>
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
								<el-button size="small" @click="editUser(scope.$index, scope.row)">物流</el-button>
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
		</el-tabs>
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
			activeName: 'first',
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
					"user": {},
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

			}).catch(() => {

			});
		},
		//获取用户列表
		getUsers() {
			let para = {
				param: "MASTER",//角色[COUNSELOR:顾问，MASTER:达人,BUYER:买手]
				data: {}
			}
			this.listLoading = true;
			getUserList(para).then((res) => {

				if (res.statusText == "OK") {
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
				param: sessionStorage.getItem('token'),
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
				if (res.statusText == "OK") {
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
				if (res.statusText == "OK") {
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