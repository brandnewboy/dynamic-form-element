<script setup lang="ts">
import TableBuilder, {
  type Column,
} from '@/components/table-builder/TableBuilder.vue'
import { apis } from '@/services/apis.ts'

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
]
</script>

<template>
  <div class="container">
    <TableBuilder stripe :columns="columns" :data-apis="apis" />
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}
</style>
