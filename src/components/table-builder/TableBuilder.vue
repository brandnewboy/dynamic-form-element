<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElButton,
  ElInput,
  ElNotification,
  ElMessageBox,
} from 'element-plus'
import { renderDialog } from '@/renderDialog'
import TableForm, {
  type ITableFormProps,
} from '@/components/table-builder/TableForm.vue'
import type { IFormItem } from '@/components/FormBuilder.vue'

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
  rowKey?: string
  formItems: IFormItem[]
  formRules: Record<string, any>
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
const selectRows = ref<any[]>([])
const selectRow = computed(() => {
  return selectRows.value[0]
})
const handleSelectionChange = (val: any[]) => {
  selectRows.value = val
}

function openForm(data: Record<string, any>) {
  renderDialog<typeof TableForm, ITableFormProps>(
    TableForm,
    {
      formItems: props.formItems,
      formData: data,
      formRules: props.formRules,
      requestApi: data[props.rowKey || 'id']
        ? props.dataApis.update
        : props.dataApis.create,
    },
    {
      title: data[props.rowKey || 'id'] ? '修改' : '新增',
      onConfirm: () => {
        loadData()
      },
    },
  )
}

async function handleCreate() {
  openForm({})
}
function handleUpdate() {
  if (!selectRow.value) {
    ElNotification({
      title: '提示',
      type: 'error',
      message: '请选择要修改的行',
    })
    return
  }
  openForm(selectRow.value)
}
function handleRemove() {
  if (!selectRow.value) {
    ElNotification({
      title: '提示',
      type: 'warning',
      message: '请选择要删除的行',
    })
    return
  }
  ElMessageBox.confirm('确定删除选中行吗？', '提示', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      props.dataApis
        .remove?.(selectRows.value.map(item => item[props.rowKey || 'id']))
        .then(() => {
          loadData()
          ElNotification({
            title: '提示',
            type: 'success',
            message: '删除成功',
          })
        })
        .catch(() => {
          ElNotification({
            title: '提示',
            type: 'error',
            message: '删除失败',
          })
        })
    })
    .catch(() => {
      ElNotification({
        title: '提示',
        type: 'primary',
        message: '取消操作',
      })
    })
}

defineExpose({
  refresh() {
    loadData()
  },
})
</script>

<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-button @click="handleUpdate">修改</el-button>
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handleRemove">删除</el-button>
      </el-col>
      <el-col :span="5">
        <el-input v-model="queryParams.keyword" placeholder="请输入搜索内容" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="loadData">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          v-loading="isLoading"
          :data="tableData"
          v-bind="$attrs"
          :row-key="rowKey"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
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
