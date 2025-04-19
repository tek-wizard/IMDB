import React, { useContext, useState } from "react"
import { Context } from "./Context"
import { Card, Image, Spacer } from "@heroui/react"

function MyCard({ movieObj }) {
  return (
    <Card
      isFooterBlurred
      className="border-none rounded-b-[1rem] rounded-tr-[1rem] w-[233px] h-[350px]"
    >
      <Image
        alt={movieObj.title}
        className="object-cover hover:brightness-50"
        radius="none"
        height={350}
        width={233}
        src={
          movieObj.poster_path
            ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}`
            : "/fallback-image.jpg"
        }
      />
    </Card>
  )
}

function Description({ inFocus, movieObj }) {
  const posterPath = movieObj?.poster_path
  const bgImage = `url(${
    posterPath
      ? `https://image.tmdb.org/t/p/original/${posterPath}`
      : "/fallback-image.jpg"
  })`
  return (
    <>
      {inFocus ? (
        <div className="relative min-h-[30rem] overflow-hidden border-none rounded-tr-[1rem]  rounded-br-[1rem]">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat blur-sm scale-105"
            style={{
              backgroundImage: bgImage,
              zIndex: 0,
            }}
          />

          <div className="relative">
            <span>
              {movieObj?.title || "Movie background"}
            </span>
          </div>
        </div>
      ) : (
        <h1>hello</h1>
      )}
    </>
  )
}

function FromWatchlist() {
  const { watchlist } = useContext(Context)
  const [inFocus, setInFocus] = useState(true)
  console.log(watchlist)
  if (watchlist.length == 0) {
    return
  }
  return (
    <>
      <h1 className="w-[100%] text-center text-white text-3xl font-display">
         Your Watchlist
      </h1>
      <div className="bg-none h-[30rem] w-[100%] flex">
        <div className="inline-block h-[30rem] w-[65%]">
          <Description inFocus={inFocus} movieObj={watchlist[0]} />
        </div>
        <div className="bg-none flex justify-center items-center relative left-[-60px]">
          <MyCard movieObj={watchlist[0]} />
          <Spacer x={8} />
          <MyCard movieObj={watchlist[0]} />
        </div>
      </div>
    </>
  )
}

export default FromWatchlist
