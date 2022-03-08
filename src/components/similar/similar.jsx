import './similar.scss'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import {BsStarFill} from 'react-icons/bs'

import { useNavigate } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import useInnerWidth from '../../hook/innerWidth'

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const Similar = props => {

    const width = useInnerWidth();
    let item ;

    useEffect(() => {
        axios.get(baseURL).then((response) => {
          setPost(response.data.results);
        });
    }, []);

    const navigate = useNavigate();
    const [post, setPost] = useState([])

    const category= props.category;
    const id = props.id;

    const baseURL = `${apiConfig.baseUrl}/${category || "tv"}/${id}/similar?api_key=${apiConfig.apiKey}`

    const handleDetail = (id) => {
        navigate(`/detail/${category}/${id}`)
    }

    
    if (width >= 1024) {
        item = 5
    } else if(width < 1024 && width >=740) {
        item = 4
    } else if (width < 740 && width >= 500) {
        item = 3
    } else {
        item = 2;
    }

    console.log(post)

    return (
        <div className='similar'>
            <h3 className='title'>Đề Xuất</h3>
            <div className='film'>
                <Swiper
                    slidesPerView={item}
                    navigation={true}
                    spaceBetween={10}
                    pagination={true}
                >
                    {
                        post && post.map( (film,index) => (
                            <SwiperSlide key={index} >
                                <div 
                                    className='similar__film'
                                    onClick={() => handleDetail(film.id)}
                                >
                                    <img src={apiConfig.w500Image(film.poster_path ? film.poster_path : film.backdrop_path)} />
                                    <div className='similar__name'>
                                        <h4 className='name'>{film.title || film.original_title}</h4>
                                        <div className='vote'>
                                            <span className='star'>
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                            </span>
                                            <span className='quantity__vote'>
                                               ({film.vote_count})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Similar