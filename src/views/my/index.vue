<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        title="单元格"
        value="内容"
        center
        class="base-info"
        :border="false"
      >
        <van-image
          class="base-info-avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="base-info-name" slot="title">{{currentUser.name}}</div>
        <van-button class="base-info-updateBtn" size="small" round to="/user/profile"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser. art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <img class="not-login-img" src="./手机.png" />
      </div>
      <div class="not-login-text">登录 / 注册</div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon="browsing-history-o"
        text="文字"
      />
    </van-grid>

    <!-- <van-cell title="消息通知" is-link to="/" /> -->
    <!-- <van-cell class="mb-4" title="小智通信" is-link to="/" /> -->
    <van-cell
      v-if="user"
      @click="onLoginOut"
      class="loginout-cell"
      title="退出登录"
    />
  </div>
</template>

<script>
import { getCurrentInfo } from "@/api/user";
import { mapState, mapMutations } from "vuex";

export default {
  
  name: "MyIndex",
  data(){
    return {
      currentUser:{}  //当前登录用户信息
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    onLoginOut() {
     this.$dialog.confirm({
        title: "退出提示",
        message: "是否确认退出？",
      })
        .then(() => {
          //确认 执行这里代码
          //清楚用户登录状态
          this.setUser(null);
        })
        .catch(() => {
          //取消 执行这里代码
        });
    },
    async loadCurrentUser(){
       const {data}=await getCurrentInfo();
       this.currentUser=data.data;
       console.log(this.currentUser);
    }
  },
  created(){
    this.loadCurrentUser()
  }
};
</script>
<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;

      .base-info-avatar {
        width: 66px;
        height: 66px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .base-info-name {
        color: #fff;
        font-size: 15px;
      }
      .base-info-updateBtn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        color: #fff;
        height: 65px;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      text-align: center;
      background-color: unset !important;
    }
  }
  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    .not-login-img {
      width: 66px;
      height: 66px;
      margin-top: 50%;
    }
    .not-login-text {
      color: #fff;
      font-size: 14px;
    }
  }
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .van-grid-item__icon {
        font-size: 22px;
      }
      .van-icon-star-o {
        color: #eb5253;
      }
      .van-icon-browsing-history-o {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .loginout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
