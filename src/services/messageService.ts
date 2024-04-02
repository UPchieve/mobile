import http from './http'

export async function isMessageClean(message: string) {
  const resp = await http.post<{ isClean: boolean }>('/api/moderate/message', {
    content: message,
  })
  return resp.data.isClean
}
