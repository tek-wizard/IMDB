import React, { useEffect, useState, useRef, useContext } from "react"
import { useCallback } from "react"
import "./Banner.css"
import MyCard from "./MyCard"
import axios from "axios"
import { Spacer, CircularProgress } from "@heroui/react"
import Sideline from "./Sideline"
import { Context } from "./Context"

export const Loading = () => {
  return (
    <div className="flex justify-center items-center" style={{width:"80rem"}}>
        <CircularProgress aria-label="Loading..." size="lg"/>
    </div>
  )
}

function Popular() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e7ab7217c6e7f635c3bc6191429655c8&language=en-US&page=${page}`
      )
      .then((response) => {
        console.log(response.data.results)
        setMovies((prev) => {
          const newMovies = response.data.results.filter(
            (newMovie) => !prev.some((movie) => movie.id === newMovie.id)
          )
          return newMovies.length > 0 ? [...prev, ...newMovies] : prev
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log("error fetching the data")
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
  }, [page])


  return (
    <>
      <div
        className="container"
        style={{ position: "relative", top: "-70px", left: "10px" }}
      >
        <h1 className="text-white inline-block relative left-[20px] top-[-30px] font-display text-[30px]">
          Popular
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
                      maxPopularity={movies[0].popularity}
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
      <Spacer y={40}/>
    </>
  )
}

export default Popular
