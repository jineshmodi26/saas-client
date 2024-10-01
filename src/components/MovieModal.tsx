import React from 'react'

const MovieModal = (props) => {

  return (
    <div>
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div className="bg-white p-6 rounded-sm shadow-lg m-4" style={{ width: "400px" }}>
            <h2 className="text-xl my-5">Add New Movie</h2>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={props.movieName}
                onChange={(e) => props.setMovieName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={props.releaseDate}
                onChange={(e) => props.setReleaseDate(e.target.value)}
                placeholder="Release Date"
                required
              />
            </div>
            <div className="flex justify-end">
            <button
                className="py-2 px-4 rounded my-5 mx-5"
                onClick={() => {props.setIsModalOpen(false)}}
                style={{ backgroundColor: "lightgray" }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded my-5"
                onClick={props.handleCreateMovie}
                style={{ backgroundColor: "#6558f5" }}
                type="submit"
              >
                {props.type} Movie
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MovieModal