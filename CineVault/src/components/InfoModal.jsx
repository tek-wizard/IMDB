import React, { useEffect, useState } from "react"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
  Spacer,
  Button,
} from "@heroui/react"
import { Rating } from "./MyCard"
import Genre from "./Genre"
import { Popularity } from "./MyCard"
import { useNavigate } from "react-router-dom"
import { PlayCircle, ArrowRight } from "lucide-react" // Changed to lucide icons

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function InfoModal({ isOpen, onOpenChange, movieObj, maxPopularity }) {
  const [fullImg, setFullImg] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) {
      setFullImg(false)
    }
  }, [isOpen])

  const date = new Date(movieObj?.release_date || Date.now())

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className={`flex ${fullImg ? "justify-center" : ""}`}>
                <div
                  onClick={() => setFullImg((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <Image
                    className="object-cover transition-all duration-300 ease-in-out"
                    radius="lg"
                    height={fullImg ? 900 : 300}
                    width={fullImg ? 600 : 200}
                    src={
                      movieObj?.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}`
                        : "/fallback-image.jpg"
                    }
                  />
                </div>

                {!fullImg && (
                  <>
                    <Spacer x={4} />
                    <div className="w-[500px] relative">
                      <h1 className="font-display text-[30px]">
                        {movieObj?.title}
                        <span className="ml-[15px] text-gray-400 text-[80%]">
                          ({date.getFullYear()})
                        </span>
                      </h1>
                      <Spacer y={3} />
                      <Rating rating={movieObj?.vote_average} outOf />
                      <Spacer y={2} />
                      <p className="text-gray-600">
                        {months[date.getMonth()]} {date.getDate()},{" "}
                        {date.getFullYear()}
                      </p>
                      <Genre genres={movieObj?.genre_ids || []} />
                      <Popularity
                        popularity={movieObj?.popularity}
                        maxPopularity={maxPopularity}
                      />
                    </div>
                  </>
                )}
              </div>
              {!fullImg && (
                <p className="m-[10px] text-gray-700">
                  {movieObj?.overview ||
                    "No overview available for this movie."}
                </p>
              )}
            </ModalBody>
            {!fullImg && (
              <ModalFooter>
                <Button
                  className="bg-transparent hover:bg-black/5 text-default-700 border-none flex-1 font-medium gap-2 py-6"
                  variant="light"
                  onPress={() => {
                    onClose()
                    navigate(`/movie/${movieObj.id}`)
                  }}
                >
                  View Details
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
