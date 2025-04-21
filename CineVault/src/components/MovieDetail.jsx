import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { Context } from "./Context"
import { Button, Image, Chip, Tooltip, Progress, Divider } from "@heroui/react"
import {
  Heart,
  Bookmark,
  List,
  Share2,
  Star,
  Clock,
  Calendar,
  User2,
  Film,
  Award,
  ThumbsUp,
} from "lucide-react"

const CastMember = ({ member }) => (
  <div className="flex flex-col items-center gap-2 min-w-[150px]">
    <Image
      src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
      alt={member.name}
      className="w-24 h-24 rounded-full object-cover"
      fallback={<User2 className="w-24 h-24 p-6 bg-black/40 rounded-full" />}
    />
    <div className="text-center">
      <p className="text-white font-title text-sm">{member.name}</p>
      <p className="text-gray-400 text-xs">{member.character}</p>
    </div>
  </div>
)

const CrewMember = ({ member }) => (
  <div className="flex items-center gap-4 min-w-[200px]">
    <User2 className="w-10 h-10 p-2 bg-black/40 rounded-full text-amber-400" />
    <div>
      <p className="text-white font-title text-sm">{member.name}</p>
      <p className="text-gray-400 text-xs">{member.job}</p>
    </div>
  </div>
)

export default function MovieDetail() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [credits, setCredits] = useState(null)
  const [videos, setVideos] = useState([])
  const Info = useContext(Context)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=e7ab7217c6e7f635c3bc6191429655c8`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e7ab7217c6e7f635c3bc6191429655c8`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e7ab7217c6e7f635c3bc6191429655c8`
          ),
        ])
        setMovie(movieData.data)
        setCredits(creditsData.data)
        setVideos(videosData.data.results)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }
    fetchMovieDetails()
  }, [movieId])

  if (!movie || !credits) return null

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section with Backdrop */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgb(0,0,0)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto flex gap-8">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block w-64 h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <h1 className="text-4xl font-heading text-white mb-2">
                {movie.title}
                <span className="text-gray-400 ml-2">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-display text-xl">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <Divider orientation="vertical" className="bg-gray-700" />
                <div className="flex gap-2">
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      className="bg-black/30 text-gray-300 border border-gray-700"
                    >
                      {genre.name}
                    </Chip>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 font-body mb-6 max-w-2xl">
                {movie.overview}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Trailer Section */}
        {trailer && (
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-white mb-6">Trailer</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Cast Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading text-white mb-6">Top Cast</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {credits.cast.slice(0, 10).map((member) => (
              <CastMember key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Crew Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading text-white mb-6">Crew</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credits.crew
              .filter((member) =>
                ["Director", "Producer", "Screenplay", "Story"].includes(
                  member.job
                )
              )
              .map((member) => (
                <CrewMember
                  key={`${member.id}-${member.job}`}
                  member={member}
                />
              ))}
          </div>
        </section>

        {/* Details Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-heading text-white mb-6">Details</h2>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300">
                Release Date:{" "}
                {new Date(movie.release_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300">
                Runtime: {movie.runtime} minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300">Status: {movie.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300">
                Vote Count: {movie.vote_count}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-heading text-white mb-6">
              Production
            </h2>
            <div className="flex flex-wrap gap-4">
              {movie.production_companies.map(
                (company) =>
                  company.logo_path && (
                    <Tooltip key={company.id} content={company.name}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${company.logo_path}`}
                        alt={company.name}
                        className="h-12 object-contain bg-white/10 rounded-lg p-2"
                      />
                    </Tooltip>
                  )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
