import React, { useContext, useState } from 'react'
import { AiOutlineTable, AiOutlineAppstoreAdd, AiFillPlayCircle } from 'react-icons/ai'
import ShowLists from './ShowLists'
import { Context } from './Context'

function Watchlist() {
  const { watchlist } = useContext(Context);
  const [isTableView, setIsTableView] = useState(false);

  const toggleView = () => {
    setIsTableView((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="h-[40vh] bg-gradient-to-r from-purple-700 via-blue-700 to-blue-500 w-full relative">
        <div className="absolute inset-x-8 top-16 md:left-20 md:top-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg">
            Your Watchlist
          </h1>
          <p className="text-lg md:text-xl mt-4 text-white/80 max-w-3xl">
            Discover and manage your favorite movies and shows. Easily add and track content you can't wait to watch!
          </p>
        </div>
      </div>

      {/* View Toggle Section */}
      <div className="flex justify-center mt-10 space-x-6">
        <button
          onClick={toggleView}
          className="flex items-center bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-400 hover:to-blue-400 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-lg"
        >
          {isTableView ? (
            <AiOutlineAppstoreAdd size={24} className="mr-2" />
          ) : (
            <AiOutlineTable size={24} className="mr-2" />
          )}
          {isTableView ? 'Switch to Grid View' : 'Switch to Table View'}
        </button>
      </div>

      {/* Watchlist Content */}
      {watchlist.length === 0 ? (
        <div className="text-center mt-16 text-gray-400 text-xl">
          <p>Your Watchlist is empty. Add some movies and start tracking your favorites!</p>
        </div>
      ) : isTableView ? (
        <div className="overflow-x-auto mt-10 mx-8">
          <table className="table-auto w-full text-left bg-gray-800 rounded-lg shadow-xl">
            <thead>
              <tr className="text-white bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500">
                <th className="py-4 px-6 text-xl">Title</th>
                <th className="py-4 px-6 text-xl">Overview</th>
                <th className="py-4 px-6 text-xl">Rating</th>
                <th className="py-4 px-6 text-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((movie, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-700 transition duration-300">
                  <td className="py-3 px-4 text-lg">{movie.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-300 line-clamp-2">{movie.overview}</td>
                  <td className="py-3 px-4 text-lg">{movie.vote_average}</td>
                  <td className="py-3 px-4">
                    <button className="bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-400 hover:from-purple-400 hover:via-indigo-300 hover:to-blue-300 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-8">
          {watchlist.map((movie, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl group">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-[300px] object-cover transition-transform transform group-hover:scale-105" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white truncate">{movie.title}</h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{movie.overview}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-yellow-400">{movie.vote_average}</span>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-md shadow-md group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-400">
                    <AiFillPlayCircle size={20} className="inline-block mr-2" />
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist;
