<script setup lang="ts">
import { ElMenu, ElMenuItem, ElRow, ElCol } from 'element-plus'
import { menuRoutes } from '@/router'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const defaultActive = computed(() => {
  const currentRoute = router.currentRoute.value
  return currentRoute.path
})
</script>

<template>
  <el-row>
    <el-col>
      <el-menu mode="horizontal" router :default-active="defaultActive">
        <el-menu-item
          v-for="item in menuRoutes"
          :key="item.path"
          :index="item.path"
          :route="item.path"
        >
          {{ item.meta?.title }}
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <router-view />
    </el-col>
  </el-row>
</template>

<style scoped></style>
