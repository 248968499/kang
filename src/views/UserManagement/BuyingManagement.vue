<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" v-on:click="addUser">添加</el-button>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-date-picker v-model="filters.startTimestamp" type="date" placeholder="选择日期"> </el-date-picker>
				</el-form-item>
				<el-form-item label="至">
					<el-date-picker v-model="filters.endTimestamp" type="date" placeholder="选择日期"> </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUserKeyWord">筛选</el-button>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.keyword" placeholder="搜索"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="name" label="用户名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="nickName" label="昵称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="mobile" label="手机号" width="180" sortable>
			</el-table-column>
			<el-table-column prop="followNum" label="产品数量" width="120" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间" :formatter="formatTime" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="editUser(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!-- 列表
													<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
														<el-table-column type="selection" width="55">
														</el-table-column> 
														<el-table-column prop="name" label="用户名" width="120" sortable>
														</el-table-column>
														<el-table-column prop="nickName" label="昵称" width="100" :formatter="formatSex" sortable>
														</el-table-column>
														<el-table-column prop="mobile" label="手机号" width="100" sortable>
														</el-table-column>
														<el-table-column prop="birth" label="产品数量" width="120" sortable>
														</el-table-column>
														<el-table-column prop="createTime" label="注册时间" min-width="180" sortable>
														</el-table-column>
														<el-table-column label="操作" width="150">
															<template scope="scope">
																<el-button size="small" @click="editUser(scope.$index, scope.row)">编辑</el-button>
																<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
															</template>
														</el-table-column>
													</el-table> -->

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import { getUserList, login, getUserKeyWord, delUser } from '../../api/api';

export default {
	data() {
		return {
			filters: {
				keyword: '',
				startTimestamp: "",
				endTimestamp: ""
			},
			users: [],
			total: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
			topics: {
				topics: [{
					id: "5523f2daef86fbb94ed21ccd",//唯一标识
					img: "",//图片
					detail: "简介",//一句话简介
					title: "标题",//标题
					createTime: 1428057139884,//创建日期
					manager: {
						id: "5523f2daef86fbb94ed21ccd",//唯一标识
						nickName: "贝贝",//昵称
						motto: "哈哈哈哈",//一句话简介
						avatar: "http://www.baidu.com/image.png",//头像
						tips: "欧美,美妆达人",//标签[逗号分隔，前端自己切割显示]
						role: "COUNSELOR"//角色[COUNSELOR:顾问，MASTER:达人]

					}
				}]
			},
			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				id: 0,
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			},
			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			}
		}
	},
	methods: {
		formatTime: function(row, column) {
			return util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd');
			//row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getUsers();
		},
		getUserKeyWord() {
			if (this.filters.keyword.trim() == "" && this.filters.startTimestamp == "" && this.filters.endTimestamp == "") {
				this.getUsers();
				return;
			}
			let para = {
				param: sessionStorage.getItem('token'),//角色[COUNSELOR:顾问，MASTER:达人,BUYER:买手]
				data: {
					keyword: this.filters.keyword,
					startTimestamp: (Date.parse(this.filters.startTimestamp) / 1000),
					endTimestamp: (Date.parse(this.filters.endTimestamp) / 1000)
				}
			}

			this.listLoading = true;
			getUserKeyWord(para).then((res) => {
				if (res.status == 200) {
					this.$message({
						message: '加载成功',
						type: 'success'
					});
					this.total = 20;
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
		//获取用户列表
		getUsers() {
			let para = {
				param: "BUYER",//角色[COUNSELOR:顾问，MASTER:达人,BUYER:买手]
				data: {}
			}
			this.listLoading = true;
			//NProgress.start();
			getUserList(para).then((res) => {
				if (res.status == 200) {
					this.$message({
						message: '加载成功',
						type: 'success'
					});
					this.total = 20;
					this.users = res.data;
					this.listLoading = false;
				} else {
					this.$message({
						message: '加载失败',
						type: 'warning'
					});
				}
			});
			// let para = {
			// 	page: this.page,
			// 	name: this.filters.name
			// };
			// this.listLoading = true;
			// //NProgress.start();
			// getUserListPage(para).then((res) => {
			// 	this.total = res.data.total;
			// 	this.users = res.data.users;
			// 	this.listLoading = false;
			// 	//NProgress.done();
			// });
		},
		//删除
		handleDel: function(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { id: row.id };
				removeUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			});
		},
		addUser: function() {
			this.$router.push({ path: '/BuyingDetails', query: { pageType: "add" } });
		},
		//显示编辑界面
		editUser: function(index, row) {
			this.listLoading = true;
			// var  params={ data : {
			//         openId:row.id,
			//         nickName:row.nickName,
			//         unionid:row.id
			//     }}
			//     login(params).then(data => {

			// 	this.listLoading = true;
			// 	var	token=data.data.token; 
			this.$router.push({ path: '/BuyingDetails', query: { pageType: "edit", token: row.id } });
			// });   
			// this.editFormVisible = true;
			// this.editForm = Object.assign({}, row);
		},
		//显示新增界面
		handleAdd: function() {
			this.addFormVisible = true;
			this.addForm = {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			};
		},
		//编辑
		editSubmit: function() {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
						editUser(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		//新增
		addSubmit: function() {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.addForm);
						para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
						addUser(para).then((res) => {
							this.addLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		selsChange: function(sels) {
			this.sels = sels;
		},
		//批量删除
		batchRemove: function() {
			var ids = this.sels.map(item => item.id);
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { data: { userIds: ids } };
				delUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();

					if (res.status == 200) {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					} else {
						this.$message({
							message: '删除失败',
							type: 'warning'
						});
					}
					this.getUsers();
				});
			}).catch(() => {

			});
		}
	},
	mounted() {
		this.getUsers();
	}
}

</script>

<style scoped>

</style>