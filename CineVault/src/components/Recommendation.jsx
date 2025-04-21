import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import {
  Button,
  Image,
  Chip,
  Progress,
  Tooltip,
  ScrollShadow,
} from "@heroui/react"
import { PlayCircle, Star, TrendingUp, Award, Clock, Plus } from "lucide-react"
import { NotFound } from "./MyCard"
import { genreids } from "../utilities/genre"
import { useNavigate } from "react-router-dom"

const MovieRecommendation = ({ movie }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-none w-[350px] bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 group hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30">
          <Star className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-white/90 text-sm font-medium">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            isIconOnly
            className="bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black w-8 h-8"
            size="sm"
            variant="flat"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            isIconOnly
            className="bg-black/50 backdrop-blur-md text-white hover:bg-amber-400 hover:text-black w-8 h-8"
            size="sm"
            variant="flat"
          >
            <PlayCircle className="w-4 h-4" />
          </Button>
        </div>

        {/* Release Year */}
        <span className="absolute bottom-4 right-4 text-sm text-white/70 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
          {new Date(movie.release_date).getFullYear()}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-title font-semibold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {movie.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-2 mb-3 group-hover:text-gray-300 transition-colors">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-2">
          {movie.genre_ids.slice(0, 3).map((genreId) => (
            <Chip
              key={genreId}
              size="sm"
              variant="flat"
              className="bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer px-2 py-1 text-xs"
            >
              {genreids[genreId]}
            </Chip>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const RecommendationSection = ({ title, movies, type }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      {type === "trending" && <TrendingUp className="w-6 h-6 text-amber-400" />}
      {type === "top" && <Award className="w-6 h-6 text-amber-400" />}
      {type === "newest" && <Clock className="w-6 h-6 text-amber-400" />}
      <h2 className="text-2xl font-heading text-white">{title}</h2>
    </div>

    <ScrollShadow hideScrollBar className="w-full">
      <div className="flex gap-6 pb-6">
        {movies.map((movie) => (
          <MovieRecommendation key={movie.id} movie={movie} />
        ))}
      </div>
    </ScrollShadow>
  </div>
)

export default function Recommendation({ watchlist }) {
  const [recommendations, setRecommendations] = useState({
    trending: [],
    topRated: [],
    newest: [],
  })

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const apiKey = "e7ab7217c6e7f635c3bc6191429655c8" // Move this to .env later
        const movieIds = watchlist.map((movie) => movie.id)
        let allRecommendations = []

        // First get recommendations for each movie
        const recommendationPromises = movieIds.map((movieId) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
            {
              params: {
                api_key: apiKey,
                language: "en-US",
                page: 1,
              },
            }
          )
        )

        const responses = await Promise.all(recommendationPromises)
        responses.forEach((response) => {
          if (response.data?.results) {
            allRecommendations.push(...response.data.results)
          }
        })

        // Remove duplicates and sort
        const uniqueRecommendations = [
          ...new Map(
            allRecommendations.map((movie) => [movie.id, movie])
          ).values(),
        ]

        setRecommendations({
          trending: uniqueRecommendations
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10),
          topRated: uniqueRecommendations
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 10),
          newest: uniqueRecommendations
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, 10),
        })
      } catch (error) {
        console.error("Error fetching recommendations:", error)
        // Add fallback data or error state handling
        setRecommendations({
          trending: [],
          topRated: [],
          newest: [],
        })
      }
    }

    if (watchlist?.length > 0) {
      fetchRecommendations()
    }
  }, [watchlist])

  if (!watchlist?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <NotFound
          message="Add movies to your watchlist to get personalized recommendations"
          size={200}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading text-white mb-12">
          Recommended for You
        </h1>

        <RecommendationSection
          title="Trending Now"
          movies={recommendations.trending}
          type="trending"
        />

        <RecommendationSection
          title="Top Rated Picks"
          movies={recommendations.topRated}
          type="top"
        />

        <RecommendationSection
          title="Latest Releases"
          movies={recommendations.newest}
          type="newest"
        />
      </div>
    </div>
  )
}
