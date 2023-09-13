import { get } from './base'

export async function getQuestionById(id: string) {
  const url = `/api/answer-question/${id}` // Mock 或服务端
  get(url);
  const data = await get(url)
  return data
}