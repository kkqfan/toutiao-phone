<template>
  <div class="update-photo">
    <img :src="image" class="image" alt="" ref="image" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfim"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "updatePhoto",
  props: {
    file: {
      required: true,
    },
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null,
    };
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob);
        });
      });
    },
    async onConfim() {
      this.$toast.loading({
        content: "保存中...",
        forbidClick: true,
      });

      const file = await this.getCroppedCanvas();

      const fd = new FormData();
      fd.append("photo", file);

      await updateUserPhoto(fd);
      this.$emit("update-photo", window.URL.createObjectURL(file));

      this.$emit("close");
      this.$toast.success("保存成功");
    },
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
};
</script>

<style lang="less" scoped>
.image {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
</style>
