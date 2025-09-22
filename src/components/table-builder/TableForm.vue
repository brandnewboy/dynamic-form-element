<script setup lang="ts">
import FormBuilder, { type IFormItem } from '@/components/FormBuilder.vue'
import { ref, useTemplateRef } from 'vue'
export interface ITableFormProps {
  formItems: IFormItem[]
  formData: Record<string, any>
  formRules: Record<string, any>
  requestApi?: (...args: any[]) => Promise<any>
}
const props = defineProps<ITableFormProps>()

const formBuilder =
  useTemplateRef<InstanceType<typeof FormBuilder>>('formBuilder')
const data = ref<Record<string, any>>({ ...props.formData })
defineExpose({
  async submit() {
    await formBuilder.value?.validate()
    if (props.requestApi) {
      return props.requestApi(data.value)
    }
  },
})
</script>

<template>
  <FormBuilder
    ref="formBuilder"
    :form-items="formItems"
    :form-data="data"
    :form-rules="formRules"
  />
</template>

<style scoped></style>
