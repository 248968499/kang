
  <template>
  <section>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="订单详情" v-loading="Loading1" name="ConsultancyDetails" style="width:900px"> -->
      <el-form ref="form" :model="form" label-width="90px">
        <el-row>
          <el-col :span="23" style="left: -100px">
            <el-button type="text">订单详情</el-button>
            <el-form-item style="border-radius: 5px; border:1px solid #ECE5DF">
              <el-col :span="7" style="padding:10px">
                <el-form-item style="margin-left: -80px; " label="订单编号："> xx2017856598854
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="订单状态："> 待发货
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="买家昵称："> 卖火柴的大灰狼
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="客户备注："> 尽快发货，急用
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="订单金额："> 147.00
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding:10px">
                <el-form-item style="margin-left: -80px; " label="下单时间："> 2017-06-15 12：35：27
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label=" "> &nbsp;
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="所属顾问："> 001~顾豆豆
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="发或备注："> 无
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="实付金额："> 137.00
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-button type="text">商品详情</el-button>
            <el-form-item style="border-radius: 5px;border:1px solid #ECE5DF">
              <el-col :span="7" style="padding:10px">
                <el-form-item style="margin-left: -80px; " label="产品编号："> qz11596262189
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="产品单价："> 69.00
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="产品规格："> s（1件） m（1件）
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding:10px">
                <el-form-item style="margin-left: -80px; " label="订单编号："> xx2017856598854
                </el-form-item>
                <el-form-item style="margin-left: -80px; " label="数量："> 2
                </el-form-item>
                <!-- <el-form-item style="margin-left: -80px; "  label="买家昵称："> 卖火柴的大灰狼 
                  </el-form-item> -->
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-button type="text">收货信息</el-button>
            <el-form-item style="border-radius: 5px;border:1px solid #ECE5DF">
              <el-col :span="7" style="padding:10px">
                <el-form-item style="" label="姓名：">
                  <el-input v-model="form.endDateTime" placeholder=""></el-input>
                </el-form-item> <br>
                <el-form-item style="" label="电话：">
                  <el-input v-model="form.endDateTime" placeholder=""></el-input>
                </el-form-item>
                <!-- <el-form-item style="margin-left: -80px; "  label="买家昵称："> 卖火柴的大灰狼 
                  </el-form-item> -->
              </el-col>
              <el-col :span="7" style="padding:10px">
                <el-form-item style="" label="地址：">
                  <el-input v-model="form.endDateTime" placeholder=""></el-input>
                </el-form-item> <br>
                <el-form-item style="" label=" "> &nbsp;
                </el-form-item>
                <!-- <el-form-item style="margin-left: -80px; "  label="买家昵称："> 卖火柴的大灰狼 
                  </el-form-item> -->
              </el-col>

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
              <br><br><br>
            </el-col>
            <el-col :span="8">
              <el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>

      <!-- </el-tab-pane>  -->
    </el-tabs>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
import { getUserDetails, addUserDetails, editUserDetails, getQrcode } from '../../api/api';
export default {
  data() {
    return {
      activeName: 'ConsultancyDetails',
      dialogImageUrl: '',
      pageType: "",
      dialogVisible: false,
      Loading: false,
      qrcodeUrl: "",
      form: {
        id: "",
        createTime: new Date(),
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
        balance: 0,
        weixinqrcode: "",//微信二维码
        followqrcode: ""//关注二维码
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.file;
    },
    handleAvatarSuccess1(res, file) {
      this.form.weixinqrcode = res.file;
    },
    handleAvatarSuccess2(res, file) {
      this.form.followqrcode = res.file;
    },
    beforeAvatarUpload(file) {
    },
    onSubmit() {
      var that = this;
      let para = {
        data: Object.assign({}, this.form)
      }
      if (this.pageType == "edit") {
        para.param = sessionStorage.getItem('token');// "59cbb548336a522ad06efe7e"; 
        editUserDetails(para).then((res) => {
          if (res.status == 200) {
            that.Loading = false;
            this.$message({
              message: "保存成功",
              type: "success"
            });
            that.goBack();
          } else {
            this.$message({
              message: "保存失败",
              type: "warning"
            });
          }
        });
      } else {
        addUserDetails(para).then((res) => {
          if (res.status == 200) {
            that.Loading = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            that.goBack();
          } else {
            this.$message({
              message: "添加失败",
              type: "warning"
            });
          }
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
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created: function() {
    this.pageType = this.$router.currentRoute.query.pageType;
    var that = this;
    var token = that.$router.currentRoute.query.token;
    let para = {
      param: token//sessionStorage.getItem('token')//"59cbb548336a522ad06efe7e"
    }
    if (this.pageType == "edit") {

      that.Loading = true;
      //NProgress.start();
      getUserDetails(para).then((res) => {
        var that = this;
        if (res.status == 200) {
          this.$message({
            message: "加载成功",
            type: "success"
          });
          var weixinqrcode = res.data.weixinqrcode;
          var followqrcode = res.data.followqrcode;
          res.data.weixinqrcode = weixinqrcode ? weixinqrcode : "";//微信二维码
          res.data.followqrcode = followqrcode ? followqrcode : "";//关注二维码
          that.form = res.data;
          that.form.createTime = (!res.data.createTime || res.data.createTime == '') ? '' : util.formatDate.format(new Date(res.data.createTime), 'yyyy-MM-dd');
          that.Loading = false;
          that.qrcodeUrl = res.data.qrcode;
        } else {
          this.$message({
            message: "加载失败",
            type: "warning"
          });
        }
      });


    }
  }
}
</script>
<style>
.avatarConsultancyDetails {
  width: 178px;
  height: 178px;
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