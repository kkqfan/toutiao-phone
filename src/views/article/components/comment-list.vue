<template>
  <div class="comment-list">
    <van-cell title=""></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <commentItems
        v-for="(comment, index) in commentList"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click',$event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import commentItems from "./comment-items.vue";
export default {
  name: "commentList",
  components: {
    commentItems,
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true,
    },
    commentList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      //commentList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数
      //1.请求获取数据
      const { data } = await getComments({
        type: "a",
        source: this.source,
        offset: this.offset,
        limit: this.limit,
      });
     console.log(data);
      this.$emit("updateTotleComment", data.data.total_count);
      //2.将数据放入 List 列表中
      const { results } = data.data;
      this.commentList.push(...results);
      //3.关闭 loading 状态
      this.loading = false;
      //4.判断是否还有数据
      if (results.length) {
        //如果有。更新下一页数据的页码
        this.offset = data.data.last_id;
      } else {
        //如果没有，将 finished 设置为 true ，结束加载数据
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
// .comment-list{
//   margin-top: -30px;
// }
</style>
