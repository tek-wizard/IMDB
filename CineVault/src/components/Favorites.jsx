import React, { useContext, useState } from "react"
import { Context } from "./Context"
import { motion, AnimatePresence } from "framer-motion"
import { Button, Input, Chip } from "@heroui/react"
import { NotFound } from "./MyCard"
import { genreids } from "../utilities/genre"
import {
  Grid2x2,
  List,
  SlidersHorizontal,
  Search,
  Calendar,
  Star,
  Heart,
  Trash2,
} from "lucide-react"

// Copy StatCard component from Watchlist
const StatCard = ({ title, value, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-black border border-purple-500/5 rounded-lg">
    <div className="text-red-500/80">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm font-title tracking-wide">{title}</p>
      <p className="text-white text-xl font-display">{value}</p>
    </div>
  </div>
)

// Add SortOptions component from Watchlist
const SortOptions = ({ isOpen, sortKey, onSort }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="flex gap-2 ml-4">
          <SortOption
            icon={Calendar}
            label="Date"
            isActive={sortKey === "date"}
            onClick={() => onSort(sortKey === "date" ? "" : "date")}
          />
          <SortOption
            icon={Star}
            label="Rating"
            isActive={sortKey === "rating"}
            onClick={() => onSort(sortKey === "rating" ? "" : "rating")}
          />
          <SortOption
            icon={Search}
            label="Title"
            isActive={sortKey === "title"}
            onClick={() => onSort(sortKey === "title" ? "" : "title")}
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Add SortOption component from Watchlist
const SortOption = ({ icon: Icon, label, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-2 rounded-lg w-full
      transition-colors duration-200 font-title tracking-wide
      ${
        isActive
          ? "bg-purple-900/30 text-red-500 border border-red-500/20"
          : "text-gray-400 hover:bg-black/40 hover:text-white"
      }
    `}
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
    {isActive && (
      <div className="ml-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
      </div>
    )}
  </motion.button>
)

// Add Filters component from Watchlist
const Filters = ({ onSortChange, onSearch, view, setView, sortKey }) => {
  const [showSortOptions, setShowSortOptions] = useState(false)

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-xl p-4 mb-8 shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Input
              placeholder="Search favorites..."
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="w-full md:w-64 bg-black/50 border-purple-500/20"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Button
              className={`
                bg-black/50 border border-purple-500/20 
                flex items-center gap-2 px-3 py-2
                transition-colors duration-200
                ${sortKey ? "text-red-500 border-red-500/50" : "text-gray-400"}
                hover:bg-black/70
              `}
              variant="bordered"
              onPress={() => setShowSortOptions(!showSortOptions)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-1">
            <Button
              isIconOnly
              variant={view === "grid" ? "solid" : "light"}
              className={
                view === "grid"
                  ? "bg-purple-900/50 text-red-500 border border-purple-500/30"
                  : "text-gray-400 hover:text-white"
              }
              onPress={() => setView("grid")}
            >
              <Grid2x2 className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              variant={view === "list" ? "solid" : "light"}
              className={
                view === "list"
                  ? "bg-purple-900/50 text-red-500 border border-purple-500/30"
                  : "text-gray-400 hover:text-white"
              }
              onPress={() => setView("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <SortOptions
          isOpen={showSortOptions}
          sortKey={sortKey}
          onSort={(key) => {
            onSortChange(key)
            if (!key) setShowSortOptions(false)
          }}
        />
      </div>
    </div>
  )
}

// Add MovieCard component
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
          <h3 className="text-lg font-title font-semibold text-white mb-2 tracking-wide">
            {movie.title}
          </h3>
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.slice(0, 2).map((genre) => (
              <Chip
                key={genre}
                size="sm"
                className="bg-black border border-purple-500/20 text-gray-400 text-xs font-body"
              >
                {genre}
              </Chip>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-red-500/80" />
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
        <h3 className="text-lg font-title font-semibold text-white mb-2 tracking-wide">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm font-body line-clamp-2">
          {movie.overview}
        </p>
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

// Copy StatCard and WatchlistStats components but modify for Favorites
const FavoriteStats = ({ favorites }) => (
  <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/10 mb-8 shadow-xl">
    <h1 className="text-4xl font-heading text-white mb-6 tracking-wider">
      Your Favorites
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Movies"
        value={favorites.length}
        icon={<Heart className="w-5 h-5" />}
      />
      <StatCard
        title="Average Rating"
        value={`${(
          favorites.reduce((acc, movie) => acc + movie.vote_average, 0) /
            favorites.length || 0
        ).toFixed(1)}/10`}
        icon={<Star className="w-5 h-5" />}
      />
      <StatCard
        title="Watch Time"
        value={`${Math.round(favorites.length * 2.5)}h`}
        icon={<Calendar className="w-5 h-5" />}
      />
    </div>
  </div>
)

export default function Favorites() {
  const { Favourites: favorites = [], handleFavourites } = useContext(Context) // Provide default empty array
  const [view, setView] = useState("grid")
  const [sortKey, setSortKey] = useState("date")
  const [searchQuery, setSearchQuery] = useState("")

  const handleRemove = (movieId) => {
    const movieToRemove = favorites.find((m) => m.id === movieId)
    if (movieToRemove) {
      handleFavourites(movieToRemove)
    }
  }

  const sortMovies = (movies) => {
    if (!sortKey) return movies

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

  const filteredMovies = (favorites || []).filter((movie) =>
    movie?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedMovies = sortMovies(filteredMovies)

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-black p-8">
        <div className="max-w-6xl mx-auto text-center">
          <NotFound
            message={
              <span className="font-title text-lg text-white">
                Your favorites list is empty. Start adding some movies!
              </span>
            }
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
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900/10 to-black"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
      }}
    >
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <FavoriteStats favorites={favorites} />
        <Filters
          onSortChange={setSortKey}
          onSearch={setSearchQuery}
          view={view}
          setView={setView}
          sortKey={sortKey}
        />
        <div
          className={`
          ${
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
          relative
        `}
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
