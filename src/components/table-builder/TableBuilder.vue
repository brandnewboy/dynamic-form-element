<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import {
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElButton,
  ElInput,
} from 'element-plus'
import { renderDialog } from '@/renderDialog'

interface Column {
  prop: string
  label: string
  width?: string
}
type PromiseFn = (...args: any[]) => Promise<any>
interface DataApis {
  get: PromiseFn
  create?: PromiseFn
  update?: PromiseFn
  remove?: PromiseFn
}
const props = defineProps<{
  dataApis: DataApis
  columns: Column[]
}>()
export type { Column, DataApis }

const tableData = ref<any[]>([])
const isLoading = ref<boolean>(false)
const queryParams = ref<{ keyword?: string }>({})

function loadData() {
  isLoading.value = true
  props.dataApis
    .get(queryParams.value)
    .then(res => {
      tableData.value = res.data
    })
    .finally(() => {
      isLoading.value = false
    })
}
onMounted(loadData)
// TODO 完善
const Comp = () => {
  return h('h1', 'hello dialog')
}

function openForm(data: Record<string, any>) {
  renderDialog(Comp, {}, {})
}

async function handleCreate() {
  openForm({})
}
function handleUpdate() {
  openForm({})
}
function handleRemove() {}
</script>

<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-button @click="handleUpdate">修改</el-button>
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handleRemove">删除</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入搜索内容" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table v-loading="isLoading" :data="tableData" v-bind="$attrs">
          <el-table-column
            v-for="item in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
