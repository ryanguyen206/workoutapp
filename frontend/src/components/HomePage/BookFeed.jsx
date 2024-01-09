import React from 'react'
import {useQuery} from 'react-query'
import { handleGetRequest } from '../../utils/helper'
import SingleBookFeed from './SingleBookFeed'




const BookFeed = ({currentGenre}) => {


  const {data} = useQuery({
      queryKey:['reviews'], 
      queryFn: async () => await handleGetRequest('http://127.0.0.1:8000/api/book-review/'),
      onSuccess: () => console.log(data)
  })

  const filteredReviews = currentGenre ? data.filter((review) => review.genre_name === currentGenre) : data;

  return (
    
      filteredReviews && filteredReviews.length === 0 ? <p className='text-center my-20 text-stone-500 text-2xl uppercase'>No book reviews</p> :
      <div className='flex flex-wrap gap-8 mt-20 md:grid md:grid-cols-2 md:grid-rows-2 text-stone-500 font-medium'>
        {filteredReviews?.map(review => (
          <div key={review.id} className='w-full flex-auto'>
             <SingleBookFeed review={review}/>
          </div>
     
        ))}
      </div>
  )
}

export default BookFeed