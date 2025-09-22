import type { DataApis } from '@/components/table-builder/TableBuilder.vue'

export interface UserDto {
  id: number
  date: string
  name: string
  address: string
  phone: string
}

let dataSource: UserDto[] = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '13800000000',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '13800000000',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '13800000000',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '13800000000',
  },
]

function promiseTimeout(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}
export const apis: DataApis = {
  get: async (params: { keyword?: string }) => {
    console.log('get', dataSource)
    await promiseTimeout(500) // 模拟网络延迟
    const data = dataSource.filter(item => {
      return item.name.includes(params?.keyword || '')
    })
    return { data }
  },
  create: async (data: any) => {
    await promiseTimeout(500) // 模拟网络延迟
    data.id = dataSource.length + 1
    data.date = new Date().toLocaleDateString()
    dataSource.push(data)
    console.log('create', dataSource)

    return Promise.resolve([...dataSource])
  },
  update: async (data: any) => {
    console.log('update', data)
    await promiseTimeout(500) // 模拟网络延迟
    const index = dataSource.findIndex((item: any) => item.id === data.id)
    dataSource[index] = data
    return Promise.resolve([...dataSource])
  },
  remove: async (ids: number[]) => {
    dataSource = dataSource.filter((item: any) => !ids.includes(item.id))
    console.log('remove', dataSource)
  },
}
