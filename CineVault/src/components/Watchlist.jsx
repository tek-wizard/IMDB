import React, { useContext } from 'react'
import ShowLists from './ShowLists'
import { Context } from './Context'

function Watchlist() {
  const { watchlist } = useContext(Context);

  return (
    <>
      <div className='h-40 bg-blue-500 w-full relative text-white'>
        <div className='absolute left-8 top-8 md:left-20 md:top-10'>
          <h1 className='text-4xl md:text-6xl font-bold'>Your Watchlist</h1>
          <p className='text-md md:text-lg mt-3 ml-1 max-w-3xl'>
            The one place to track the content you want to watch. You can sort your Watchlist by the 'rating' or 'popularity score' and arrange your titles in the order you want to see them.
          </p>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 text-lg">
          Your Watchlist is currently empty. Start adding movies!
        </div>
      ) : (
        <ShowLists list={watchlist} />
      )}
    </>
  )
}

export default Watchlist
