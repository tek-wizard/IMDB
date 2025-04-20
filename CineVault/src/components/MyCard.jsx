import {
  Card,
  CardFooter,
  Image,
  Button,
  CardBody,
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Listbox,
  ListboxItem,
  Input,
} from "@heroui/react"
import Genre from "./Genre"
import { Context } from "./Context.jsx"
import { useState, useContext, useEffect } from "react"
import snoringPanda from "../assets/Images/snoringPanda.png"
import {
  PlayIconSVG,
  ThreeDotsSVG,
  StarSVG,
  HeartSVG,
  BookmarkSVG,
  ListSVG,
  ShareSVG,
  PlusSVG,
  TickSVG,
  UpArrowSVG,
} from "./SVG.jsx"
import TrailerModal from "./TrailerModal.jsx"
import { InfoModal } from "./InfoModal.jsx"

export const Rating = ({ rating, outOf = false }) => (
  <h1 className="flex items-center gap-2 inline">
    <StarSVG />
    <p style={{ position: "relative", top: "3px", left: "-6px" }} className="font-bold">
      {rating.toFixed(1)}
      {outOf && " / 10"}
    </p>
  </h1>
)

export const NotFound = ({message , size}) => (
  <>
  <div className="flex justify-center mt-4">
    <img src={snoringPanda} alt="ZZZ Logo" width={size} />
  </div>
  <p className="ml-[20px]">{message}</p>
  </>

)

