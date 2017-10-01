
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
    <el-select v-model="form.role" placeholder="请选择">
      <el-option label="时尚达人" value="shanghai"></el-option>
      <el-option label="高级时尚顾问" value="beijing"></el-option>
      <el-option label="初级时尚顾问" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="昵称：" label-width="100px"> 
    <el-input v-model="form.nickName"></el-input> 
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
    <el-input v-model="form.mobile"></el-input> 
  </el-form-item> 
  <el-form-item label="所在地：" label-width="100px"> 
    <el-input v-model="form.address"></el-input> 
  </el-form-item> 
  <el-form-item label="注册时间" v-model="form.createTime" label-width="100px"> 
    <el-input v-model="form.createTime"></el-input> 
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="goBack()">取消</el-button>
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
	import util from '../../common/js/util'
	import { getUserDetails,addUserDetails,editUserDetails } from '../../api/api'; 
  export default {
    data() {
      return {
           activeName: 'ConsultancyDetails',
           dialogImageUrl: '',
           pageType:"",
        dialogVisible: false,
        form:{   
              id: "",
              createTime: "",
              nickName: "",
              redPacket: 0,
              name: "",
              cover: "",
              mobile: "",
              state: false,
              role: "COUNSELOR",
              openId: "",
              avatar: "",
              motto: "",
              address: "",
              followNum: 0,
              balance: 0
          }
      }
    },
    methods: {
      onSubmit() { 
       console.log(this.pageType); 
    let para = {
           data:Object.assign({}, this.form)
        } 
       if(this.pageType=="edit"){
          para.param= "59cbb548336a522ad06efe7e"; 
          	editUserDetails(para).then((res) => { 
  // this.form  =res.data;
  // this.form.createTime=(!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
				});

       }else{
	addUserDetails(para).then((res) => { 
  // this.form  =res.data;
  // this.form.createTime=(!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
				});

       }
      }, 
       handleRemove(file, fileList) {
        console.log(file, fileList);
      }, 
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      goBack() {
				this.$router.go(-1);
			},
    } ,
    created: function() { 
     this.pageType=this.$router.currentRoute.query.pageType;
        	let para = {
           param:"59cbb548336a522ad06efe7e"
        } 
      if(this.pageType=="edit"){
         
				// this.listLoading = true;
				//NProgress.start();
				getUserDetails(para).then((res) => { 
  this.form  =res.data;
  this.form.createTime=(!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
				});
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