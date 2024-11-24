<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getHomeBannerAPI } from '@/services/home';
import CustomNavbar from './components/CustomNavbar.vue'
import { ref } from 'vue';
import type { BannerItem, CategoryItem } from '@/types/home';
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeCategoryAPI } from '@/services/home';
import HotPanel from './components/HotPanel.vue'
import { getHomeHotAPI } from '@/services/home';
import type { HotItem } from '@/types/home';
import XtxGuess from '@/components/XtxGuess.vue';
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables'


// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

const isLoading = ref(false)
// 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

const { guessRef, onScrolltolower } = useGuessList()
</script>

<template>
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view scroll-y class="scroll-view" @scrolltolower="onScrolltolower">
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <XtxSwiper :list="bannerList" />
      <CategoryPanel :list="categoryList" />
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-view {
  flex: 1;
}
</style>
