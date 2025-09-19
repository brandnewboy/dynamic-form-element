import { type Component, createApp, h, ref } from 'vue'
import { ElDialog } from 'element-plus'

// TODO 完善
export function renderDialog(
  component: Component,
  componentProps: Record<string, any>,
  dialogProps: (typeof ElDialog)['props'] = {},
) {
  const instance = ref<{ submit: () => Promise<any> }>()

  const container = document.createElement('div')
  document.body.appendChild(container)

  const Dialog = () => {
    return h(
      ElDialog,
      {
        ...dialogProps,
        modelValue: true,
        onClosed: () => {
          unmount()
        },
      },
      {
        default: () => h(component, { ...componentProps, ref: instance }),
      },
    )
  }

  const dialogApp = createApp(Dialog)
  dialogApp.mount(container)

  function unmount() {
    dialogApp.unmount()
    document.body.removeChild(container)
  }
}
