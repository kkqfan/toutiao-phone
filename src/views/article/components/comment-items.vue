<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap" @click="onCommentLike(comment)">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{ like: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        >{{ comment.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round @click="$emit('reply-click',comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from "@/api/comment";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.onClll()
  },
  mounted() {},
  methods: {
    onClll(){
      console.log(comment);
    },
    async onCommentLike(comment) {
      // 如果已经赞了则取消点赞
      console.log(comment.is_liking);
      if (comment.is_liking) {
        console.log(comment.com_id);
        await deleteCommentLike(comment.com_id);
        comment.like_count--;
      } else {
        // 如果没有赞，则点赞
        await addCommentLike(comment.com_id);
        comment.like_count++;
      }

      // 更新视图状态
      comment.is_liking = !comment.is_liking;
      this.$toast("操作成功");
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 14px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 9px;
    color: #222;
    margin-right: 14px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 65px;
    height: 24px;
    line-height: 24px;
    font-size: 10px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 9px;
    line-height: 15px;
    margin-right: 7px;
    .van-icon {
      font-size: 15px;
    }
  }
  .like {
    color: pink;
  }
}
</style>
