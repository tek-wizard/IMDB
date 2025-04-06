import React, { useRef, useEffect, useState } from "react"
import axios from "axios"
import "./Banner.css"

function Show({ img }) {
  return (
    <div
      className="h-[70vh] w-[80vw] bg-cover bg-no-repeat bg-center bg-blend-normal"
      style={{
        backgroundImage: `url(${img})`,
        maskImage:
          "radial-gradient(circle, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)",
        WebkitMaskImage:
          "radial-gradient(circle, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)",
      }}
    ></div>
  );
}

function Banner() {
  const scrollRef = useRef(null)
  const scrollInterval = useRef(null)
  const [img, setImg] = useState(["https://image.tmdb.org/t/p/original//xkjWiRQtrenqGRWO2Enry2JIl4d.jpg"]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e7ab7217c6e7f635c3bc6191429655c8&language=en-US&page=1`
      )
      .then((response) => {
        console.log(response.data.results)
        setImg(
          response.data.results
            .filter((obj) => obj.backdrop_path != null)
            .map((obj) => {
              return `https://image.tmdb.org/t/p/original/${obj.backdrop_path}`
            })
        )
      })
      .catch((err) => {
        console.log("Error in fetching data")
      })
  }, [])


  const scrollRight = () => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: window.innerWidth * 0.8,
      behavior: "smooth",
    })

    setTimeout(() => {
      if (
        scrollRef.current.scrollLeft >
        scrollRef.current.scrollWidth / 2 - window.innerWidth * 0.8
      ) {
        requestAnimationFrame(() => {
          scrollRef.current.style.scrollBehavior = "auto"
          scrollRef.current.scrollLeft = 0
          requestAnimationFrame(() => {
            scrollRef.current.style.scrollBehavior = "smooth"
          })
        })
      }
    }, 900)

  }

  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      scrollRight()
    }, 5000)

    return () => clearInterval(scrollInterval.current)
  }, [])

  useEffect(() => {
    const preventScroll = (event) => {
      event.preventDefault()
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", preventScroll, {
        passive: false,
      })
      scrollContainer.addEventListener("touchmove", preventScroll, {
        passive: false,
      })
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", preventScroll)
        scrollContainer.removeEventListener("touchmove", preventScroll)
      }
    }
  }, [])

  return (
    <div className="container">
      <div
        ref={scrollRef}
        className="scroll-container no-scroll bg-blend-normal"
      >
        <div className="scroll-content bg-blend-normal">
          {[...img, ...img].map((value, index) => (
            <Show img={value} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner
