<template>
	<section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="热卖中" name="first">
                <el-template>
                    <!--工具条-->
                            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                                <el-form :inline="true" :model="filters">
                                     <el-form-item>
                                        <el-button type="primary" v-on:click="addUser" style="background-color:#ff4949">发布新产品</el-button>
                                    </el-form-item>
                                    <el-form-item style="margin-left:70%;">
                                        <el-input v-model="filters.endDateTime" placeholder="搜索" ></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>

                        <!--列表-->
                        <el-table  :data="goods1" ref="multipleTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange"  style="width: 100%;">
                            <el-table-column type="selection"  width="55">
                            </el-table-column> 
                             </el-table-column>
                                <el-table-column label="图片" width="120" >  
                                <template scope="scope">  
                                    <img :src="scope.row.img" style="width:100%;">  
                                </template>  
                            </el-table-column>  
                            <el-table-column
                                label="产品名称"
                                width="150" >
                                <template scope="scope">{{ scope.row.name }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="Brands"
                                label="品牌"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="stockNum"
                                label="库存">
                            </el-table-column>
                            <el-table-column
                                label="状态">
                                已下架
                            </el-table-column>
                            <el-table-column
                                prop="senderId"
                                label="发布人">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="发布时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="editUser(scope.$index, scope.row)">编辑</el-button>
                                    <el-button type="danger" size="small" @click="down(scope.$index, scope.row)">下架</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="toggleSelection()">全选</el-button>
                            <el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>

                </el-template>
            </el-tab-pane>
            <el-tab-pane label="已售罄" name="second">
                 <el-template>
                    <!--工具条-->
                            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                                <el-form :inline="true" :model="filters">
                                    <el-form-item>
                                        <el-button type="primary" v-on:click="addUser" style="background-color:#ff4949">发布新产品</el-button>
                                    </el-form-item>
                                    <el-form-item style="margin-left:70%;">
                                        <el-input v-model="filters.endDateTime" placeholder="搜索" ></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>

                        <!--列表-->
                        <el-table :data="goods2" ref="multipleTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                            <el-table-column type="selection" width="55">
                            </el-table-column> 
                              </el-table-column>
                                <el-table-column label="图片" width="120" >  
                                <template scope="scope">  
                                    <img :src="scope.row.img" style="width:100%;">  
                                </template>  
                            </el-table-column>  
                            <el-table-column
                                label="产品名称"
                                width="150" >
                                <template scope="scope">{{ scope.row.name }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="Brands"
                                label="品牌"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="stockNum"
                                label="库存">
                            </el-table-column>
                            <el-table-column
                                label="状态">
                                已下架
                            </el-table-column>
                            <el-table-column
                                prop="senderId"
                                label="发布人">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="发布时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                    <el-button type="danger" size="small" @click="up(scope.$index, scope.row)">上架</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                         <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="toggleSelection()">全选</el-button>
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
                            <el-button @click="batchup()" :disabled="this.sels.length===0">上架</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>

                </el-template>
            </el-tab-pane>
            <el-tab-pane label="已下架" name="third">
                 <el-template>
                    <!--工具条-->
                            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                                <el-form :inline="true" :model="filters">
                                     <el-form-item>
                                        <el-button type="primary" v-on:click="addUser" style="background-color:#ff4949">发布新产品</el-button>
                                    </el-form-item>
                                    <el-form-item style="margin-left:70%;">
                                        <el-input v-model="filters.endDateTime" placeholder="搜索" ></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>

                        <!--列表-->
                        <el-table id="table3" :data="goods3" ref="multipleTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                            <el-table-column type="selection" width="55">
                            </el-table-column> 
                            </el-table-column>
                                <el-table-column label="图片" width="120" >  
                                <template scope="scope">  
                                    <img :src="scope.row.img" style="width:100%;">  
                                </template>  
                            </el-table-column>  
                            <el-table-column
                                label="产品名称"
                                width="150" >
                                <template scope="scope">{{ scope.row.name }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="Brands"
                                label="品牌"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="stockNum"
                                label="库存">
                            </el-table-column>
                            <el-table-column
                                label="状态">
                                已下架
                            </el-table-column>
                            <el-table-column
                                prop="senderId"
                                label="发布人">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="发布时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                    <el-button type="danger" size="small" @click="up(scope.$index, scope.row)">上架</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                         <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="toggleSelection()">全选</el-button>
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
                            <el-button @click="batchup()" :disabled="this.sels.length===0">上架</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
	import { getUserList,getGoodsList,delGoods,upGoods,downGoods} from '../../api/api'; 

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
                activeName: 'first',
				users: [],
				total: 0,
				page: 1,
                goods2: [],
				total2: 0,
				page: 1,
                goods3: [],
				total3: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
             loaddata:function(){
                if(activeName=='first')
                {
                    this.getGoods1();
                }
                  if(activeName=='second')
                {
                    this.getgoods2();
                }
                  if(activeName=='third')
                {
                    this.getgoods3();
                }
                },
             handleClick(tab, event) {
                 if(tab.name=='first')
                {
                    this.$refs.multipleTable.clearSelection();
                    this.getGoods1();
                }
                  if(tab.name=='second')
                {
                    this.$refs.multipleTable.clearSelection();
                    this.getgoods2();
                }
                  if(tab.name=='third')
                {
                    this.$refs.multipleTable.clearSelection();
                    this.getgoods3();
                }
            },
              handleCurrentChange(val) {
                this.page = val;
                this.getGoods1();
                this.getGoods2();
                this.getGoods3();
              },
            
            batchup(){
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
            batchdown(){
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
					param:"MASTER",//角色[COUNSELOR:顾问，MASTER:达人,BUYER:买手]
					data:{} 
				} 
				this.listLoading = true;
				getUserList(para).then((res) => { 

					if(res.statusText=="OK"){ 
						this.$message({ 
							message: '加载成功',
							type: 'success'
						});   
					this.total = 20;
					this.users = res.data;
					this.listLoading = false;  
					}else{
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
                  data:{type:''} 
                } 
                this.listLoading = true;
                getGoodsList(para).then((res) => { 
                    if(res.statusText=="OK"){ 
						this.$message({ 
							message: '热卖列表加载成功',
							type: 'success'
						});   
					this.total1 = 20;
                  this.goods1 = res.data;
                  this.listLoading = false;
					}else{
						this.$message({
							message: '热卖列表加载失败',
							type: 'warning'
						});  
					}
                   
                  console.log(res)
                });
              },
            //获取已售罄列表
              getgoods2() {
                  let para = {
                  data:{type:'sellout'} 
                } 
                this.listLoading = true;
                getGoodsList(para).then((res) => { 
                      if(res.statusText=="OK"){ 
						this.$message({ 
							message: '已售罄列表加载成功',
							type: 'success'
						});   
				  this.total2 = 20;
                  this.goods2 = res.data;
                  this.listLoading = false; 
					}else{
						this.$message({
							message: '已售罄列表加载失败',
							type: 'warning'
						});  
					}
                
                  console.log(res)
                });
              },
            //获取已下架列表
            getgoods3() {
                let para = {
                data:{type:'offsell'} 
              } 
              this.listLoading = true;
              getGoodsList(para).then((res) => { 
                         if(res.statusText=="OK"){ 
						this.$message({ 
							message: '已下架列表加载成功',
							type: 'success'
						});   
				this.total3 = 20;
                this.goods3 = res.data;
                this.listLoading = false;
					}else{
						this.$message({
							message: '已下架列表加载失败',
							type: 'warning'
						});  
					}
                 
                console.log(res)
              });
            },
            down: function (index, row) {
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
            up: function (index, row) {
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
            addUser:function () { 
              var pageType="add";
              this.$router.push({ path: '/GoodsAdd',  query: { pageType:"add"}}) 
            }, 
            editUser: function (index, row) {                 
            this.$router.push({ path: '/GoodsAdd', query: {pageType:"edit",goodsid:row.id}}); 
            },
            selsChange: function (sels) {
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
            batchRemove: function () {
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