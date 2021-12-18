import React, { useRef, useEffect, useState, useCallback } from 'react'

const ListItem = (props) => {
  const { title, excerpt } = props

  return (
    <div className="list-item">
      <h2 className="list-item-title">{title}</h2>
      <div className="list-item-excerpt">{excerpt}</div>
    </div>
  )
}

const ScrollList = ({ handleSrcollBottom, delay = 500, list, itemHeight }) => {
  const [currentList, setCurrentList] = useState([])
  const [paddingTop, setPaddingTop] = useState(0)
  const [height, setHeight] = useState(0)
  const wrapper = useRef()
  const timer = useRef()
  const renderingTimer = useRef()

  const getCurrentList = useCallback(() => {
    const { scrollTop, clientHeight } = wrapper.current
    // 列表的高度
    const listHeight = list.length * itemHeight
    setHeight(listHeight)

    // 計算要從哪條數據開始渲染
    const indexStart = Math.floor(scrollTop / itemHeight)
    // 計算當前容器需要幾條數據
    const wrapperListItemCount = Math.ceil(clientHeight / itemHeight) + 10

    // 計算距離頂部要有多少padding
    const _paddingTop = indexStart * itemHeight
    setPaddingTop(_paddingTop)

    // 擷取要渲染的數據
    setCurrentList(list.slice(indexStart, indexStart + wrapperListItemCount))
  }, [itemHeight, list])

  const handleSrcoll = () => {
    const { scrollTop, clientHeight, scrollHeight } = wrapper.current

    // 渲染列表
    clearTimeout(renderingTimer.current)
    renderingTimer.current = setTimeout(() => {
      getCurrentList()
    }, 50)

    // 獲取列表
    if (scrollTop + clientHeight + itemHeight * 5 >= scrollHeight) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        handleSrcollBottom && handleSrcollBottom()
      }, delay)
    }
  }

  useEffect(() => {
    getCurrentList()
  }, [list, getCurrentList])

  return (
    <div ref={wrapper} className="scroll-container" onScroll={handleSrcoll}>
      <div className="scroll-height" style={{ height, paddingTop }}>
        {currentList.map((item, index) => {
          return <ListItem key={index} {...item}></ListItem>
        })}
      </div>
    </div>
  )
}

export default ScrollList
