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
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="订单编号 ">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item> <br>
                                <el-form-item label="退货运单号">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="提交时间">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="至">
                                    <el-input v-model="filters.endDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" v-on:click="getUsers">筛选</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>

                            <!--列表-->
                            <el-table :data="order1" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                                <el-table-column type="selection" width="55">
                                </el-table-column> 
                                <el-table-column prop="name" label="商品"  >
                                </el-table-column>
                                <el-table-column prop="nickName" label="支付金额" >
                                </el-table-column> 
                                <el-table-column prop="mobile" label="退款金额" >
                                </el-table-column>
                                <el-table-column prop="birth" label="退款原因" width="120" >
                                </el-table-column>
                                <el-table-column prop="createTime" label="买家" >
                                </el-table-column>
                                    <el-table-column prop="createTime" label="退货物流" width="120">
                                </el-table-column>
                                    <el-table-column prop="createTime" label="状态" >
                                </el-table-column>
                                <el-table-column label="操作" width="150">
                                    <template scope="scope">
                                        <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                        <el-button size="small" @click="editUser(scope.$index, scope.row)">通过</el-button>
                                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">不通过</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </section>
                </el-template>
            </el-tab-pane>
            <el-tab-pane label="已退货" name="second">
                <el-template>
                    <section>
                        <!--工具条-->
                        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                            <el-form :inline="true" :model="filters">
                                <el-form-item label="买家昵称">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="订单编号 ">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item> <br>
                                <el-form-item label="退货运单号">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="提交时间">
                                    <el-input v-model="filters.startDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="至">
                                    <el-input v-model="filters.endDateTime" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" v-on:click="getUsers">筛选</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>

                            <!--列表-->
                            <el-table :data="order2" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                                <el-table-column type="selection" width="55">
                                </el-table-column> 
                                <el-table-column prop="name" label="商品" >
                                </el-table-column>
                                <el-table-column prop="nickName" label="支付金额"  >
                                </el-table-column> 
                                <el-table-column prop="mobile" label="退款金额">
                                </el-table-column>
                                <el-table-column prop="birth" label="退款原因"  width="120">
                                </el-table-column>
                                <el-table-column prop="createTime" label="买家">
                                </el-table-column>
                                    <el-table-column prop="createTime" label="退货物流" width="120">
                                </el-table-column>
                                    <el-table-column prop="createTime" label="状态" >
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
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </section>

                </el-template>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress' this.$route.query.receiveID
import { getUserList, getGoodsList, delGoods, upGoods, downGoods } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
                activeName: 'first',
				order1: [],
				total: 0,
				page: 1,
                order2: [],
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
                    this.getGoods2();
                }
                  if(activeName=='third')
                {
                    this.getGoods3();
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
                    this.getGoods2();
                }
                  if(tab.name=='third')
                {
                    this.$refs.multipleTable.clearSelection();
                    this.getGoods3();
                }
            }
        }
    }

</script>

<style scoped>

</style>