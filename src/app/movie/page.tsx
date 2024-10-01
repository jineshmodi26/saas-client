"use client"

import Header from '@/components/Header';
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const page = ({ searchParams }) => {

  const [movie, setMovie] = useState("")
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [found, setFound] = useState()

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://saas-server-na0d.onrender.com/movies/${searchParams.id}`
    }).then((res) => {
      setMovie(res.data)
      setFound(true)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      setFound(false)
    })
    
    axios({
      method: "GET",
      url: `https://saas-server-na0d.onrender.com/reviews?movieId=${searchParams.id}`
    }).then((res) => {
      setReviews(res.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div>
      <Header>
      {
        loading ? <h1 className='relative top-28 px-6'>Loading...</h1> : found ?  <div className='relative top-28 px-6'>
        <div className='mr-6 flex justify-between'>
          <h1 className='text-5xl'>{movie.name}</h1>
          <h1 className='text-5xl' style={{ color: "#6558f5" }}>{movie.averageRating}/10</h1>
        </div>
        <div>
          {
            reviews.map((review) => {
              return <div className='mr-6 mt-6 border border-2 p-4'>
                <div className='flex justify-between'>
                  <p>{review.comments}</p>
                  <p className='text-xl' style={{ color: "#6558f5" }}>{review.rating}/10</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='italic'>By {review.reviewer}</p>
                  <div className="flex justify-end space-x-2 mt-4">
                  <button className="text-gray-400">
                    <BorderColorIcon sx={{height: "22px", width: "22px"}}/>
                  </button>
                  <button className="text-gray-400">
                    <DeleteIcon sx={{height: "22px", width: "22px"}}/>
                  </button>
                </div>
                </div>
              </div>
            })
          }
        </div>
      </div> : <p className='relative top-28 px-6 text-center'>Movie is not available</p>
      }
      {/* Fetch or display data based on the id */}
      </Header>
    </div>
  )
}

export default page