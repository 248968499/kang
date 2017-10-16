
  <template>
  <section>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width:1500px">
      <el-tab-pane label="顾客详情" v-loading="Loading" name="CustomerDetails">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row> 
            <el-col :span="4">
              <el-form-item label="头像：" label-width="100px">
                <el-upload class="avatar-uploader" action="http://121.43.35.110:9000/api/file/up" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="form.avatar" :src="form.avatar" class="avatarConsultancyDetails">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="昵称：">
                <el-input v-model="form.nickName" placeholder=""></el-input>
              </el-form-item>
              <br>
              <el-form-item label="姓名：">
                <el-input v-model="form.name" placeholder=""></el-input>
              </el-form-item>
              <br>
              <el-form-item label="电话：">
                <el-input v-model="form.mobile" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="生日：">
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
                </el-date-picker>
                <!-- <el-input v-model="form.birthday" placeholder=""></el-input> -->
              </el-form-item>
              <br>
              <el-form-item label="所在地">
                <el-input v-model="form.address" placeholder=""></el-input>
              </el-form-item>
              <br>
              <el-form-item label="注册日期">
                <el-date-picker disabled v-model="form.createTime" type="date" placeholder="选择日期">
                </el-date-picker>
                <!-- <el-input disabled="true" v-model="form.createTime" placeholder=""></el-input> -->
              </el-form-item>
            </el-col> 
          </el-row>

          <el-row>
            <el-col :span="2">
              <el-form-item>
              </el-form-item>
            </el-col>

          </el-row><br>
          <el-row v-if="pageType=='edit'">
            <el-col :span="3">
              <el-form-item> 会员标签：
              </el-form-item>
            </el-col>
            <el-col :span="20"> <br><br><br>
              <span v-for="(tip,index) in Tips">
                <el-tag>{{tip.content}}</el-tag>&nbsp;&nbsp; </span>
              <!-- <el-tag :v-for="tip in Tips">{{tip.content}}</el-tag> -->
              <!-- <el-tag type="gray">标签二</el-tag>
            <el-tag type="primary">标签三</el-tag>
            <el-tag type="success">标签四</el-tag>
            <el-tag type="warning">标签五</el-tag>
            <el-tag type="danger">标签六</el-tag> -->
              <el-tag type="primary" @click.native="handleTipsVisible" :loading="Loading">添加</el-tag>
              <!-- <el-button type="" @click="handleTipsVisible" :loading="Loading">添加</el-button> -->
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
        <el-table :data="OrderList" style="width: 100%">
          <el-table-column prop="money" label="购买产品" width="180">
          </el-table-column>
          <el-table-column prop="money" label="购买时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--新增界面-->
    <el-dialog title="新增标签" v-model="addTipsVisible" :close-on-click-modal="false">
      <el-form  :model="Tip"  label-width="80px" ref="addTips">
        <el-form-item label="标签" prop="name">
          <el-input v-model="Tip.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addTipsVisible= false">取消</el-button>
        <el-button type="primary" @click.native="addTip" :loading="Loading">添加</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script> 

import util from '../../common/js/util'
import { getUserDetails, addUserDetails, editUserDetails,addTips , getOrderList, addTip, getTips, getQrcode } from '../../api/api';
export default {
  data() {
    return {
      pageType:"",
      tipCount: '',
      activeName: 'CustomerDetails',
      addTipsVisible: false,
      Loading: false,
      Tips: [],
      Tip: {
        content: ""
      },
      form: {
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
        balance: 0,
        birthday: ""
        //  tips:["时尚","aaa","bbb"]
      },
      OrderList: [], 
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
    handleTipsVisible: function() {
      this.addTipsVisible = true;
      this.addTips = Object.assign({}, this.Tip);
    },
    addTipSubmit() {

    },//显示编辑界面
    addTip() {
      var that = this;
      that.Loading = true;
      let para = {
        data: Object.assign({}, this.Tip)
      }
      if (this.pageType == "edit") {
        para.param = this.token;//sessionStorage.getItem('token');//"59cbb548336a522ad06efe7e"; 
        addTips(para).then((res) => {
          if (res.status == 200) {
            that.Loading = false;
             this.addTipsVisible = false;
            that.showMessage("保存成功", "success") 
          } else {
            that.showMessage("添加失败", "warning");
          }
        }); 
      }
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.file;
    },
    beforeAvatarUpload(file) {
    },
    goBack() {
      this.$router.go(-1);
    },
    showMessage(message, success) {
      this.$message({
        message: message,
        type: success
      });
    },
    onSubmit() {
      var that = this;
      that.Loading = true;
      this.form.birthday = new Date(this.form.birthday).getTime()
      let para = {
        data: Object.assign({}, this.form)
      }
      if (this.pageType == "edit") {
        para.param = this.token;//sessionStorage.getItem('token');//"59cbb548336a522ad06efe7e"; 
        editUserDetails(para).then((res) => {
          if (res.status == 200) {
            that.Loading = false;
            that.showMessage("保存成功", "success")
            that.goBack();
          } else {
            that.showMessage("添加失败", "warning");
          }
        });

      } else {
        addUserDetails(para).then((res) => {
          if (res.status == 200) {
            that.Loading = false;
            that.showMessage("添加成功", "success");
            that.goBack();
          } else {
            that.showMessage("添加失败", "warning");
          }
        });

      }
    },
    handleClick(tab, event) {
      var that = this;
      getOrderList(para).then((res) => {
        that.OrderList = res.data;
        // that.form.createTime = (!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
      });
      console.log(tab, event);
    },
  },
  created: function() {
    var that = this;
    that.pageType = that.$router.currentRoute.query.pageType;
    this.token = that.$router.currentRoute.query.token;
    let para = {
      param: this.token//sessionStorage.getItem('token')//"59cbb548336a522ad06efe7e"
    }
    if (that.pageType == "edit") {

      that.Loading = true;
      //NProgress.start();
      getUserDetails(para).then((res) => {
        if (res.status == 200) {
          that.showMessage("加载成功", "success");
          that.form = res.data;
          that.form.createTime = (!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');;
          that.Loading = false;

          getTips(para).then((res) => {

            if (res.status == 200) {
              that.Tips = res.data;
              console.log(that.Tips)
              that.Loading = false;
            } else {
            }
          });
        } else {
          that.showMessage("加载失败", "warning");
        }
      });

    } else {
      that.form.createTime = new Date();
    }
  }
}
</script>