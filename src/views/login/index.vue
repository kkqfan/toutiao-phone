<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!-- 表单验证
         1. 使用 van-form 组件包裹表单项 van-field 
         2. 给 van-form 绑定 submit 事件，表单提交时会触发 submit 事件，
            只有表单验证通过时，才会触发 submit
         3. 使用 Field 的 rules 属性定义验证规则
     -->
    <van-form
      :show-error-message="false"
      :show-error="false"
      validate-first
      ref="login-form"
      @submit="onlogin"
      @failed="onFaild"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="small"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>

    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "17090086870",
        code: "246810",
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false, //控制倒计时的显示和隐藏
      isSendSmsLoading: false, //发送验证码按钮的 loading 状态
    };
  },
  methods: {
    async onlogin() {
      //登录/注册
      try {
        this.$toast.loading({
          message: "登陆中", //文本内容，支持通过\n换行
          forbidClick: false, //是否禁止背景点击
          duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
        });
        //1. 找到数据接口
        //2. 封装请求方法
        //3. 请求调用登录
        const { data } = await login(this.user);
        this.$toast.success("登录成功");

        //4. 处理响应结果
        this.$store.commit("setUser", data.data);

        this.$store.commit("removeCachPages", "layoutIndex");
        //登录成功，返回上一个页面
        this.$router.back();
        // const redirect = this.$route.query.redirect || "/";
        // this.$router.push(redirect);
      } catch (err) {
        this.$toast.fail("登录失败，手机或验证码输入错误！");
      }
    },
    onFaild(error) {
      console.log(error);
      //表单验证失败提示信息
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: top,
        });
      }
    },
    async onSendSms() {
      //发送验证码
      try {
        //1. 验证手机号
        await this.$refs["login-form"].validate("mobile");
        //验证通过，请求发送验证码
        this.isSendSmsLoading = true; //展示发送按钮的 loading 状态，防止用户多次点击该按钮
        const res = await sendSms(this.user.mobile);

        //2. 短信发出，隐藏发送验证码按钮，显示 60a 倒计时
        this.isCountDownShow = true;

        //3. 倒计时结束，通过监视倒计时组件的 finish 事件，隐藏倒计时，显示发送按钮
      } catch (err) {
        console.log(err);
        let message = "";
        if (err && err.response && err.response.status === 429) {
          message = "发送太频繁了，请稍后再试";
        } else if (err.name === "mobile") {
          message = err.message;
        } else {
          message = "发送失败，请稍后重试";
        }
        this.$toast({
          message,
          position: top,
        });
      }
      //无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border-radius: 5px;
      border: none;
      .van-button__content {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__content {
      font-size: 11px;
      color: #666;
    }
  }
}
</style>
