<script setup lang="ts">
import TableBuilder, {
  type Column,
} from '@/components/table-builder/TableBuilder.vue'
import { apis } from '@/services/apis.ts'
import type { IFormItem } from '@/components/FormBuilder.vue'
import { ElInput } from 'element-plus'

const columns: Column[] = [
  {
    prop: 'date',
    label: '注册日期',
    width: '180',
  },
  {
    prop: 'name',
    label: '姓名',
    width: '180',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'phone',
    label: '手机号',
  },
]

const formItems: IFormItem[] = [
  {
    type: ElInput,
    label: '姓名',
    prop: 'name',
    placeholder: '请输入姓名',
  },
  {
    type: ElInput,
    label: '地址',
    prop: 'address',
    placeholder: '请输入地址',
  },
  {
    type: ElInput,
    label: '手机号',
    prop: 'phone',
    placeholder: '请输入手机号',
  },
]

const formRules: Record<string, any> = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
}
</script>

<template>
  <div class="container">
    <TableBuilder
      :row-key="'id'"
      :form-rules="formRules"
      :form-items="formItems"
      stripe
      :columns="columns"
      :data-apis="apis"
    />
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}
</style>