export const CollectionModal = ({
  isOpen,
  onOpenChange,
  InCollection,
  HandleInCollection,
  Info,
  movieName,
}) => {
  const [inputFieldOpen, setInputFieldOpen] = useState(false)
  const [input, setInput] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (input.trim() !== "") {
      Info.addCollections(input)
      setInput("")
      setInputFieldOpen(false)
      setSubmitted(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm" placement="center" >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-display text-[1.5rem] ">
              All Collections:
            </ModalHeader>
            <ModalBody>
              {Object.keys(Info.AllCollections).length > 0 ? (
                <Listbox
                  aria-label="Collections"
                  selectedKeys={[...InCollection]}
                  onSelectionChange={HandleInCollection}
                >
                  {Object.entries(Info.AllCollections).map(([collectionKey, collection]) => (
                    <ListboxItem
                      key={collectionKey}
                      textValue={collection.name}
                      className={`!outline-none !ring-0 !shadow-none ${
                        InCollection.has(collectionKey)
                          ? "!bg-green-200"
                          : "!bg-transparent"
                      }`}
                      onPress={() => HandleInCollection(collectionKey, movieName)}
                      hideSelectedIcon={true}
                    >
                      <div className="relative flex gap-2 items-center">
                        <span className="text-small">{collection.name}</span>
                        <span className="text-tiny text-default-400">
                          Created on: {collection.creationDate}
                        </span>
                        {InCollection.has(collectionKey) && (
                          <div className="absolute right-2">
                            <TickSVG />
                          </div>
                        )}
                      </div>
                    </ListboxItem>
                  ))}
                </Listbox>
              ) : (
                <>
                  <NotFound message={"No collections available."} size={"70"}/>
                  
                </>
              )}
              {inputFieldOpen && (
                <>
                  <Divider />
                  <Input
                    description={
                      input.trim() === "" && submitted ? (
                        <p className="text-red-500">Collection name cannot be empty</p>
                      ) : (
                        <p>Example: Action Movies, Retro & Nostalgic, Spicy</p>
                      )
                    }
                    label="Collection Name"
                    labelPlacement="outside-left"
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    endContent={
                      <Button
                        className="w-7 h-7 p-1 min-w-0 flex items-center justify-center rounded-full text-sm hover:bg-blue-500 bg-blue-200"
                        onPress={() => {
                          setSubmitted(true)
                          handleSubmit()
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            setSubmitted(true)
                            handleSubmit()
                          }
                        }}
                      >
                        <UpArrowSVG />
                      </Button>
                    }
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                isPressable
                variant="bordered"
                className="w-10 h-10 flex items-center justify-center rounded-full p-0 min-w-0 hover:border-green-500 hover:text-green-50"
                onPress={() => setInputFieldOpen((prev) => !prev)}
              >
                <PlusSVG />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}



const LikeDropdown = ({
  liked,
  setLiked,
  bookmarked,
  setBookmarked,
  movieObj,
  Info,
  InCollection,
  HandleInCollection,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const inCollection = InCollection.size > 0

  return (
    <>
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full p-0 min-w-0 hover:border-blue-500 hover:text-blue-500"
          >
            <ThreeDotsSVG className="w-3 h-3" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            textValue="favourite"
            key="favourite"
            className="hover:!bg-rose-200"
            onPress={() => {
              Info.handleFavourites(movieObj)
              setLiked((prev) => !prev)
            }}
          >
            <HeartSVG liked={liked} />
            <p className="inline relative top-[1px]">
              {liked ? "In Favourites" : "Add to Favourites"}
            </p>
          </DropdownItem>
          <DropdownItem
            textValue="watchlist"
            key="watchlist"
            className="hover:!bg-blue-200"
            onPress={() => {
              Info.handleWatchlist(movieObj)
              setBookmarked((prev) => !prev)
            }}
          >
            <BookmarkSVG bookmarked={bookmarked} />
            <p className="inline relative top-[1px]">
              {bookmarked ? "In Watchlist" : "Add to Watchlist"}
            </p>
          </DropdownItem>
          <DropdownItem
            textValue="collection"
            key="collection"
            className={`hover:!bg-green-200 ${isOpen ? "bg-green-200" : ""}`}
            onPress={onOpen}
            closeOnSelect={true}
          >
            <ListSVG inCollection={inCollection} />
            <p className="inline relative top-[1px]">
              {inCollection ? "In Collection" : "Add to a Collection"}
            </p>
          </DropdownItem>
          <DropdownItem textValue="share" key="share" className="hover:!bg-violet-200">
            <ShareSVG />
            <p className="inline relative top-[1px]">Share</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <CollectionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        InCollection={InCollection}
        HandleInCollection={HandleInCollection}
        Info={Info}
        movieName={movieObj.title}
      />
    </>
  )
}



export const Popularity = ({ popularity, maxPopularity }) => (
  <Tooltip content="Relative To The Most Popular" placement="top" className="text-gray-700 bg-transparent" delay={1000} offset={-11}>
    <Progress
      classNames={{
        base: "max-w-md",
        indicator: "bg-gradient-to-r from-rose-600 to-pink-300",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Popularity"
      radius="sm"
      showValueLabel={true}
      size="sm"
      value={Math.floor((popularity / maxPopularity) * 100)}
      className="absolute bottom-[10px]"
    />
  </Tooltip>
)

export default function Mycard({ movieObj, maxPopularity }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const Info = useContext(Context)
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [InCollection, setInCollection] = useState(new Set())
  const [trailerKey, setTrailerKey] = useState("")

  const {
    isOpen: isTrailerOpen,
    onOpen: onTrailerOpen,
    onOpenChange: onTrailerOpenChange,
  } = useDisclosure()

  useEffect(() => {
    const isBookmarked = Info.watchlist.some((movie) => movie.id === movieObj.id)
    setBookmarked(isBookmarked)
  }, [Info.watchlist, movieObj])

  const HandleInCollection = (collectionkey, movieName) => {
    setInCollection((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(collectionkey)) {
        Info.removeFromCollection(collectionkey, movieName)
        newSet.delete(collectionkey)
      } else {
        Info.addToCollection(collectionkey, movieName)
        newSet.add(collectionkey)
      }
      return newSet
    })
  }

  useEffect(() => {
    if (isTrailerOpen) {
      Info.MovieVideos(movieObj.id).then((response) => {
        const videos = response.data.results || []
        console.log("🎬 Videos for:", movieObj.title, videos)
        const trailer =
          videos.find(
            (v) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true
          ) ||
          videos.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) || null
  
        setTrailerKey(trailer?.key || "")
      })
    }
  }, [isTrailerOpen, movieObj.id, Info])
  

  return (
    <Card
      isFooterBlurred
      isPressable
      className="border-none rounded-b-[1rem] rounded-tr-[1rem] w-[200px] h-[500px]"
      radius="none"
      onPress={onOpen}
    >
      <Image
        alt={movieObj.title}
        className="object-cover hover:brightness-50"
        radius="none"
        height={300}
        width={200}
        src={
          movieObj.poster_path
            ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}`
            : "/fallback-image.jpg"
        }
      />

      <CardBody className="flex flex-col justify-between h-full">
        <div className="flex flex-col flex-grow">
          <div className="w-full relative">
            <Rating rating={movieObj.vote_average} />
            <LikeDropdown
              movieObj={movieObj}
              Info={Info}
              bookmarked={bookmarked}
              setBookmarked={setBookmarked}
              liked={liked}
              setLiked={setLiked}
              InCollection={InCollection}
              HandleInCollection={HandleInCollection}
            />
          </div>
          <Spacer y={2} />
          <h1 style={{ fontFamily: "lora" }} className="text-wrap">
            {movieObj.title}
          </h1>
        </div>

        <div className="mt-auto flex justify-center relative top-[5px]">
          <Button
            color="primary"
            variant="light"
            startContent={<PlayIconSVG />}
            className="text-[17px]"
            radius="full"
            onPress={onTrailerOpen}
          >
            <p className="relative left-[-5px] top-[2px]">Trailer</p>
          </Button>
        </div>

        <InfoModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          movieObj={movieObj}
          maxPopularity={maxPopularity}
        />

        <TrailerModal
          isTrailerOpen={isTrailerOpen}
          onTrailerOpenChange={onTrailerOpenChange}
          trailerKey={trailerKey}
        />
      </CardBody>
    </Card>
  )
}
