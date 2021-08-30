<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" size="mini" :disabled="!message" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "postComment",
  props: {
    target: {
      type: [String, Number, Object],
      required: true,
    },
    articleId: {
      type: [String, Number, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        content: "发布中...",
        forbidClick: true,
      });
      //1.请求数据
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message.toString(),
        art_id: this.articleId ? this.articleId.toString() : null,
      });
      //2.将评论成功返回的数据 传给父组件
      this.$emit("post-success", data.data.new_obj);

      //3.清空输入框
      this.$toast.success("提交成功");
      this.message = "";
    },
  },
};
</script>
<style lang="less" scoped>
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
  .post-btn {
    width: 40px;
  }
}
</style>
