<script setup lang="ts">
import { ElInput, ElForm, ElFormItem, ElCol, ElRow } from 'element-plus'
import {type VNode, useTemplateRef, computed, type Component} from 'vue'

const props = defineProps<{
  formItems: IFormItem[]
  formData: Record<string, any>
  formRules: Record<string, any>
}>()

export interface IFormItem {
  type: keyof typeof componentsMap | (() => VNode) | Component | null
  label: string
  prop: string
  span?: number
  hidden?: boolean
  props?: Record<string, any>
  [K: string]: any
}

const componentsMap = {
  input: ElInput,
}

function getComponent(type: IFormItem['type']) {
  if (typeof type !== 'string') {
    return type
  } else {
    return componentsMap[type]
  }
}

function omit<T>(obj: T, keys: (keyof T)[]) {
  if (obj === null || obj === undefined) {
    return {} as Omit<T, (typeof keys)[number]>
  }

  return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key as keyof T))
  ) as Omit<T, (typeof keys)[number]>
}

const rootProps: Partial<keyof IFormItem>[] = ['type', 'label', 'prop']
function getProp(item: IFormItem) {
  if ('props' in item) {
    return item.props
  }

  return omit(item, rootProps)
}

const formInstance = useTemplateRef<typeof ElForm>('formRef')
defineExpose({
  validate: () => {
    return formInstance.value?.validate()
  }
})
const computedFormItems = computed(() => {
  return props.formItems.filter(item => !item.hidden)
})
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="formRules">
    <el-row :gutter="24">
      <el-col v-for="item in computedFormItems" :key="item.prop" :span="item.span || 24">
        <el-form-item :label="item.label" :prop="item.prop">
          <slot :name="item.prop">
            <component
                :is="getComponent(item.type)"
                v-bind="getProp(item)"
                v-model="formData[item.prop]"
            />
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>

</style>