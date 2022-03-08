import './cast.scss';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { useNavigate } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import useInnerWidth from '../../hook/innerWidth'

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const Cast = props => {

    const width = useInnerWidth();
    let item ;
    
    const navigate = useNavigate();

    const category = props.category;
    const id = props.id;
    const baseURL = `${apiConfig.baseUrl}/${category}/${id}/credits?api_key=${apiConfig.apiKey}`

    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(baseURL).then((response) => {
          setPost(response.data);
        });
    }, []);

    if (width >= 1024) {
        item = 5
    } else if(width < 1024 && width >=740) {
        item = 4
    } else if (width < 740 && width >= 500) {
        item = 3
    } else {
        item = 2;
    }

    return (
        <div className='cast'>
            <h3 className='title'>Diễn Viên</h3>
            <div className='cast__film'>
                <Swiper
                    slidesPerView={item}
                    navigation={true}
                    spaceBetween={10}
                    pagination={true}
                    // grabCursor={true}
                >
                    {
                        post.cast && post.cast.map( (film,index) => (
                            <SwiperSlide key={index} >
                                <div className='cast__film'>
                                    <img src={apiConfig.w500Image(film.profile_path)} />
                                    <div className='cast__name'>
                                        <h4 className='name'>{film.name}</h4>
                                        <p className='charactor'>{film.character}</p>
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

export default Cast