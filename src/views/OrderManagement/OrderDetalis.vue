
  <template>
	<section>
       <div class="activePublic ">
      <el-steps :space="200" :active="step" class="step">
        <el-step title="基础信息" description=""></el-step>
        <el-step title="详细信息" description=""></el-step>
      </el-steps>
     <el-form ref="form" :model="form" label-width="80px">
             <el-row> 
            <el-col :span="1">
   <el-form-item></el-form-item>
   </el-col> <el-col :span="7">
  <el-form-item label="产品名称：" label-width="100px" :hidden="preStep"> 
      <el-input v-model="form.name"></el-input> 
  </el-form-item>  
  <el-form-item label="产品价格：" label-width="100px" :hidden="preStep"> 
    <el-input v-model="form.price"></el-input> 
  </el-form-item>  
  <el-form-item label="发布人" label-width="100px" :hidden="preStep">
    <el-select v-model="form.senderId" placeholder="请选择">
    <el-option
      v-for="item in users"
      :key="item.id"
      :label="item.nickName"
      :value="item.id">
    </el-option>
     
    </el-select>
  </el-form-item>
  <el-form-item label="品牌名称" label-width="100px" :hidden="preStep">
    <el-select v-model="form.Brands" placeholder="请选择">
      <el-option label="品牌1" value="1"></el-option>
      <el-option label="品牌2" value="2"></el-option>
      <el-option label="品牌3" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品类目" label-width="100px" :hidden="preStep">
    <el-select v-model="form.goodsType" placeholder="请选择">
      <el-option label="类目1" value="1"></el-option>
      <el-option label="类目2" value="2"></el-option>
      <el-option label="类目3" value="3"></el-option>
    </el-select>
 </el-form-item>
   <el-form-item label="尺码库存" label-width="100px" :hidden="preStep">
    <el-checkbox v-model="cnum1" style="width:15%">xs</el-checkbox>
    <el-input-number  style="width:70%;margin-left:10%" v-model="num1" :disabled="cnum1==false"  :min="0" :max="100000"></el-input-number>
    <el-checkbox v-model="cnum2"  style="width:15%">s</el-checkbox>
    <el-input-number style="width:70%;margin-left:10%"  v-model="num2" :disabled="cnum2==false" :min="0" :max="100000"></el-input-number>
    <el-checkbox v-model="cnum3"  style="width:15%" >M</el-checkbox>
    <el-input-number  style="width:70%;margin-left:10%"  v-model="num3" :disabled="cnum3==false" :min="0" :max="100000"></el-input-number>
    <el-checkbox v-model="cnum4"  style="width:15%">L</el-checkbox>
    <el-input-number  style="width:70%;margin-left:10%" v-model="num4" :disabled="cnum4==false"  :min="0" :max="100000"></el-input-number>
    <el-checkbox v-model="cnum5"  style="width:15%">均码</el-checkbox>
    <el-input-number  style="width:70%;margin-left:10%" v-model="num5" :disabled="cnum5==false" :min="0" :max="100000"></el-input-number>
  </el-form-item>
    <el-form-item label="商品首图：" label-width="100px" :hidden="nextStep">
            <el-upload 
        action="api/api/file/up"
         class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <img v-if="form.img" :src="form.img" class="avatarConsultancyDetails">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
  </el-form-item>
    <el-form-item :label="'详情描述'+(index+1)+':'" label-width="100px" v-for="(domain, index) in form.description" :hidden="nextStep">
          <br><label>图片：</label> <el-upload 
        action="api/api/file/up"
         class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess1"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload(index)">
        <img v-if="domain.img" :src="domain.img" class="avatarConsultancyDetails">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
         <label>内容：</label><el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="domain.content"></el-input>
         <el-button @click="removeDomain(this,domain)">删除详情描述{{index+1}}</el-button>
    </el-form-item>
     <el-form-item  :hidden="nextStep">
    </el-button>
  </el-form-item>
 </el-col></el-row> 
