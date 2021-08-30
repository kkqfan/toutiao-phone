<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfim"
    />

    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "updateName",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async onConfim() {
      //console.log("onConfim");
      this.$toast.loading({
        content: "修改中...",
        forbidClick: true,
      });
      try {
        await updateUserProfile({
          name: this.localName,
        });
        this.$emit("close");
        this.$emit("input", this.localName);

        this.$toast.success("保存成功");
      } catch (error) {
        if (error && error.response && response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .name-field-wrap {
  padding: 10px;
}
</style>
