<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "searchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    async onLoad() {
      //1.获取数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText,
      });
      //2.将数据放入数据列表中
      const { results } = data.data;
      this.list.push(...results);
      //3.关闭 loading 状态
      this.loading = false;
      //4.判断是否还有数据
      if (results.length) {
        //还有数据
        this.page++;
      } else {
        //没有数据
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 54px;
  overflow-y: auto;
}
</style>
