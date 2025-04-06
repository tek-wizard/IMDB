import React from 'react'
import Mycard from './MyCard'

function ShowLists({ list = [] }) {
  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {list.map((movieObj, index) => (
        <Mycard key={movieObj.id || index} movieObj={movieObj} />
      ))}
    </div>
  )
}

export default ShowLists
