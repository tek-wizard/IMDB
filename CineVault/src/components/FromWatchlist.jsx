import React, { useContext, useRef, useState, useEffect } from "react"
import { Context } from "./Context"
import { Card, Image, Button, useDisclosure } from "@heroui/react"
import { PlayCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import TrailerModal from "./TrailerModal"
import { InfoModal } from "./InfoModal"

function MyCard({ movieObj, index, onClick, maxPopularity }) {
  return (
    <Card
      isFooterBlurred
      className="border-none rounded-b-[1rem] rounded-tr-[1rem] w-[233px] h-[350px]"
      onClick={() => onClick(index)}
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

function Description({ movieObj, onOpenTrailer, onOpenInfo }) {
  const posterPath = movieObj?.poster_path
  const bgImage = `url(${
    posterPath
      ? `https://image.tmdb.org/t/p/original/${posterPath}`
      : "/fallback-image.jpg"
  })`

  return (
    <div className="relative min-h-[30rem] overflow-hidden border-none rounded-tr-[1rem] rounded-br-[1rem] lg:min-h-[30rem] sm:min-h-[20rem]">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105 brightness-[0.5]"
        style={{ backgroundImage: bgImage, zIndex: 0 }}
      />
      <div className="relative z-10 flex flex-col justify-center h-full px-12">
        <div className="space-y-6 mt-[10%]">
          <h2 className="text-5xl font-extrabold leading-tight text-white drop-shadow-xl sm:text-3xl lg:text-5xl">
            {movieObj?.title}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed max-w-xl line-clamp-4 sm:text-base sm:line-clamp-3 lg:text-lg lg:line-clamp-4">
            {movieObj?.overview || "No description available for this movie."}
          </p>
          <div className="flex gap-3 lg:gap-6">
            <Button
              variant="light"
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-md hover:bg-white/20 flex items-center gap-3"
              onClick={onOpenTrailer}
            >
              <PlayCircle size={18} />
              Trailer
            </Button>
            <Button
              variant="light"
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-md hover:bg-white/20 flex items-center gap-3"
              onClick={onOpenInfo}
            >
              Details
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FromWatchlist() {
  const { watchlist, MovieVideos } = useContext(Context)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInfoOpen, setInfoOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState("")
  const scrollRef = useRef(null)

  const {
    isOpen: isTrailerOpen,
    onOpen: onTrailerOpen,
    onOpenChange: setTrailerOpen,
  } = useDisclosure()

  const currentMovie = watchlist[currentIndex]

  useEffect(() => {
    if (isTrailerOpen && currentMovie?.id) {
      MovieVideos(currentMovie.id).then((response) => {
        const videos = response.data.results || []

        const trailer =
          videos.find(
            (v) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true
          ) ||
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          null

        setTrailerKey(trailer?.key || "")
      })
    }
  }, [isTrailerOpen, currentMovie?.id, MovieVideos])

  const handleCardClick = (index) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      const cardElement = scrollRef.current.children[index]
      cardElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0)
      if (scrollRef.current) {
        const cardElement = scrollRef.current.children[newIndex]
        cardElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return newIndex
    })
  }

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, watchlist.length - 1)
      if (scrollRef.current) {
        const cardElement = scrollRef.current.children[newIndex]
        cardElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return newIndex
    })
  }

  if (watchlist.length === 0) {
    return null
  }

  return (
    <>
      <h1 className="w-full text-center text-white text-3xl font-display sm:text-2xl lg:text-3xl">
        Your Watchlist
      </h1>
      <div className="bg-none h-[30rem] w-full flex">
        <div className="inline-block h-[30rem] w-full lg:w-[65%] min-w-0">
          <Description
            movieObj={currentMovie}
            onOpenTrailer={onTrailerOpen}
            onOpenInfo={() => setInfoOpen(true)}
          />
        </div>

        {/* Hide cards section on mobile */}
        <div className="relative flex items-center justify-center h-full hidden sm:flex">
          <div
            className="overflow-hidden relative flex justify-center items-center"
            style={{ marginLeft: "-60px" }}
          >
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-1"
              style={{
                scrollSnapType: "x mandatory",
                width: "calc(233px * 2 + 1rem)",
                paddingLeft: "60px",
              }}
              ref={scrollRef}
            >
              {watchlist.map((movie, index) => (
                <div
                  key={index}
                  style={{ scrollSnapAlign: "start", flex: "0 0 auto" }}
                >
                  <MyCard
                    movieObj={movie}
                    index={index}
                    onClick={handleCardClick}
                    maxPopularity={Math.max(
                      ...watchlist.map((movie) => movie.popularity || 0),
                      0
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hide navigation buttons on mobile */}
        <div className="flex-col justify-center gap-4 ml-4 hidden sm:flex">
          <Button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 border border-white/20 disabled:opacity-30"
            isIconOnly
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </Button>
          <Button
            onClick={scrollRight}
            disabled={currentIndex === watchlist.length - 1}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 border border-white/20 disabled:opacity-30"
            isIconOnly
          >
            <ChevronRight className="text-white w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-center gap-4 mt-4 sm:hidden">
        <Button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 border border-white/20 disabled:opacity-30"
          isIconOnly
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </Button>
        <Button
          onClick={scrollRight}
          disabled={currentIndex === watchlist.length - 1}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 border border-white/20 disabled:opacity-30"
          isIconOnly
        >
          <ChevronRight className="text-white w-5 h-5" />
        </Button>
      </div>

      <TrailerModal
        isTrailerOpen={isTrailerOpen}
        onTrailerOpenChange={setTrailerOpen}
        trailerKey={trailerKey}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onOpenChange={setInfoOpen}
        movieObj={currentMovie}
      />
    </>
  )
}

export default FromWatchlist
