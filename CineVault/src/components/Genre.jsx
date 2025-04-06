import React from 'react'
import { genreids } from "../utilities/genre";

function Show({id,last=false}){
    return <p>{genreids[id]}{!last && <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"></path></svg>}</p>
}

function Genre({genres}) {
  return (
    <div className='flex flex-wrap'>
        {genres.map((value,index)=>{
            return <Show key={index} id={value} last={index===genres.length-1}/>
        })}
    </div>
  )
}

export default Genre
