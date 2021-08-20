<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        icon="search"
        type="info"
        slot="title"
        size="small"
        round
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <ArticleList :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="wrap-nav-placeholder"></div>
      <div
        class="wrap-nav-wrap"
        slot="nav-right"
        @click="isChannelEditShow = true"
      >
        <van-icon class-prefix="toutiao" name="gengduo"></van-icon>
      </div>
    </van-tabs>
    <!-- /文章频道列表 -->

    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :userChannel="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @onUpdataActive="active = $event"
      />
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import { getUserChnnels } from "@/api/user";

import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";

export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [], //存储文章频道列表数组
      isChannelEditShow: false, //控制弹出层是否弹出
    };
  },
  created() {
    this.loadUserChnnels();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadUserChnnels() {
      let channels = [];
      if (this.user) {
        //登录状态
        const { data } = await getUserChnnels();
        channels = data.data.channels;
      } else {
        //未登录状态
        //判断是否有本地存储
        const localChannels = getItem("channels");
        if (localChannels) {
          channels = localChannels;
        } else {
          const { data } = await getUserChnnels();
          channels = data.data.channels;
        }
      }
      this.channels = channels;
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-icon {
        font-size: 16px;
      }

      .van-button__text {
        font-size: 14px;
      }
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      background-color: #3296fa;
      width: 15.5px;
      height: 4.5px;
      border-radius: 20px;
    }
  }
  .wrap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wrap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    opacity: 0.9;
    text-align: center;
    .toutiao {
      font-size: 20px;
    }
  }
}
</style>
