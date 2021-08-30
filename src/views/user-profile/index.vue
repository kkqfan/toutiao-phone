<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人中心"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onfileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" fit="conver" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateName = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isUpdateSex = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isUpdateBirthday = true"
    ></van-cell>

    <!-- 修改昵称弹框 -->
    <van-popup
      v-model="isUpdateName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updateName v-model="user.name" @close="isUpdateName = false" />
    </van-popup>
    <!-- /修改昵称弹框 -->

    <!-- 修改性别弹框 -->
    <van-popup v-model="isUpdateSex" position="bottom">
      <updateSex v-model="user.gender" @close="isUpdateSex = false" />
    </van-popup>
    <!-- /修改性别弹框 -->

    <!-- 修改生日弹框 -->
    <van-popup v-model="isUpdateBirthday" position="bottom">
      <updateBirthday
        v-if="isUpdateBirthday"
        v-model="user.birthday"
        @close="isUpdateBirthday = false"
      />
    </van-popup>
    <!-- /修改生日弹框 -->

    <!-- 修改头像弹框 -->
    <van-popup
      class="update-photo-popup"
      v-model="isUpdatePhoto"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updatePhoto
        v-if="isUpdatePhoto"
        :file="previewImage"
        @close="isUpdatePhoto = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /修改头像弹框 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import updateName from "./components/update-name.vue";
import updateSex from "./components/update-sex.vue";
import updateBirthday from "./components/update-birthday.vue";
import updatePhoto from "./components/update-photo.vue";
export default {
  name: "userProfile",
  components: {
    updateName,
    updateSex,
    updateBirthday,
    updatePhoto,
  },
  data() {
    return {
      user: {}, //用户资料
      isUpdateName: false, //修改昵称弹框显示和隐藏
      isUpdateSex: false, //修改性别弹框显示和隐藏
      isUpdateBirthday: false, //修改生日弹框显示和隐藏
      isUpdatePhoto: false, //修改头像弹框显示和隐藏
      previewImage: null,
    };
  },
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile();
      this.user = data.data;
      console.log(data.data);
    },
    onfileChange() {
      const file = this.$refs.file.files[0];
      //window.URL.createObjectURL(this.$refs.file.files[0]);
      this.previewImage = file;

      this.isUpdatePhoto = true;
      this.$refs.file.value = "";
    },
  },
  created() {
    this.loadUserProfile();
  },
};
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
