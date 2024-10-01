// components/Header.tsx

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieModal from "./MovieModal";
import ReviewModal from "./ReviewModal";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [movieId, setMovieId] = useState("")
  const [name, setName] = useState("")
  const [rating, setRating] = useState("")
  const [comments, setComments] = useState("")

  const handleCreateReview = async () => {

    if (movieId == "" || name == "" || rating == "" || comments == "") {
      toast.error("Enter required data")
      return;
    }

    const reviewData = {
      movieId: parseInt(movieId),
      reviewer: name,
      rating: parseFloat(rating),
      comments
    };

    try {
      // Make the API call to create a movie
      await axios({
        method: "POST",
        url: "https://saas-server-na0d.onrender.com/reviews",
        data: reviewData
      }).then((res) => {
        if (res.status == 201) {
          toast.success("Review added successfully")
          setIsReviewModalOpen(false);
          setMovieId("");
          setName("");
          setRating("");
          setComments("");
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

  const handleCreateMovie = async () => {

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
        method: "POST",
        url: "https://saas-server-na0d.onrender.com/movies",
        data: movieData
      }).then((res) => {
        if (res.status == 200) {
          toast.success("Movie added successfully")
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
    <div className="">
      <ToastContainer />
      <div className="fixed w-full z-10 bg-white header-div">
        <header className="p-6 flex justify-between items-center mb-6" style={{ backgroundColor: "#e3e8ed" }}>
          <p className="text-lg font-semibold text-gray-500">MOVIECRITIC</p>
          <div>
            <button className="border border-gray-300 border-2 bg-white py-2 px-4 rounded mr-2" style={{ color: "#857bf7" }} onClick={() => setIsModalOpen(true)} >
              Add new movie
            </button>
            <button className="text-white py-2 px-4 rounded" style={{ backgroundColor: "#6558f5" }} onClick={() => setIsReviewModalOpen(true)}>
              Add new review
            </button>
          </div>
        </header>
      </div>

      {isModalOpen && (
        <MovieModal movieName={movieName} setMovieName={setMovieName} releaseDate={releaseDate} setReleaseDate={setReleaseDate} setIsModalOpen={setIsModalOpen} handleCreateMovie={handleCreateMovie} type={"Create"} />
      )}

      {isReviewModalOpen && (
        <ReviewModal movieId={movieId} setMovieId={setMovieId} name={name} setName={setName} rating={rating} setRating={setRating} comments={comments} setComments={setComments} setIsReviewModalOpen={setIsReviewModalOpen} handleCreateReview={handleCreateReview} type={"Create"} />
      )}

      <div className=""> {/* This ensures spacing below the fixed header */}
        {children} {/* Render child components */}
      </div>
    </div>
  );
}
