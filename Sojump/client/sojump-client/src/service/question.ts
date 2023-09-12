import { get } from './base'

export async function getQuestionById(id: string) {
  const url = `/api/question/${id}` // Mock 或服务端
  const data = await get(url)
  return data
}