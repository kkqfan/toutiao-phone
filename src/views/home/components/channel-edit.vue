<template>
  <div class="channelEdit-container">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        class="channel-btn"
        type="danger"
        size="mini"
        round
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannel"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannel"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channels";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    userChannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], //所有频道数据列表
      isEdit: false, //控制编辑按钮状态
    };
  },
  created() {
    this.getAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    recommendChannel() {
      //获取推荐频道列表
      //推荐频道列表 = 所有频道列表 - 我的频道列表
      //filter 方法用来过滤数据，根据方法返回的布尔值 true 来收集数据
      return this.allChannels.filter((channel) => {
        return !this.userChannel.find((userChannel) => {
          return userChannel.id === channel.id;
        });
      });
    },
  },
  methods: {
    //获取所有频道数据
    async getAllChannels() {
      const { data } = await getAllChannels();
      //  console.log(data.data.channels);
      this.allChannels = data.data.channels;
    },
    //添加到 我的频道
    async onAddChannel(channel) {
      try {
        this.userChannel.push(channel);
        if (this.user) {
          // 已登录，数据存储到线上
          await addUserChannel([
            {
              id: channel.id, // 频道 id
              seq: this.userChannel.length, // 频道的 序号
            },
          ]);
        } else {
          // 未登录，数据存储到本地
          setItem("channels", this.userChannel);
        }
      } catch (err) {
        console.log(err);
        this.$toast("添加频道失败");
      }
    },
    //我的频道 编辑按钮 事件
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        //编辑状态，删除频道，执行删除方法 deleteMyChannel(index)
        this.deleteMyChannel(channel, index);
      } else {
        //非编辑状态，切换频道，执行切换频道方法 switchMyChannel(index)
        this.switchMyChannel(index);
      }
    },
    //删除频道方法
    async deleteMyChannel(channel, index) {
      //如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        //更新频道的激活索引
        this.$emit("onUpdataActive", this.active - 1);
      }
      this.userChannel.splice(index, 1);
      try {
        if (this.user) {
          console.log("isLOgin");
          // 已登录，数据存储到线上
          await deleteUserChannel(channel.id);
        } else {
          // 未登录，数据存储到本地
          setItem("channels", this.userChannel);
        }
      } catch (err) {
        console.log(err);
        this.$toast("删除频道失败");
      }
    },
    //切换频道方法
    switchMyChannel(index) {
      //触发父组件的 关闭弹出层方法
      this.$emit("close");
      //触发父组件的 切换首页显示的频道 的方法
      this.$emit("onUpdataActive", index);
    },
  },
};
</script>

<style lang="less" scoped>
.channelEdit-container {
  padding-top: 54px;
  .channel-title {
    color: #333;
    font-size: 16px;
  }
  .channel-btn {
    padding-left: 14px;
    padding-right: 14px;
  }
  .grid-item {
    width: 80px;
    height: 45px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #cccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
}
</style>
