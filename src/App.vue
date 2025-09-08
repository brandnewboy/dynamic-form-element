<script setup lang="ts">
import FormBuilder, { type IFormItem } from "./components/FormBuilder.vue"
import {ref, h, useTemplateRef, computed} from "vue"
import {ElInput, ElInputNumber, ElButton, ElSelect, ElRadioGroup, ElCascader} from "element-plus"
import HelloWorld from './components/HelloWorld.vue'
import {testCascadeOptions} from "./store";
import {useFormBuilder} from "./composables/useFormBuilder.ts";

const formData = ref({
  name: '',
  age: 0,
  gender: 1,
  status: 1,
  customComponentValue: '自定义组件值',
  hFunctionValue: '渲染函数值',
  customSlotValue: '',
  relationsConditionValue: undefined
})

const formRules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '请输入数字', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' },
  ],
  customSlotValue: [
    { required: true, message: '请输入自定义插槽的值', trigger: 'blur' },
  ],
  relationsConditionValue: [
    { required: true, message: '请选择关联条件渲染', trigger: 'change' },
  ],
})

const formItems = computed<IFormItem[]>(() => [
    {
      type: 'input',
      label: '姓名',
      prop: 'name',
      span: 12,
      placeholder: '请输入姓名',
      hidden: false,
    },
    {
      type: ElInputNumber,
      label: '年龄',
      span: 12,
      prop: 'age',
      placeholder: '请输入年龄',
      props: {
        type: 'number',
      }
    },
    {
      type: ElRadioGroup,
      label: '级联选择器状态',
      prop: 'status',
      span: 12,
      options: [
        {
          label: '正常',
          value: 1,
        },
        {
          label: '禁用',
          value: 2,
        },
      ]
    },
    {
      type: ElSelect,
      label: '性别',
      prop: 'gender',
      span: 12,
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ]
    },
    {
      type: HelloWorld,
      label: '自定义组件',
      prop: 'customComponentValue',
      placeholder: '请输入自定义组件的值',
    },
    {
      type: () => h('div', { style: { color: 'red' } }, '渲染函数'),
      label: '渲染函数',
      prop: 'hFunctionValue',
      placeholder: '请输入渲染函数的值',
    },
    {
      type: null,
      label: '自定义插槽',
      prop: 'customSlotValue',
    },
    {
      type: ElCascader,
      label: '关联条件渲染',
      prop: 'relationsConditionValue',
      hidden: formData.value.status !== 1,
      props: {
        options: testCascadeOptions,
      }
    }
  ])

const formBuilderRef = useTemplateRef<typeof FormBuilder>('formBuilderRef')

const onSubmit = () => {
  formBuilderRef.value?.validate().then(() => {
    console.log(formData.value)
  }).catch((e: any) => {
    console.log('校验失败', e)
  })
}


const { FormBuilder: FormBuilderComposable, validate: validateComposable } = useFormBuilder({
  formRules,
  formItems,
  formData,
})
const onSubmitComposable = () => {
  validateComposable().then(() => {
    console.log(formData.value)
  }).catch((e: any) => {
    console.log('校验失败', e)
  })
}
</script>

<template>
  <div class="form-container">
    <h1>组件式使用</h1>
    <FormBuilder
        ref="formBuilderRef"
        :formRules="formRules"
        :formItems="formItems"
        :formData="formData"
    >
      <template #customSlotValue>
        <el-input v-model="formData.customSlotValue" placeholder="请输入自定义插槽的值" />
      </template>
    </FormBuilder>
    <el-button @click="onSubmit">提交</el-button>
  </div>

  <div class="form-container">
    <h1>组合式函数使用</h1>
    <FormBuilderComposable
        :formRules="formRules"
        :formItems="formItems"
        :formData="formData"
    >
      <template #customSlotValue>
        <el-input v-model="formData.customSlotValue" placeholder="请输入自定义插槽的值" />
      </template>
    </FormBuilderComposable>
    <el-button @click="onSubmitComposable">提交</el-button>
  </div>
</template>

<style scoped>
.form-container {
  width: 600px;
  margin: auto;
}
</style>
