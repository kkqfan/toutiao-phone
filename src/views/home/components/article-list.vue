<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="RefreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" />
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/articles";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [], //数据列表
      loading: false, //控制上拉加载的 loading 状态
      finished: false, //控制上拉加载结束状态
      timestamp: null, //获取下一页的时间戳
      isRefreshLoading: false, //下拉刷新 loading 状态
      RefreshSuccessText: "", //下拉刷新成功的提示
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      //1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      });
      //2.将数据放进 List 数组中
      const { results } = data.data;
      this.articles.push(...results);

      //3.结束本次加载，才能进行下一次加载
      this.loading = false;
      //4. 判断数据是否全部加载完成
      if (results.length) {
        //还有数据，更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp;
      } else {
        //没有数据了，结束记载状态，不再加载更多
        this.finished = true;
      }
    },
    async onRefresh() {
      //1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      //2. 把数据放进数据列表中（添加到顶部）
      const { results } = data.data;
      this.articles.unshift(...results);
      //3. 关闭下拉刷新的 loading 状态
      this.isRefreshLoading = false;
      this.RefreshSuccessText = `更新了${results.length}条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0%;
  right: 0%;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
