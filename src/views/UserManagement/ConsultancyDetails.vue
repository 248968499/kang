
  <template>
  <section>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="顾问详情" v-loading="Loading" name="ConsultancyDetails" style="width:900px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="1">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="头像：" label-width="100px">
                <el-upload class="avatar-uploader" action="http://121.43.35.110:9000/api/file/up" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="form.avatar" :src="form.avatar" class="avatarConsultancyDetails">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="用户角色" label-width="100px">
                <el-select v-model="form.role" placeholder="请选择">
                  <el-option label="时尚达人" value="MASTER"></el-option>
                  <el-option label="高级时尚顾问" value="COUNSELOR"></el-option>
                  <el-option label="初级时尚顾问" value="BUYER"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="昵称：" label-width="100px">
                <el-input v-model="form.nickName"></el-input>
              </el-form-item>

              <el-form-item label="微信二维码：" label-width="100px">
                <el-upload class="avatar-uploader" action="http://121.43.35.110:9000/api/file/up" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
                  <img v-if="form.weixinqrcode" :src="form.weixinqrcode" class="avatarConsultancyDetails">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="关注二维码：" label-width="100px">
                <el-upload class="avatar-uploader" action="http://121.43.35.110:9000/api/file/up" :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
                  <img v-if="form.followqrcode" :src="form.followqrcode" class="avatarConsultancyDetails">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
              <el-form-item label="注册时间" label-width="100px">
                <el-date-picker disabled v-model="form.createTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="goBack()">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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