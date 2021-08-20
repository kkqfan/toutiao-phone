<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('delete-allHistory',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onDelete(history, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from "@/utils/storage";
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, //删除按钮的显示和隐藏
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //删除历史记录的方法
    onDelete(history, index) {
      //删除 状态
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);

        //后台没有删除单个历史记录的接口，所以在这里只能删除本地的
        // setItem("search-history", this.searchHistories);
        return;
      }
      //非删除 状态
      this.$emit("search", history);
    },
  },
};
</script>

<style scoped lang="less"></style>
