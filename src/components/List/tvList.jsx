import './movieList.scss'
import useInnerWidth from '../../hook/innerWidth';

import React, {useEffect, useState} from 'react'

import SwiperCore, { EffectCoverflow, Navigation, Pagination} from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useNavigate } from 'react-router-dom'

import apiConfig from '../../api/apiConfig'
import tmdbApi, {category} from '../../api/tmdbApi'

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);


const TvList = props => {

    const width = useInnerWidth();
    let item;

    const navigate = useNavigate()

    const [tvList, setTvList] = useState([])

    const handleDetail = (id) => {
        navigate(`/detail/tv/${id}`)
    }

    const handleListFilm = () => {
        navigate(`/movie/${props.type}`)
    }

    if (width >= 1024) {
        item = 5;
      } else if (width < 1024 && width >= 740) {
        item = 4;
      } else if (width < 740 && width >= 500) {
        item = 3;
      } else {
        item = 2;
    }

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setTvList(response.results);
        }
        getList();
    }, [])

    return (
        <div className='movieList container'>
            <div className='title'>
                <h3 className='movie-title'>TV {props.type}</h3>
                <button 
                    className='btns'
                    onClick={handleListFilm}
                >
                    Xem thêm
                </button>
            </div>
            <div className='list__film'>
                <Swiper
                    slidesPerView={item}
                    navigation={true}
                    spaceBetween={10}
                    pagination={true}
                    grabCursor={true}
                >
                    {tvList && tvList.map((film, index) => (
                        <SwiperSlide 
                            onClick={() => handleDetail(film.id)}
                            key={index}
                        >
                            <img src={apiConfig.w500Image(film.poster_path || film.backdrop_path)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default TvList