<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="热卖中" name="first">
        <el-template>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <router-link class="el-menu-item"  :to="{path:'/GoodsAdd'}" style="background-color:#ff4949;
              padding:10px;
              position:relative;
              font-family: 'Open Sans', sans-serif;
              font-size:12px;
              text-decoration:none;
              color:#fff;
              border: solid 1px #831212;
              background-image: linear-gradient(bottom, rgb(171,27,27) 0%, rgb(212,51,51) 100%);
              border-radius: 5px;">发布新产品</router-link>
              <el-input
            placeholder="搜索"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick" style="width:20%;font-size:12px;margin-left:70%;">
          </el-input>
	    	</el-col>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selsChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
                 <el-table-column label="图片" width="120" >  
                <template scope="scope">  
                    <img :src="scope.row.img" style="width:100%;">  
                </template>  
            </el-table-column>  
              <el-table-column
                label="日期"
                width="120">
                <template scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="selectionall()">全选</el-button>
              <el-button @click="toggleSelection()">删除</el-button>
              <el-button @click="toggleSelection()">上架</el-button>
              <el-button @click="toggleSelection()">下架</el-button>
            </div>
        </el-template>
    </el-tab-pane>
    <el-tab-pane label="已售罄" name="second">
          <el-template>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <router-link class="el-menu-item"  :to="{path:'/GoodsAdd'}" style="background-color:#ff4949;
              padding:10px;
              position:relative;
              font-family: 'Open Sans', sans-serif;
              font-size:12px;
              text-decoration:none;
              color:#fff;
              border: solid 1px #831212;
              background-image: linear-gradient(bottom, rgb(171,27,27) 0%, rgb(212,51,51) 100%);
              border-radius: 5px;">发布新产品</router-link>
              <el-input
            placeholder="搜索"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick" style="width:20%;font-size:12px;margin-left:70%;">
          </el-input>
	    	</el-col>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selsChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
                 <el-table-column label="图片" width="120" >  
                <template scope="scope">  
                    <img :src="scope.row.img" style="width:100%;">  
                </template>  
            </el-table-column>  
              <el-table-column
                label="日期"
                width="120">
                <template scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="selectionall()">全选</el-button>
              <el-button @click="toggleSelection()">删除</el-button>
              <el-button @click="toggleSelection()">上架</el-button>
              <el-button @click="toggleSelection()">下架</el-button>
            </div>
        </el-template>
    </el-tab-pane>
    <el-tab-pane label="已下架" name="third">
       <el-template>
       <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <router-link class="el-menu-item"  :to="{path:'/GoodsAdd'}" style="background-color:#ff4949;
              padding:10px;
              position:relative;
              font-family: 'Open Sans', sans-serif;
              font-size:12px;
              text-decoration:none;
              color:#fff;
              border: solid 1px #831212;
              background-image: linear-gradient(bottom, rgb(171,27,27) 0%, rgb(212,51,51) 100%);
              border-radius: 5px;">发布新产品</router-link>
              <el-input
            placeholder="搜索"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick" style="width:20%;font-size:12px;margin-left:70%;">
          </el-input>
	    	</el-col>
       
            <el-table
              ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selsChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
                 <el-table-column label="图片" width="120" >  
                <template scope="scope">  
                    <img :src="scope.row.img" style="width:100%;">  
                </template>  
            </el-table-column>  
              <el-table-column
                label="日期"
                width="120">
                <template scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="selectionall()">全选</el-button>
              <el-button @click="toggleSelection()">删除</el-button>
              <el-button @click="toggleSelection()">上架</el-button>
              <el-button @click="toggleSelection()">下架</el-button>
            </div>
        </el-template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'

        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4146058749,3404487524&fm=27&gp=0.jpg'
        }],
        multipleSelection: []
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>