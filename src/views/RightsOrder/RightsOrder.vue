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
                            <el-table :data="order1" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                                <el-table-column type="selection" width="55">
                                </el-table-column> 
                                <el-table-column prop="goodsName" label="商品"  >
                                </el-table-column>
                                <el-table-column prop="money" label="支付金额" >
                                </el-table-column> 
                                <el-table-column prop="money" label="退款金额" >
                                </el-table-column>
                                <el-table-column prop="message" label="退款原因">
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
                                        <el-button size="small" @click="editUser(scope.$index, scope.row)">详情</el-button>
                                        <el-button size="small" @click="editUser(scope.$index, scope.row)">通过</el-button>
                                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">不通过</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">退款</el-button>
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
import { getRightsOrderList} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: '',
                    oderNo:'',
                    refundOrderCode:'',
                    startDateTime:'',
                    endDateTime:''
				},
                activeName: 'first',
                pageSize:10,
				order1: [],
				total: 0,
                order2: [],
				total2: 0,
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
             loaddata:function(){
                if(activeName=='first')
                {
                    this.getOrder1();
                }
                  if(activeName=='second')
                {
                    this.getOrder2();
                }
                },
             handleClick(tab, event) {
                 if(tab.name=='first')
                {
                    this.getOrder1();
                }
                  if(tab.name=='second')
                {
                    this.getOrder2();
                }
            },
        //获取退款中列表
        getOrder1() {
            let para = {
                token: sessionStorage.getItem('token'),
                data: { refundState: 'APPLY' }
            }
            this.listLoading = true;
            getRightsOrderList(para).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '退款中列表加载成功',
                        type: 'success'
                    });
                    this.total1 = 20;
                    this.order1 = res.data;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: '退款中列表加载失败',
                        type: 'warning'
                    });
                }
            });
        },
        //获取已退款列表
        getOrder2() {
            let para = {
                token: sessionStorage.getItem('token'),
                data: { refundState: 'FINISH' }
            }
            this.listLoading = true;
            getRightsOrderList(para).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '已退款列表加载成功',
                        type: 'success'
                    });
                    this.total2 = 20;
                    this.order2 = res.data;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: '已退款中列表加载失败',
                        type: 'warning'
                    });
                }
            });
        }
        },
        mounted() {
        this.getOrder1();
        }
    }

</script>

<style scoped>

</style>