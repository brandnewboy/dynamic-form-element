import {
    h,
    ref,
    type FunctionalComponent,
    type Ref,
    type ComputedRef,
    type Reactive,
    reactive
} from "vue";
import FormBuilder, {type IFormItem} from "../components/FormBuilder.vue";

export const useFormBuilder = (
    options: {
        formRules: Record<string, any>,
        formItems: IFormItem[] | Ref<IFormItem[]> | ComputedRef<IFormItem[]> | Reactive<IFormItem>[],
        formData: Record<string, any>,
    }) => {
    const formBuilderRef = ref<typeof FormBuilder>()

    const Component: FunctionalComponent = (_, {slots}) => {
        return h(FormBuilder, {...reactive(options), ref: formBuilderRef}, slots)
    }

    return {
        FormBuilder: Component,
        validate() {
            if (!formBuilderRef.value) {
                throw new Error('formBuilderInstance is null')
            }
            return formBuilderRef.value?.validate()
        }
    }
}
