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
                        <el-table  :data="goods1"  row-key="id" highlight-current-row v-loading="listLoading" @selection-change="selsChange"  style="width: 100%;">
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
                                <template scope="scope">{{ scope.row.nickName }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="品牌"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="库存">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="状态">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="发布人">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="发布时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="checkall()">全选</el-button>
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
                            <el-button @click="up()" :disabled="this.sels.length===0">上架</el-button>
                            <el-button @click="down()" :disabled="this.sels.length===0">下架</el-button>
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
                        <el-table :data="goods2" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
                                <template scope="scope">{{ scope.row.nickName }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="品牌"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="库存">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="状态">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="发布人">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="发布时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                         <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="checkall()">全选</el-button>
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
                            <el-button @click="up()" :disabled="this.sels.length===0">上架</el-button>
                            <el-button @click="down()" :disabled="this.sels.length===0">下架</el-button>
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
                        <el-table id="table3" :data="goods3" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
                                <template scope="scope">{{ scope.row.nickName }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="品牌"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="库存">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="状态">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="发布人">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="发布时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                         <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button @click="checkall()">全选</el-button>
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
                            <el-button @click="up()" :disabled="this.sels.length===0">上架</el-button>
                            <el-button @click="down()" :disabled="this.sels.length===0">下架</el-button>
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
	import { getUserList,getGoodList } from '../../api/api'; 

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
             handleClick(tab, event) {
                 if(tab.name=='first')
                {
                    this.getgoods1();
                }
                  if(tab.name=='second')
                {
                    this.getgoods2();
                }
                  if(tab.name=='third')
                {
                    this.getgoods3();
                }
            },
            //全选
             checkall() {
                  
                     this.goods1.forEach(item => {
                       this.$refs.multipleTable.toggleRowSelection(item);
                                    });
              },
              handleCurrentChange(val) {
                this.page = val;
                this.getGoods1();
                this.getGoods2();
                this.getGoods3();
              },
            
            up(){
                this.sels.forEach(item => {
                            this.$message({
                                showClose: true,
                                message: '上架'+item.nickName
                                });
                            });
                
            },
            down(){
                this.$message({
                    showClose: true,
                    message: '下架'
                    });
            },
          //获取热卖列表
              getGoods1() {
                  let para = {
                  data:{type:''} 
                } 
                this.listLoading = true;
                getGoodList(para).then((res) => { 
                  this.total1 = 20;
                  this.goods1 = res.data;
                  this.listLoading = false; 
                  console.log(res)
                });
              },
            //获取已售罄列表
              getgoods2() {
                  let para = {
                  data:{type:'sellout'} 
                } 
                this.listLoading = true;
                getGoodList(para).then((res) => { 
                  this.total2 = 20;
                  this.goods2 = res.data;
                  this.listLoading = false; 
                  console.log(res)
                });
              },
            //获取已下架列表
            getgoods3() {
                let para = {
                data:{type:'offsell'} 
              } 
              this.listLoading = true;
              getGoodList(para).then((res) => { 
                this.total3 = 20;
                this.goods3 = res.data;
                this.listLoading = false; 
                console.log(res)
              });
            },
            //删除
            handleDel: function (index, row) {
              this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
              }).then(() => {
                this.listLoading = true;
                let para = { id: row.id };
                removeUser(para).then((res) => {
                  this.listLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                   this.getGoods1();
                  this.getGoods2();
                  this.getGoods3();
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
            selsChange: function (val) {
              if(contains(sels,val))
              {
                 this.sels.remove(val);
              }
              else
              {
                this.sels.push(val);
              }
            },
            contains(arr, obj) {  
                var i = arr.length;  
                while (i--) {  
                    if (arr[i] === obj) {  
                        return true;  
                    }  
                }  
                return false;  
            }  ,
            //批量删除
            batchRemove: function () {
              var ids = this.sels.map(item => item.id).toString();
              this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
              }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { ids: ids };
                batchRemoveUser(para).then((res) => {
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
            }
          },
          mounted() {
            this.getGoods1();
            this.getGoods2();
            this.getGoods3();

          }
	}

</script>

<style scoped>

</style>