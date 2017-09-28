
  <template>
	<section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="顾问详情" name="ConsultancyDetails">
        <el-form ref="form" :model="form" label-width="80px">
             <el-row> 
            <el-col :span="1">
   <el-form-item></el-form-item>
   </el-col> <el-col :span="7">
  <el-form-item label="头像：" label-width="100px">
      <el-upload 
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus" ></i>
</el-upload>
  </el-form-item>
  <el-form-item label="用户角色" label-width="100px">
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="时尚达人" value="shanghai"></el-option>
      <el-option label="高级时尚顾问" value="beijing"></el-option>
      <el-option label="初级时尚顾问" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="昵称：" label-width="100px"> 
    <el-input v-model="form.name"></el-input> 
  </el-form-item>  
   <el-form-item label="微信二维码：" label-width="100px">
       <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
  </el-form-item>
   <el-form-item label="关注二维码：" label-width="100px">
   
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="姓名：" label-width="100px"> 
    <el-input v-model="form.name"></el-input> 
  </el-form-item> 
  <el-form-item label="电话：" label-width="100px"> 
    <el-input v-model="form.name"></el-input> 
  </el-form-item> 
  <el-form-item label="所在地：" label-width="100px"> 
    <el-input v-model="form.name"></el-input> 
  </el-form-item> 
  <el-form-item label="注册时间" label-width="100px"> 
    2016-12-21 23：46：59
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item></el-col></el-row> 
</el-form>

    </el-tab-pane>
    <el-tab-pane label="权限设置" name="second">
   <img width="180" height="180" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" />
  
    </el-tab-pane> 
  </el-tabs>
<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
	</section>
</template>

<script>
  export default {
    data() {
      return {
           activeName: 'ConsultancyDetails',
           dialogImageUrl: '',
        dialogVisible: false,
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
      } ,
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style> 
  .avatar {
    width: 80px;
    height: 80px; 
  }
</style>