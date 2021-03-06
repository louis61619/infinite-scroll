import React, { useEffect, useState, useCallback, useRef } from 'react'
import { getList } from '../service/list'
import ScrollList from '../components/ScrollList'

const Home = () => {
  const [list, setList] = useState([])
  const lastId = useRef()
  const isLoading = useRef(false)
  const noMore = useRef(false)

  const getPostList = useCallback(() => {
    if (!isLoading.current && !noMore.current) {
      isLoading.current = true
      getList(lastId.current).then((res) => {
        if (res.length) {
          if (lastId.current === res[res.length - 1].id) {
            noMore.current = true
            return
          }
          lastId.current = res[res.length - 1].id
          setList((oldList) => {
            return [...oldList, ...res]
          })
        } else {
          alert('請求失敗')
        }
        isLoading.current = false
      })
    }
  }, [])

  useEffect(() => {
    getPostList()
  }, [getPostList])

  return <ScrollList handleSrcollBottom={getPostList} itemHeight={140} list={list}></ScrollList>
}

export default Home
