import React, { useEffect, useState, useRef, useCallback } from "react"
import axios from "axios"
import { Loading } from "./Popular"
import Sideline from "./Sideline"
import MyCard from "./MyCard"
import { Spacer } from "@heroui/react"

function TopRated() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const scrollContainerRef = useRef(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=e7ab7217c6e7f635c3bc6191429655c8&language=en-US&page=${page}`
      )
      .then((response) => {
        setLoading(false)
        setMovies((prev) => {
          const newMovies = response.data.results.filter(
            (newMovie) => !prev.some((movie) => movie.id === newMovie.id)
          )
          return newMovies.length > 0 ? [...prev, ...newMovies] : prev
        })
      })
      .catch((err) => {
        console.log("error" + err)
      })
  }, [page])

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const container = scrollContainerRef.current
      if (
        container &&
        container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
      ) {
        setPage((prevPage) => prevPage + 1)
      }
    })
  }, [])

  return (
    <>
      <div
        className="container"
        // style={{ position: "relative", top: "-70px", left: "10px" }}
      >
        <h1 className="text-white inline-block relative left-[20px] top-[-30px] font-display text-[30px]">
          Top Rated
        </h1>
        <div
          className="scroll-container no-scroll bg-blend-normal"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {!loading && <Sideline />}
          <div className="scroll-content inline-block bg-blend-normal">
            {!loading ? (
              movies.map((value, index) => {
                return (
                  <>
                    <MyCard
                      key={index}
                      movieObj={value}
                      maxPopularity={Math.max(
                        ...movies.map((movie) => movie.popularity)
                      )}
                    />
                    <Spacer x={8} />
                  </>
                )
              })
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TopRated
