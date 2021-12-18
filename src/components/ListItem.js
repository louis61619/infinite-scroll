import React from 'react'

const ListItem = (props) => {
  const { title, excerpt } = props

  return (
    <div className="list-item">
      <h2 className="list-item-title">{title}</h2>
      <div className="list-item-excerpt">{excerpt}</div>
    </div>
  )
}

export default ListItem
