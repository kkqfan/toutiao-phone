<template>
  <div class="update-sex">
    <van-picker
      show-toolbar
      title="性别"
      :columns="columns"
      :default-index="defaultIndex"
      @confirm="onConfim"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";

export default {
  name: "updateSex",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  methods: {
    async onConfim() {
      //console.log("onConfim");
      this.$toast.loading({
        content: "修改中...",
        forbidClick: true,
      });
      await updateUserProfile({
        gender: this.defaultIndex,
      });
      this.$emit("close");
      this.$emit("input", this.defaultIndex);

      this.$toast.success("保存成功");
    },
    onChange(picker, value, index) {
      console.log(index);
      this.defaultIndex = index;
      //console.log(picker, value, index);
    },
  },
};
</script>

<style lang="less" scoped></style>
