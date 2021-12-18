import request from './reuqest'

export function getList(id) {
  return request({
    url: '/posts',
    params: {
      popular: true,
      before: id,
    },
  })
}
