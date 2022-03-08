import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiConfig from "../../api/apiConfig";

import "./watch.scss";

const WatchMovie = () => {

  const [info, setInfo] = useState({});

  const { category,id } = useParams();

  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${apiConfig.baseUrl}/movie/${id}?api_key=${apiConfig.apiKey}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };

    getInfo(id);
  }, [id]);


  return (
    <div className="container">
      {/* Change document title */}

      <div className="watch-movie-container">
        <div className="watch-wrap">
          <div className="watch-movie">
            <iframe
              width="100%"
              height={"100%"}
              src={`https://www.2embed.ru/embed/tmdb/movie?id=${id}`}
              title="Movie player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className="watch-tv-in4">
            <h1 className="movie-name">{info.title}</h1>
            <p className="movie-overview">{info.overview}</p>
            <p className="movie-release_date">
              Release date: {info.release_date}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WatchMovie