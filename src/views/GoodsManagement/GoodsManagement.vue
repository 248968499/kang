<template>
    <section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="热卖中" name="first">

                <!--工具条-->
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-button type="primary" v-on:click="addgoods" style="background-color:#ff4949">发布新产品</el-button>
                        </el-form-item>
                        <el-form-item style="margin-left:70%;">
                            <el-input v-model="filters.endDateTime" placeholder="搜索"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!--列表-->
                <el-table :data="goods1" ref="multipleTable1" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="图片" width="120">
                        <template scope="scope">
                            <img :src="scope.row.img" style="width:100%;">
                        </template>
                    </el-table-column>
                    <el-table-column label="产品名称" width="150">
                        <template scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column prop="brands" label="品牌" width="120">
                    </el-table-column>
                    <el-table-column prop="stockNum" label="库存">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            热卖中
                        </template>
                    </el-table-column>
                    <el-table-column prop="senderId" label="发布人">
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="small" @click="editgoods(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="down(scope.$index, scope.row)">下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button @click="toggleSelection(goods1,1)">全选</el-button>
                    <el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button>
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                    </el-pagination>
                </el-col>

            </el-tab-pane>
            <el-tab-pane label="已售罄" name="second">

                <!--工具条-->
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-button type="primary" v-on:click="addgoods" style="background-color:#ff4949">发布新产品</el-button>
                        </el-form-item>
                        <el-form-item style="margin-left:70%;">
                            <el-input v-model="filters.endDateTime" placeholder="搜索"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!--列表-->
                <el-table :data="goods2" ref="multipleTable2" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="图片" width="120">
                        <template scope="scope">
                            <img :src="scope.row.img" style="width:100%;">
                        </template>
                    </el-table-column>
                    <el-table-column label="产品名称" width="150">
                        <template scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column prop="brands" label="品牌" width="120">
                    </el-table-column>
                    <el-table-column prop="stockNum" label="库存">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            已售罄
                        </template>
                    </el-table-column>
                    <el-table-column prop="senderId" label="发布人">
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                             <el-button size="small" @click="editgoods(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="down(scope.$index, scope.row)">下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button @click="toggleSelection(goods2,2)">全选</el-button>
                     <el-button @click="batchdown()" :disabled="this.sels.length===0">下架</el-button>
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                    </el-pagination>
                </el-col>

            </el-tab-pane>
            <el-tab-pane label="已下架" name="third">
                <!--工具条-->
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-button type="primary" v-on:click="addgoods" style="background-color:#ff4949">发布新产品</el-button>
                        </el-form-item>
                        <el-form-item style="margin-left:70%;">
                            <el-input v-model="filters.endDateTime" placeholder="搜索"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!--列表-->
                <el-table id="table3" :data="goods3" ref="multipleTable3" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="图片" width="120">
                        <template scope="scope">
                            <img :src="scope.row.img" style="width:100%;">
                        </template>
                    </el-table-column>
                    <el-table-column label="产品名称" width="150">
                        <template scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column prop="brands" label="品牌" width="120">
                    </el-table-column>
                    <el-table-column prop="stockNum" label="库存">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            已下架
                        </template>
                    </el-table-column>
                    <el-table-column prop="senderId" label="发布人">
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="small" @click="editgoods(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="up(scope.$index, scope.row)">上架</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button @click="toggleSelection(goods3,3)">全选</el-button>
                    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
                    <el-button @click="batchup()" :disabled="this.sels.length===0">上架</el-button>
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                    </el-pagination>
                </el-col>
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
            goods1: [],
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
        loaddata: function() {

            if (this.activeName == 'first') {
                this.getGoods1();
            }
            if (this.activeName == 'second') {
                this.getGoods2();
            }
            if (this.activeName == 'third') {
                this.getGoods3();
            }
        },
        handleClick(tab, event) {
            if (tab.name == 'first') {
                this.$refs.multipleTable1.clearSelection();
                this.getGoods1();
            }
            if (tab.name == 'second') {
                this.$refs.multipleTable2.clearSelection();
                this.getGoods2();
            }
            if (tab.name == 'third') {
                this.$refs.multipleTable3.clearSelection();
                this.getGoods3();
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getGoods1();
            this.getGoods2();
            this.getGoods3();
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
        //获取热卖列表
        getGoods1() {
            let para = {
                data: { type: '' }
            }
            this.listLoading = true;
            getGoodsList(para).then((res) => {
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
        getGoods2() {
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
                    this.goods2 = res.data;
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
        getGoods3() {
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
                    this.goods3 = res.data;
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
                upGoods(para).then((res) => {
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
        addgoods: function() {
            var pageType = "add";
            this.$router.push({ path: '/GoodsAdd', query: { pageType: "add" } })
        },
        editgoods: function(index, row) {
            this.$router.push({ path: '/GoodsAdd', query: { pageType: "edit", goodsid: row.id } });
        },
        selsChange: function(sels) {
            this.sels = sels;
        },
        toggleSelection(rows, index) {
            var length = rows.length;
            var checklength = this.sels.length;
            if (length != checklength) {
                 if (index == 1)
                    this.$refs.multipleTable1.clearSelection();
                if (index == 2)
                    this.$refs.multipleTable2.clearSelection();
                if (index == 3)
                    this.$refs.multipleTable3.clearSelection()
            }
            if (rows) {
                rows.forEach(row => {
                    if (index == 1)
                        this.$refs.multipleTable1.toggleRowSelection(row);
                    if (index == 2)
                        this.$refs.multipleTable2.toggleRowSelection(row);
                    if (index == 3)
                        this.$refs.multipleTable3.toggleRowSelection(row);
                });
            } else {
                if (index == 1)
                    this.$refs.multipleTable1.clearSelection();
                if (index == 2)
                    this.$refs.multipleTable2.clearSelection();
                if (index == 3)
                    this.$refs.multipleTable3.clearSelection()
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
                this.loaddata();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });

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