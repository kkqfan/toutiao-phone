<template>
  <div class="search-suggestion">
    <van-cell v-for="(str, index) in suggestions" :key="index" icon="search" @click="$emit('search',str)">
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchSuggestion: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //联想建议数据列表
    };
  },
  computed: {},
  watch: {
    searchSuggestion: {
      handler: debounce(async function() {
        const { data } = await getSearchSuggestions(this.searchSuggestion);
        this.suggestions = data.data.options;
      }, 200),
      immediate: true, //表示该回调在监听开始时被立即调用
    },
  },
  created() {
    //   console.log(this.searchSuggestion);
  },
  mounted() {},
  methods: {
    // 联想关键字高亮显示
    highlight(keyword) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(this.searchSuggestion, "gi");
      return keyword.replace(
        reg,
        `<span style="color: #3296fa">${keyword}</span>`
      );
    },
  },
};
</script>

<style scoped lang="less"></style>
