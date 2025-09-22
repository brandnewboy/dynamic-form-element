import { createApp, h, ref, type Component, type ExtractPropTypes } from 'vue'
import { ElDialog, ElButton, ElNotification } from 'element-plus'

// TODO 完善
export function renderDialog<
  T extends Component,
  D extends Record<string, any>,
>(
  component: T,
  // 组件的 props 类型
  componentProps: D,
  dialogProps: ExtractPropTypes<(typeof ElDialog)['props']> & {
    onConfirm?: () => any
    onCancel?: () => any
  } = {},
) {
  const instance = ref<{ submit: () => Promise<any> }>()

  const container = document.createElement('div')
  document.body.appendChild(container)

  const { onConfirm, onCancel, ...restDialogProps } = dialogProps
  const Dialog = () => {
    return h(
      ElDialog,
      {
        ...restDialogProps,
        modelValue: true,
        onClosed: () => {
          unmount()
        },
      },
      {
        default: () => h(component, { ...componentProps, ref: instance }),
        footer: () => {
          return h('div', null, {
            default: () => [
              h(
                ElButton,
                {
                  type: 'primary',
                  onClick: () => {
                    instance.value?.submit?.().then(() => {
                      ElNotification({
                        title: '提示',
                        type: 'success',
                        message: '操作成功',
                      })
                      onConfirm?.()
                      unmount()
                    })
                  },
                },
                {
                  default: () => '确定',
                },
              ),
              h(
                ElButton,
                {
                  onClick: () => {
                    ElNotification({
                      title: '提示',
                      type: 'primary',
                      message: '取消操作',
                    })
                    onCancel?.()
                    unmount()
                  },
                },
                {
                  default: () => '取消',
                },
              ),
            ],
          })
        },
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
