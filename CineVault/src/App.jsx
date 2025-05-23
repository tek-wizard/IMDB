import { useEffect, useState } from "react"
import MyNav from "./components/MyNav"
import Banner from "./components/Banner"
import Popular from "./components/Popular"
import { Context } from "./components/Context"
import { addToast } from "@heroui/toast"
import Watchlist from "./components/Watchlist"
import FromWatchlist from "./components/FromWatchlist"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import TopRated from "./components/TopRated"
import axios from "axios"
import "./App.css"
import { Spacer } from "@heroui/react"
import Recommendation from "./components/Recommendation"
import MovieDetail from "./components/MovieDetail"
import Favorites from "./components/Favorites"

function App() {
  const [Favourites, setFavourites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites")
    return storedFavorites ? JSON.parse(storedFavorites) : [] // Ensure default is empty array
  })

  const [watchlist, setWatchlist] = useState(() => {
    let storedwatchlist = localStorage.getItem("watchlist")
    if (!storedwatchlist) return []
    return JSON.parse(storedwatchlist)
  })

  const [Collections, setCollections] = useState({})
  const [movieVideos, setMovieVideos] = useState([])
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const handleSignup = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
    addToast({
      title: `Welcome, ${user.username}!`,
      color: "success",
      timeout: "4000",
    })
  }

  useEffect(() => {
    const stored = localStorage.getItem("collections")
    if (stored) {
      const parsed = JSON.parse(stored)
      const hydrated = Object.fromEntries(
        Object.entries(parsed).map(([key, value]) => [
          key,
          { ...value, movies: new Set(value.movies) },
        ])
      )
      setCollections(hydrated)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Favourites))
  }, [Favourites])

  useEffect(() => {
    const serializable = Object.fromEntries(
      Object.entries(Collections).map(([key, value]) => [
        key,
        { ...value, movies: Array.from(value.movies) },
      ])
    )
    localStorage.setItem("collections", JSON.stringify(serializable))
  }, [Collections])

  function handleFavourites(movieObj) {
    if (!Favourites.some((element) => element.id === movieObj.id)) {
      setFavourites((prev) => [...prev, movieObj])
      addToast({
        title: `Movie added in Favourites`,
        color: "success",
        timeout: "4000",
      })
    } else {
      setFavourites((prev) =>
        prev.filter((element) => element.id !== movieObj.id)
      )
      addToast({
        title: `Movie removed from Favourites`,
        color: "success",
        timeout: "4000",
      })
    }
  }

  function handleWatchlist(movieObj) {
    let updatedWatchlist = []
    if (!watchlist.some((element) => element.id === movieObj.id)) {
      updatedWatchlist = [...watchlist, movieObj]
      setWatchlist(updatedWatchlist)
      addToast({
        title: `Movie added in Watchlist`,
        color: "success",
        timeout: "4000",
      })
    } else {
      updatedWatchlist = watchlist.filter(
        (element) => element.id !== movieObj.id
      )
      setWatchlist(updatedWatchlist)
      addToast({
        title: `Movie removed from Watchlist`,
        color: "success",
        timeout: "4000",
      })
    }
  }

  function addCollections(collectionName) {
    const key = collectionName.toLowerCase().replace(/\s/g, "")
    const name = collectionName.replace(/\s+/g, " ").trim()
    const date = new Date().toISOString()

    setCollections((prev) => {
      if (prev[key]) {
        addToast({
          title: `Collection Name: ${name} already exists`,
          color: "danger",
          timeout: "4000",
        })
        return prev
      }

      addToast({
        title: "New Collection Added",
        color: "success",
        timeout: "4000",
      })

      return {
        ...prev,
        [key]: {
          name: name,
          creationDate: date.substring(0, 10),
          movies: new Set(),
        },
      }
    })
  }

  function addToCollection(collectionKey, movieObj) {
    const key = collectionKey
    setCollections((prev) => {
      const updatedMovies = new Set(prev[key]?.movies || [])
      updatedMovies.add(movieObj.id)

      return {
        ...prev,
        [key]: {
          ...prev[key],
          movies: updatedMovies,
        },
      }
    })

    addToast({
      title: `Movie added in the Collection`,
      color: "success",
      timeout: "4000",
    })
  }

  function removeFromCollection(collectionKey, movieObj) {
    const key = collectionKey
    setCollections((prev) => {
      const newMovies = new Set(prev[key].movies)
      newMovies.delete(movieObj.id)

      return {
        ...prev,
        [key]: {
          ...prev[key],
          movies: newMovies,
        },
      }
    })

    addToast({
      title: `Movie removed from the Collection`,
      color: "success",
      timeout: "4000",
    })
  }

  function RemoveCollections(collectionName) {
    const key = collectionName.toLowerCase().replace(/\s/g, "")
    setCollections((prev) => {
      const latest = { ...prev }
      delete latest[key]
      return latest
    })

    addToast({
      title: "Collection Removed",
      color: "success",
      timeout: "4000",
    })
  }

  async function MovieVideos(movieId) {
    try {
      const movieVideos = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e7ab7217c6e7f635c3bc6191429655c8`
      )
      return movieVideos
    } catch {
      console.log("error")
      return []
    }
  }

  const Info = {
    handleWatchlist,
    handleFavourites,
    addToCollection,
    removeFromCollection,
    RemoveCollections,
    addCollections,
    MovieVideos,
    movieVideos,
    AllCollections: Collections,
    watchlist,
    user,
    setUser, // Pass setUser to context
    Favourites: Favourites || [], // Ensure favorites is never undefined
  }

  return (
    <Context.Provider value={Info}>
      <BrowserRouter>
        <MyNav onSignup={handleSignup} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Popular />
                <FromWatchlist />
                <Spacer y={40} />
                <TopRated />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} />}
          />
          <Route
            path="/recommendation"
            element={<Recommendation watchlist={watchlist} />}
          />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App

// `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e7ab7217c6e7f635c3bc6191429655c8`
