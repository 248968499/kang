
  <template>
	<section>
        <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="买手详情" v-loading="Loading" name="BuyingDetails">
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
					<el-input  v-model="form.nickName" placeholder=""></el-input> 
  </el-form-item> 
  <br>
       <el-form-item label="姓名："> 
					<el-input v-model="form.name"  placeholder=""></el-input> 
  </el-form-item> 
  <br>
       <el-form-item label="电话："> 
					<el-input v-model="form.mobile"  placeholder=""></el-input> 
  </el-form-item> 
   </el-col>
  <el-col :span="4">
        <el-form-item  v-model="form.name" label="产品数："> 
					1220
  </el-form-item> 
  <br>
       <el-form-item label="所在地"> 
					<el-input  v-model="form.address" placeholder=""></el-input> 
  </el-form-item> 
  <br>
       <el-form-item label="注册日期"> 
					<el-input  v-model="form.createTime" placeholder=""></el-input> 
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
                <el-button @click="goBack()">返回</el-button>
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
	import util from '../../common/js/util'
	import { getUserDetails,addUserDetails,editUserDetails } from '../../api/api'; 
  export default {
    data() {
      return {
           activeName: 'BuyingDetails', 
           Loading: false,
         form:{   
              id: "",
              createTime: "",
              nickName: "",
              redPacket: 0,
              name: "",
              cover: "",
              mobile: "",
              state: false,
              role: "BUYER",
              openId: "",
              avatar: "",
              motto: "",
              address: "",
              followNum: 0,
              balance: 0
          },
      }
    },
    methods: {
      goBack() {
				this.$router.go(-1);
      }, 
      showMessage(message,success){
      this.$message({
							message: message,
							type: success
						});
      },
      onSubmit() { 
        var that=this; 
        that.Loading=true;
        let para = {
              data:Object.assign({}, this.form)
            } 
       if(this.pageType=="edit"){
          para.param=sessionStorage.getItem('token');// "59cbb548336a522ad06efe7e"; 
          	editUserDetails(para).then((res) => {  
              if(res.statusText=="OK"){  
                that.Loading=false; 
                 this.$message({
                    message: "保存成功",
                    type: "success"
                  }); 
                that.goBack()
                }else{  
                 this.$message({
                    message: "保存失败",
                    type: "warning"
                  }); 
              }
            	});

       }else{
	addUserDetails(para).then((res) => { 
     if(res.statusText=="OK"){  
              that.Loading=false;
              that.showMessage("添加成功","success") ;
              that.goBack() }else{  
                 this.$message({
                    message: "保存失败",
                    type: "warning"
                  }); 
              }
				});
       }
      }, 
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
    created: function() {  
     this.pageType=this.$router.currentRoute.query.pageType;
     var that=this;
    let para = {
           param:sessionStorage.getItem('token')//"59cbb548336a522ad06efe7e"
        } 
      if(this.pageType=="edit"){  
				 that.Loading = true;
				//NProgress.start();
				getUserDetails(para).then((res) => {
           if(res.statusText=="OK"){   
             
                that.showMessage("加载成功","warning") ; 
          this.form  =res.data;
          this.form.createTime=(!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');
          that.Loading = false;
          }else{  
                that.showMessage("加载失败","warning") ; 
              }
				});
      }
		}
  }
</script>