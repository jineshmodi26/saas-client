import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';


const ReviewModal = (props) => {

    const [movies, setMovies] = useState([])
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        props.setMovieId(e.target.value);
    };

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://saas-server-na0d.onrender.com/movies"
        }).then((res) => {
            setMovies(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div>
            <div
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20"
            >
                <div className="bg-white p-6 rounded-sm shadow-lg m-4" style={{ width: "400px" }}>
                    <h2 className="text-xl my-5">Add New Review</h2>
                    <div className="mb-4">
                        <div className="w-full">
                            <select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                {
                                    movies.map((movie) => {
                                        return <option value={movie.id}>{movie.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <input
                            type=""
                            className="w-full p-2 mt-5 border border-gray-300 rounded"
                            value={props.name}
                            onChange={(e) => props.setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <input
                            type=""
                            className="w-full p-2 mt-5 border border-gray-300 rounded"
                            value={props.rating}
                            onChange={(e) => props.setRating(e.target.value)}
                            placeholder="Rating 0 - 10"
                            required
                        />
                        <input
                            type=""
                            className="w-full p-2 mt-5 border border-gray-300 rounded"
                            value={props.comments}
                            onChange={(e) => props.setComments(e.target.value)}
                            placeholder="Review Comments"
                            required
                        />
                    </div>
                    <div className="mb-4">
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="py-2 px-4 rounded my-5 mx-5"
                            onClick={() => {props.setIsReviewModalOpen(false)}}
                            style={{ backgroundColor: "lightgray" }}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded my-5"
                            onClick={props.handleCreateReview}
                            style={{ backgroundColor: "#6558f5" }}
                            type="submit"
                        >
                            {props.type} Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewModal