import React from "react"
import Mycard from "./MyCard"

function ShowLists({ list = [] }) {
  const maxPopularity = Math.max(
    ...list.map((movie) => movie.popularity || 0),
    0
  )

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {list.map((movieObj, index) => (
        <Mycard
          key={movieObj.id || index}
          movieObj={movieObj}
          maxPopularity={maxPopularity}
        />
      ))}
    </div>
  )
}

export default ShowLists
