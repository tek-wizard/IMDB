import React, { useContext, useState } from "react"
import { Context } from "./Context"
import { motion } from "framer-motion"
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Input,
} from "@heroui/react"
import { NotFound } from "./MyCard"
import { genreids } from "../utilities/genre"
import {
  Grid2x2,
  List,
  SlidersHorizontal,
  Search,
  Calendar,
  Star,
  Clock,
  Trash2,
} from "lucide-react"

const WatchlistStats = ({ watchlist }) => (
  <div className="bg-black p-8 rounded-xl border border-purple-500/10 mb-8">
    <h1 className="text-4xl font-bold text-white mb-6">Your Watchlist</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Movies"
        value={watchlist.length}
        icon={<Grid2x2 className="w-5 h-5" />}
      />
      <StatCard
        title="Average Rating"
        value={`${(
          watchlist.reduce((acc, movie) => acc + movie.vote_average, 0) /
            watchlist.length || 0
        ).toFixed(1)}/10`}
        icon={<Star className="w-5 h-5" />}
      />
      <StatCard
        title="Watch Time"
        value={`${Math.round(watchlist.length * 2.5)}h`}
        icon={<Clock className="w-5 h-5" />}
      />
    </div>
  </div>
)

const StatCard = ({ title, value, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-black border border-purple-500/5 rounded-lg">
    <div className="text-gold-400/80">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-xl font-semibold">{value}</p>
    </div>
  </div>
)

const MovieCard = ({ movie, onRemove, view }) => {
  const genres = movie.genre_ids.map((id) => genreids[id]).filter(Boolean)

  if (view === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black rounded-lg overflow-hidden group"
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[400px] object-cover transition-all duration-300 group-hover:brightness-50"
          />
          <Button
            isIconOnly
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white hover:text-red-400"
            variant="light"
            size="sm"
            onPress={() => onRemove(movie.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            {movie.title}
          </h3>
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.slice(0, 2).map((genre) => (
              <Chip
                key={genre}
                size="sm"
                className="bg-black border border-purple-500/20 text-gray-400 text-xs"
              >
                {genre}
              </Chip>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold-400/80" />
              <span className="text-gray-300">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-400 text-sm">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black rounded-lg p-4 flex gap-4 items-center border border-purple-500/5"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-20 h-30 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{movie.overview}</p>
      </div>
      <Button
        isIconOnly
        variant="light"
        size="sm"
        className="text-gray-400 hover:text-white"
        onPress={() => onRemove(movie.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  )
}

const Filters = ({ onSortChange, onSearch, view, setView }) => (
  <div className="flex flex-wrap gap-4 items-center mb-6 p-4">
    <Input
      placeholder="Search your watchlist..."
      startContent={<Search className="w-4 h-4 text-gray-400" />}
      className="w-full md:w-64 bg-black/50"
      onChange={(e) => onSearch(e.target.value)}
    />

    <div className="flex gap-2 ml-auto">
      <Button
        isIconOnly
        variant={view === "grid" ? "solid" : "light"}
        className="text-white"
        onPress={() => setView("grid")}
      >
        <Grid2x2 className="w-4 h-4" />
      </Button>
      <Button
        isIconOnly
        variant={view === "list" ? "solid" : "light"}
        className="text-white"
        onPress={() => setView("list")}
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  </div>
)

export default function Watchlist() {
  const { watchlist, handleWatchlist } = useContext(Context)
  const [view, setView] = useState("grid")
  const [sortKey, setSortKey] = useState("date")
  const [searchQuery, setSearchQuery] = useState("")

  const handleRemove = (movieId) => {
    const movieToRemove = watchlist.find((m) => m.id === movieId)
    if (movieToRemove) {
      handleWatchlist(movieToRemove)
    }
  }

  const sortMovies = (movies) => {
    switch (sortKey) {
      case "date":
        return [...movies].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        )
      case "rating":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average)
      case "title":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return movies
    }
  }

  const filteredMovies = watchlist.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedMovies = sortMovies(filteredMovies)

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <NotFound
            message="Your watchlist is empty. Start adding some movies!"
            size={150}
          />
          <Button
            color="primary"
            variant="shadow"
            size="lg"
            className="mt-6"
            as="a"
            href="/"
          >
            Discover Movies
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <WatchlistStats watchlist={watchlist} />

        <Filters
          onSortChange={setSortKey}
          onSearch={setSearchQuery}
          view={view}
          setView={setView}
        />

        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {sortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={handleRemove}
              view={view}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
