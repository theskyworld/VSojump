import { post } from './base'

// 提交答卷
export async function postAnswer(answerInfo: any) {
  const url = '/api/answer'
  const data = await post(url, answerInfo)
  return data
}