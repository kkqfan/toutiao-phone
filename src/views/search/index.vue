<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShoe = false"
      />
    </form>

    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <searchResult :searchText="searchText" v-if="isResultShoe" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <searchSuggest
      :searchSuggestion="searchText"
      v-else-if="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <SearchHistory
      :searchHistories="searchHistories"
      v-else
      @search="onSearch"
      @delete-allHistory="searchHistories = $event"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import searchResult from "./components/search-result.vue";
import searchSuggest from "./components/search-suggestion.vue";
import SearchHistory from "./components/search-history.vue";

import { setItem, getItem } from "@/utils/storage";
import { mapState } from "vuex";
// import { getSearchHistories } from "@/api/search";

export default {
  name: "search",
  created() {
    this.loadSearchHistories();
  },
  components: {
    searchResult,
    searchSuggest,
    SearchHistory,
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      searchText: "", //搜索框文本内容
      isResultShoe: false, //控制搜索结果框的显示和隐藏
      searchHistories: [], //存储搜索记录数据列表
    };
  },
  watch: {
    searchHistories() {
      //监听搜索记录数据列表，更新本地存储
      setItem("search-history", this.searchHistories);
    },
  },
  methods: {
    onSearch(searchText) {
      //将搜索框文本更新成传入的文本
      this.searchText = searchText;

      //将搜索存储到 searchHistories 数组列表中
      //先去重
      const index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      //把最新搜索历史记录放到列表顶部
      this.searchHistories.unshift(searchText);

      //将搜索历史记录保存到本地存储
      //   setItem("search-history", this.searchHistories);
      //搜索 方法
      this.isResultShoe = true;
    },
    onCancel() {
      //取消按钮 方法
    },
    async loadSearchHistories() {
      //获取本地存储
      const searchHistories = getItem("search-history") || [];
      //   if (this.user) {
      //     //登录状态,获取线上用户搜索历史记录
      //     const { data } = await getSearchHistories();
      //     //console.log(data);
      //     //数组合并：[...数组,...数组]
      //     //把 Set 转为数组 [...Set对象]
      //     //数组去重 [...new Set(数组)]
      //     searchHistories = [
      //       ...new Set([...searchHistories, ...data.data.keywords]),
      //     ];
      //   }
      this.searchHistories = searchHistories;
    },
  },
};
</script>

<style lang="less" scoped></style>
