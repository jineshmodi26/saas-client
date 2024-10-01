// pages/index.tsx

"use client"

import { useEffect, useState } from "react";
import { Roboto } from 'next/font/google'
import Card from "../components/Card";
import axios from "axios"
import Link from "next/link"
import Header from "../components/Header";
import {toast} from "react-toastify"

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios({
      url: "https://saas-server-na0d.onrender.com/movies",
      method: "GET"
    }).then((res) => {
      setMovies(res.data)
      setFilteredMovies(res.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const searchMovies = (data: any) => {
    setSearchTerm(data)
    if (data == "") {
      setFilteredMovies(movies)
    } else {
      const filtered = movies.filter((movie) => movie.name.toLowerCase().includes(data.toLowerCase()))
      setFilteredMovies(filtered)
    }
  }

  const deleteMovie = async (id) => {
    await axios({
      method: "DELETE",
      url: `https://saas-server-na0d.onrender.com/movies/${id}`
    }).then((res) => {
      if (res.status == 200) {
        toast.success("Deleted Successfully")
        const filtered = filteredMovies.filter((movie) => movie.id != id)
        setFilteredMovies(filtered)
      } else {
        toast.error("Something went wrong")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="" style={{ fontFamily: roboto.style.fontFamily }}>
      
      <Header>

      {
        loading ? <h1 className='relative top-28 px-6'>Loading...</h1> : <>
          <div className="px-6 fixed top-28 bg-white z-10 w-full">
        <h1 className="text-3xl mb-6 text-gray-600" style={{ fontFamily: roboto.style.fontFamily }}>The best movie reviews site!</h1>

        <div className="relative w-full max-w-md">
          <input type="text" className="w-full py-2 px-4 pl-10 mb-6 text-gray-900 placeholder-gray-400 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Search for your favourite movie" onChange={(e) => {searchMovies(e.target.value)}} value={searchTerm} />
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            </svg>
          </span>
        </div>
      </div>
      <div className="px-6 relative top-64">
      <div className="grid grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <Card movie={movie} key={movie.id} deleteMovie={deleteMovie}/>
          ))}
        </div>
      </div>
        </>
      }
      
      </Header>
    </div>
  );
}
