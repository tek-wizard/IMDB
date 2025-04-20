import React, { useEffect, useState } from "react"
import axios from "axios"
import MyCard from "./MyCard"

const Recommendation = ({ watchlist }) => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_KEY = "e7ab7217c6e7f635c3bc6191429655c8" // Replace with your TMDb API key
  const BASE_URL = "https://api.themoviedb.org/3"

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)

      // Getting movie IDs from the watchlist
      const movieIds = watchlist.map((movie) => movie.id)

      // Fetch recommendations from TMDb API for each movie
      const recommendations = []
      for (const movieId of movieIds) {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
        )

        recommendations.push(...response.data.results)
      }

      // Set recommendations state
      setRecommendations(recommendations)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch recommendations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (watchlist?.length > 0) {
      fetchRecommendations()
    }
  }, [watchlist])

  if (loading) return <div>Loading recommendations...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (recommendations.length === 0)
    return <div>No recommendations available.</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Recommended Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map((movie) => (
          <MyCard
            key={movie.id}
            movieObj={movie}
            maxPopularity={Math.max(
              ...recommendations.map((rec) => rec.popularity || 0),
              0
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default Recommendation
