
  <template>
	<section>
       <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="顾客详情" v-loading="Loading" name="CustomerDetails">
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
                        <el-input v-model="form.nickName"  placeholder=""></el-input> 
                </el-form-item> 
                <br>
                    <el-form-item label="姓名："> 
                        <el-input   v-model="form.name"  placeholder=""></el-input> 
                </el-form-item> 
                <br>
                    <el-form-item label="电话："> 
                        <el-input  v-model="form.mobile"  placeholder=""></el-input> 
                </el-form-item> 
                </el-col>
                <el-col :span="4">
                      <el-form-item label="生日："> 
                        <el-input  v-model="form.mobile1"  placeholder=""></el-input> 
                </el-form-item> 
                <br>
                    <el-form-item label="所在地"> 
                        <el-input   v-model="form.address" placeholder=""></el-input> 
                </el-form-item> 
                <br>
                    <el-form-item label="注册日期"> 
                        <el-input disabled="true" v-model="form.createTime"  placeholder=""></el-input> 
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
                
    </el-row><br>
  <el-row>
      <el-col :span="3"> 
                     <el-form-item>  会员标签：
                     </el-form-item> 
                </el-col>
                <el-col :span="20"> <br><br><br>
  <span v-for="(tip,index) in Tips">    <el-tag >{{tip.content}}</el-tag>&nbsp;&nbsp; </span>
                <!-- <el-tag :v-for="tip in Tips">{{tip.content}}</el-tag> -->
<!-- <el-tag type="gray">标签二</el-tag>
<el-tag type="primary">标签三</el-tag>
<el-tag type="success">标签四</el-tag>
<el-tag type="warning">标签五</el-tag>
<el-tag type="danger">标签六</el-tag> -->
                </el-col>
                <el-col :span="1"> 
                     <el-form-item> 
                     </el-form-item> 
                </el-col>
    </el-row>
     <br><br><br><br>
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
    <el-tab-pane label="购买记录" name="PurchaseRecord">
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="购买产品"
        width="180">
      </el-table-column> 
      <el-table-column
        prop="address"
        label="购买时间">
      </el-table-column>
    </el-table>    
    </el-tab-pane> 
  </el-tabs>
	</section>
</template>
<script> 

	import util from '../../common/js/util'
	import { getUserDetails,addUserDetails,editUserDetails,getOrderList,getTips } from '../../api/api'; 
  export default {
    data() {
      return {
           activeName: 'CustomerDetails', 
           Loading:false, 
           Tips:[],
         form:{   
              id: "",
              createTime: "",
              nickName: "",
              redPacket: 0,
              name: "",
              cover: "",
              mobile: "",
              state: false,
              role: "MASTER",
              openId: "",
              avatar: "",
              motto: "",
              address: "",
              followNum: 0,
              balance: 0//,
            //  tips:["时尚","aaa","bbb"]
          },
           OrderList: {
            goods:{},
            money:123.00,
            goodsNum:2,//商品数量
            receiver:{},
            pay:true,//是否支付
            state:"UNSEND",//未付款 NONE, 未发货 UNSEND,未收获 UNRECEIVED,已完成 FINISH
            detial:"",
            user:{},
            message:"留言",
            distributionType:"配送方式",
            expressCompany:"快递公司",
            expressNo:"23141234123cdssfd"//单号
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
      showMessage(message,success){
      this.$message({
							message: message,
							type: success
						});
      },
      onSubmit() { 
        var that=this;
        	that.Loading = true;
    let para = {
           data:Object.assign({}, this.form)
        } 
       if(this.pageType=="edit"){
          para.param= sessionStorage.getItem('token');//"59cbb548336a522ad06efe7e"; 
          	editUserDetails(para).then((res) => {  
              
          if(res.statusText=="OK"){
						 	that.Loading = false;
              that.showMessage("保存成功","success")
              that.goBack() ; 
              }else{ 
                that.showMessage("添加失败","warning") ;
            }
            });

       }else{
        addUserDetails(para).then((res) => { 
          if(res.statusText=="OK"){
            that.Loading = false;
            that.showMessage("添加成功","success") ;
            that.goBack() ;
            }else{ 
            that.showMessage("添加失败","warning") ;
            }
        });

       }
      }, 
      handleClick(tab, event) {
        	getOrderList(para).then((res) => { 
  that.form  =res.data;
  that.form.createTime=(!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
				});
        console.log(tab, event);
      },
    },
    created: function() { 
      var that=this;
     that.pageType=that.$router.currentRoute.query.pageType;
  // var token=that.$router.currentRoute.query.token;
        	let para = {
           param:sessionStorage.getItem('token')//"59cbb548336a522ad06efe7e"
        } 
      if(that.pageType=="edit"){
         
				 that.Loading = true;
				//NProgress.start();
				getUserDetails(para).then((res) => { 
          
          if(res.statusText=="OK"){
             that.showMessage("加载成功","success") ;
              that.form  =res.data;
              that.form.createTime=(!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
            that.Loading = false;

            getTips(para).then((res) => { 
          
          if(res.statusText=="OK"){
            debugger
            that.Tips=res.data;
            console.log(that.Tips)
               that.Loading = false; 
          }else{  
          }
       });
          }else{ 
            that.showMessage("加载失败","warning") ;
          }
       });
        
      }else{
         that.form.createTime=new Date();
      }
		}
  }
</script>