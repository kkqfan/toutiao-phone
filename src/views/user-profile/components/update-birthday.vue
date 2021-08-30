<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfim"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";

export default {
  name: "updateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfim() {
      //console.log("onConfim");
      this.$toast.loading({
        content: "修改中...",
        forbidClick: true,
      });
      const date = dayjs(this.currentDate).format("YYYY-MM-DD");
      await updateUserProfile({
        birthday: date,
      });
      this.$emit("close");
      this.$emit("input", date);

      this.$toast.success("保存成功");
    },
  },
};
</script>

<style lang="less" scoped></style>
