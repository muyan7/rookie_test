// 155.5封装一个专门生成唯一id的函数，需要的时候调用。也可以放一些正则表达式
import { nanoid } from 'nanoid'
// 生成一个随机字符串，且不随页面刷新而发生变化，游客身份持久储存。
export const getNANOID = () => {
  // 查看本地存储是否存在id
  let nanoId = localStorage.getItem('NANOIDTOKEN')
  if (!nanoId) {
    nanoId = nanoid()
    localStorage.setItem('NANOIDTOKEN',nanoId)
  }
  // console.log(nanoId)
  return nanoId
}