</el-form>

        <div class="but-group">
          <el-button @click.native.prevent="goBack" v-show="preview">返回</el-button>
          <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
          <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
          <el-button @click.native.prevent="onSubmit" v-show="publish" type="primary">发布</el-button>
          <el-button @click="addDomain()" v-show="publish">新增详细描述</el-button>
        </div>
    </div>
	</section>
</template>
<script>
import util from '../../common/js/util'
import { addGoodsDetails,editGoodsDetails,getGoodsDetails,getUserList} from '../../api/api'; 
  export default {
    data() {
      return {
        isRouter: false,
        preview: true,
        preStep: false,
        nextStep: true,
        publish: false,
        step: 1,
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        cnum1:false,
        cnum2:false,
        cnum3:false,
        cnum4:false,
        cnum5:false,
        users:[],
        imgindex:0,
        activeName: 'first',
        Loading: false,
        form:{
          goodsId:'',
          img:'',
          name: '',
          senderId:'',
          goodsType:'',
          Brands:'',
          price:'',
          stockNum:0,
          description:[{
                   content:'',
                    img:''
                }]
         
        }
      }
    },
    methods: {
       goBack() {
				this.$router.go(-1);
			},
      addDomain(){
        this.form.description.push({
                   content:'',
                    img:''
                });
      } ,
      removeDomain(item, e) {
        var index = this.form.description.indexOf(e);

        if (index !== -1) {
          this.form.description.splice(index, 1);
          this.forceUpdate();
        }
      },
      handlePreStep: function () {
            this.step--;
            this.goStep(this.step);
          $('html,body').animate({scrollTop:0},500);
      },
      handleNextStep: function () {
         var _this = this;
         _this.step++;
         _this.goStep(_this.step);
        $('html,body').animate({scrollTop:0},500);

      },
      handlePublish: function () {
        console.log('发布');
      },
      goStep: function (n) {
        switch (n) {
          case 1 :
            this.preview = true;this.preStep = false;this.nextStep = true;this.publish = false;
            break;
          case 2 :
            this.preview = false;this.preStep = true;this.nextStep = false;this.publish = true;
            break;
        }
      },
       handleAvatarSuccess(res, file) { 
        this.form.img = res.file ;
      },
       handleAvatarSuccess1(res, file) { 
         var index = this.imgindex;
         this.form.description[index].img = res.file ;
      },
       beforeAvatarUpload(index) { 
         this.imgindex = index;
      }, 
      //获取用户列表
			getUsers() {  
				let para = {
					param:"COUNSELOR",
					data:{} 
				} 
				getUserList(para).then((res) => {
					this.users = res.data; 					
				});
			}, 
      onSubmit() {
        this.form.stockNum = this.num1+this.num2+this.num3+this.num4+this.num5;
        let para = {
              token: sessionStorage.getItem('token'),
              data:Object.assign({}, this.form)
            } 
             this.Loading = true;
       if(this.pageType=="edit"){
          	editGoodsDetails(para).then((res) => { 
			    	});
           }else{
            addGoodsDetails(para).then((res) => { 
              this.Loading = false; 
            if(res.statusText=="OK"){ 
                this.$message({
                  message: "保存成功",
                  type: "success"
                }); 
              that.goBack() ;
              }else{  
                 this.$message({
                    message: "保存失败",
                    type: "warning"
                  }); 
              }
                  });

       }
      } ,
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
    created: function() { 
      getUsers() ;
      var that=this;
      that.pageType=that.$router.currentRoute.query.pageType;
        
      if(that.pageType=="edit"){
        	let para = {
           token: sessionStorage.getItem('token'),
           goodsid:that.$router.currentRoute.query.goodsid
        } 
				getGoodsDetails(para).then((res) => { 
        that.form  =res.data;
				});
      }
		}
    },
		mounted() {
			this.getUsers();
       var that=this;
      that.pageType=that.$router.currentRoute.query.pageType;
        
      if(that.pageType=="edit"){
        	let para = {
           token: sessionStorage.getItem('token'),
           goodsid:that.$router.currentRoute.query.goodsid
        } 
				getGoodsDetails(para).then((res) => { 
        that.form  =res.data;
				});
      }
		}
  }
</script>
<style> 
  .avatar {
    width: 50px;
    height: 50px; 
  }
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  } 
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>