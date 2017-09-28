
  <template>
	<section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="买手详情" name="BuyingDetails">
        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="1"> 
                     <el-form-item> 
                     </el-form-item> 
                </el-col>
  <el-col :span="4">
       <el-form-item> 
    <img width="180" height="180" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" />
  </el-form-item>  </el-col>
  <el-col :span="6">
       <el-form-item label="昵称："> 
					<el-input  placeholder=""></el-input> 
  </el-form-item> 
  <br>
       <el-form-item label="姓名："> 
					<el-input  placeholder=""></el-input> 
  </el-form-item> 
  <br>
       <el-form-item label="电话："> 
					<el-input  placeholder=""></el-input> 
  </el-form-item> 
   </el-col>
  <el-col :span="4">
        <el-form-item label="产品数："> 
					1220
  </el-form-item> 
  <br>
       <el-form-item label="所在地"> 
					<el-input  placeholder=""></el-input> 
  </el-form-item> 
  <br>
       <el-form-item label="注册日期"> 
					<el-input  placeholder=""></el-input> 
  </el-form-item> 
   </el-col>
  
                <el-col :span="4"> 
                     <el-form-item> 
                     </el-form-item> 
                </el-col>
</el-row>
   
 
   <el-row>
      <el-col :span="2"> 
                     <el-form-item>
                     </el-form-item> 
                </el-col>
                
    </el-row> 
     <el-row>
      <el-col :span="8"> 
                     <el-form-item> 
                     </el-form-item> 
                </el-col>
                <el-col :span="8"> 
                <el-button>返回</el-button>
                <el-button type="primary" @click="onSubmit">保存</el-button> 
                </el-col>
                <el-col :span="8"> 
                     <el-form-item> 
                     </el-form-item> 
                </el-col>
    </el-row>
  
</el-form>

    </el-tab-pane> 
  </el-tabs>
	</section>
</template>
<script>
  export default {
    data() {
      return {
           activeName: 'BuyingDetails',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>