
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
    <el-input v-model="form.name"></el-input> 
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
      <el-option label="时尚达人" value="shanghai"></el-option>
      <el-option label="高级时尚顾问" value="beijing"></el-option>
      <el-option label="初级时尚顾问" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品类目" label-width="100px">
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="时尚达人" value="shanghai"></el-option>
      <el-option label="高级时尚顾问" value="beijing"></el-option>
      <el-option label="初级时尚顾问" value="beijing"></el-option>
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
    <el-button>取消</el-button>
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
        <i class="el-icon-plus" ></i>
      </el-upload>
  </el-form-item>
       <el-form-item label="文字说明：" label-width="100px">
          <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button>取消</el-button>
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
<script src="https://unpkg.com/vue/dist/vue.js"></script>
        <!-- 引入element JS -->
        <script src="https://unpkg.com/element-ui/lib/index.js"></script>
        <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
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
      },
        handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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