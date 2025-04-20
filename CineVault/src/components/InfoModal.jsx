import React, { useEffect, useState } from "react"
import { Modal, ModalContent, ModalBody, Image, Spacer } from "@heroui/react"
import { Rating } from "./MyCard" // Adjust import path based on your project structure
import Genre from "./Genre"
import { Popularity } from "./MyCard"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function InfoModal({ isOpen, onOpenChange, movieObj, maxPopularity }) {
  const [fullImg, setFullImg] = useState(true)

  useEffect(() => {
    if (!isOpen) {
      setFullImg(false)
    }
  }, [isOpen])

  const date = new Date(movieObj?.release_date || Date.now())

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        <ModalBody>
          <div className={`flex ${fullImg ? "justify-center" : ""}`}>
            <div onClick={() => setFullImg((prev) => !prev)} className="cursor-pointer">
              <Image
                className={`object-cover transition-all duration-300 ease-in-out`}
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
                    {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                  </p>
                  <Genre genres={movieObj?.genre_ids || []} />
                  <Popularity popularity={movieObj?.popularity} maxPopularity={maxPopularity} />
                </div>
              </>
            )}
          </div>
          {!fullImg && (
            <p className="m-[10px] text-gray-700">
              {movieObj?.overview || "No overview available for this movie."}
            </p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
