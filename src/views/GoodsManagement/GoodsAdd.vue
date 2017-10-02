
  <template>
	<section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" v-loading="Loading" name="first">
        <el-form ref="form" :model="form" label-width="80px">
             <el-row> 
            <el-col :span="1">
   <el-form-item></el-form-item>
   </el-col> <el-col :span="7">
  <el-form-item label="产品名称：" label-width="100px"> 
      <el-input v-model="form.name"></el-input> 
  </el-form-item>  
  <el-form-item label="产品价格：" label-width="100px"> 
    <el-input v-model="form.price"></el-input> 
  </el-form-item>  
  <el-form-item label="发布人" label-width="100px">
    <el-select v-model="form.senderId" placeholder="请选择">
    <el-option
      v-for="item in users"
      :key="item.id"
      :label="item.nickName"
      :value="item.id">
    </el-option>
     
    </el-select>
  </el-form-item>
  <el-form-item label="品牌名称" label-width="100px">
    <el-select v-model="form.Brands" placeholder="请选择">
      <el-option label="品牌1" value="1"></el-option>
      <el-option label="品牌2" value="2"></el-option>
      <el-option label="品牌3" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品类目" label-width="100px">
    <el-select v-model="form.goodsType" placeholder="请选择">
      <el-option label="类目1" value="1"></el-option>
      <el-option label="类目2" value="2"></el-option>
      <el-option label="类目3" value="3"></el-option>
    </el-select>
 </el-form-item>
   <el-form-item label="尺码：" label-width="100px">
    <el-checkbox v-model="cnum1">xs</el-checkbox><br>
    <el-label>库存:<el-input-number v-model="form.stockNum" :disabled="cnum1==false"  :min="0" :max="100000"></el-input-number></el-label>
     <el-checkbox v-model="cnum2">s</el-checkbox><br>
    <el-label>库存:<el-input-number  v-model="num2" :disabled="cnum2==false" :min="0" :max="100000"></el-input-number></el-label>
     <el-checkbox v-model="cnum3">M</el-checkbox><br>
    <el-label>库存:<el-input-number  v-model="num3" :disabled="cnum3==false" :min="0" :max="100000"></el-input-number></el-label>
     <el-checkbox v-model="cnum4">L</el-checkbox><br>
    <el-label>库存:<el-input-number v-model="num4" :disabled="cnum4==false"  :min="0" :max="100000"></el-input-number></el-label>
     <el-checkbox v-model="cnum5">均码xs</el-checkbox><br>
    <el-label>库存:<el-input-number v-model="num5" :disabled="cnum5==false" :min="0" :max="100000"></el-input-number></el-label>
  </el-form-item>
  <el-form-item>
    <el-button @click="goBack()">取消</el-button>
    <el-button type="primary" @click="onSubmit()">保存
    </el-button>
  </el-form-item></el-col></el-row> 
</el-form>

    </el-tab-pane>
    <el-tab-pane label="详细信息" name="second">
         <el-form ref="form" :model="form" label-width="80px">
             <el-row> 
            <el-col :span="1">
   <el-form-item></el-form-item>
   </el-col> <el-col :span="7">
       <el-form-item label="商品首图：" label-width="100px">
            <el-upload 
        action="api/api/file/up"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
         <img width="180" height="180" hidden="form.description.img==''" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" />
        <i class="el-icon-plus" ></i>
      </el-upload>
  </el-form-item>
       <el-form-item label="文字说明：" label-width="100px">
          <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="form.description.content">
</el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button @click="addimg()">添加照片</el-button>
    <el-button type="primary" @click="addcontent">添加文字
    </el-button>
  </el-form-item></el-col></el-row> 
</el-form>
    
    </el-tab-pane> 
  </el-tabs>
<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
	</section>
</template>
<script>
import util from '../../common/js/util'
import { addGoodsDetails,editGoodsDetails,getGoodsDetails,getUserList} from '../../api/api'; 
  export default {
    data() {
      return {
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
        activeName: 'first',
        Loading: false,
        form:{
          goodsId:'123',
          img:'',
          name: '',
          senderId:'',
          goodsType:'商品种类',
          Brands:'',
          price:'',
          stockNum:0,
          description:[{
            content:'',
            img:''
          }]
         
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
       goBack() {
				this.$router.go(-1);
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
    width: 80px;
    height: 80px; 
  }
</style>