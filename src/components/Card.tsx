"use client"

import formatDate from "../utils/formatDate"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { useState } from "react"
import MovieModal from "./MovieModal";
import {toast} from "react-toastify"
import axios from "axios"

const Card = ({ movie, deleteMovie }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieName, setMovieName] = useState(movie.name);
  const [releaseDate, setReleaseDate] = useState(() => {
    const today = new Date(movie.releaseDate);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  
  const updatedDate = formatDate(movie.releaseDate)
  const router = useRouter();

  const handleUpdateMovie = async () => {

    if (movieName == "" || releaseDate == "") {
      toast.error("Enter required data")
      return;
    }

    const movieData = {
      name: movieName,
      releaseDate,
    };

    try {
      // Make the API call to create a movie
      await axios({
        method: "PUT",
        url: `https://saas-server-na0d.onrender.com/movies/${movie.id}`,
        data: movieData
      }).then((res) => {
        if (res.status == 200) {
          toast.success("Movie updated successfully")
          setIsModalOpen(false);
          setMovieName("");
          setReleaseDate("");
          window.location.reload()
        } else {
          toast.error("Something went wrong")
        }
      }).catch((error) => {
        console.log(error)
      })

    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <>
    <div className="p-6 rounded-sm shadow-md w-full hover:cursor-pointer" style={{ backgroundColor: "#e0defd" }}>
      <Link href={{
        pathname: "/movie",
        query: {
          id: movie.id
        }
      }}>
        <h2 className="text-xl mb-4">{movie.name}</h2>
        <p className="text-gray-800 mb-4 italic">Released: {updatedDate}</p>
        <p className="text-black-800 font-bold mt-4">Rating: {movie.averageRating}/10</p>
      </Link>
      <div className="flex justify-end space-x-2 mt-4">
        <button className="text-gray-400" onClick={() => setIsModalOpen(true)}>
          <BorderColorIcon />
        </button>
        <button className="text-gray-400" onClick={() => {deleteMovie(movie.id)}}>
          <DeleteIcon />
        </button>
      </div>
    </div>
    {isModalOpen && (
        <MovieModal movieName={movieName} setMovieName={setMovieName} releaseDate={releaseDate} setReleaseDate={setReleaseDate} handleCreateMovie={handleUpdateMovie} setIsModalOpen={setIsModalOpen} type={"Edit"}/>
      )}
    </>
  );
};

export default Card;
