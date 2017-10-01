
  <template>
	<section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
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
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="时尚达人" value="shanghai"></el-option>
      <el-option label="高级时尚顾问" value="beijing"></el-option>
      <el-option label="初级时尚顾问" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="品牌名称" label-width="100px">
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="品牌1" value="1"></el-option>
      <el-option label="品牌2" value="2"></el-option>
      <el-option label="品牌3" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品类目" label-width="100px">
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="类目1" value="1"></el-option>
      <el-option label="类目2" value="2"></el-option>
      <el-option label="类目3" value="3"></el-option>
    </el-select>
 </el-form-item>
   <el-form-item label="尺码：" label-width="100px">
    <el-checkbox v-model="cnum1">xs</el-checkbox><br>
    <el-label>库存:<el-input-number v-model="num1" :disabled="cnum1==false"  :min="0" :max="100000"></el-input-number></el-label>
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
    <el-button type="primary" @click="onSubmit">保存
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
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
         <img width="180" height="180" hidden="form.img==''" src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" />
        <i class="el-icon-plus" ></i>
      </el-upload>
  </el-form-item>
       <el-form-item label="文字说明：" label-width="100px">
          <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="form.description">
</el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button @click="goBack()">取消</el-button>
    <el-button type="primary" @click="onSubmit">保存
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
        activeName: 'first',
        form: {
          img:'',
          name: '',
          price:'',
          stockNum:0,
          description:''
         
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
      onSubmit() {
        let para = {
              data:Object.assign({}, this.form)
            } 
       if(this.pageType=="edit"){
          para.param= "59cbb548336a522ad06efe7e"; 
          	editGoodsDetails(para).then((res) => { 
			    	});
           }else{
            addGoodsDetails(para).then((res) => { 
              
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
      var that=this;
      that.pageType=that.$router.currentRoute.query.pageType;
        
      if(that.pageType=="edit"){
        	let para = {
           token:"59cbb548336a522ad06efe7e",
           goodsid:that.$router.currentRoute.query.goodsid
        } 
				getGoodDetails(para).then((res) => { 
        that.form  =res.data;
				});
      }
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