import instance, { ResponseData } from './base'

// 获取问卷的统计列表
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResponseData> {
  const url = `/api/stat/${questionId}`
  const data = (await instance.get(url, { params: opt })) as ResponseData
  return data
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResponseData> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await instance.get(url)) as ResponseData
  return data
}
