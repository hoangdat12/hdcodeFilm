import React, {useEffect, useState} from 'react'
import './Detail.scss'

import Cast from '../../components/cast/cast'
import Similar from '../../components/similar/similar'

import {BsStarFill, BsHeartFill} from 'react-icons/bs'

import { useParams, useNavigate } from 'react-router-dom'

import tmdbApi, {category, movieType, tvType} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const Detail = () => {
    
    const navigate = useNavigate();
    const {category, id} = useParams();

    const[item, setItem] = useState([])
    const [heart, setHeart] = useState(false)

    const handleWatch = () => {
        navigate(`/detail/watch/${category}/${id}`)
    }

    const handleActiveHeart = () => {
        setHeart(!heart)
    }

    const background = apiConfig.w500Image(item.poster_path ? item.poster_path : item.backdrop_path);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
        <div className='detail'>
            <div 
                className='detai__description'
                style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}
            >
                <div className="detail__des__logo">
                    <img src={background} />
                </div>
                <div className="detail__des__info">
                        <h2 className='detail__title'>
                            {item.original_title || item.title}
                        </h2>
                        <p className='detail__description'>
                            {item.overview}
                        </p>
                        <span className='release_date'>
                            Ngày phát hành: {item.release_date}
                        </span>
                        <div className='detail__type'>
                            {item.genres && item.genres.map((type, index) => (
                                <span key={index} className='type'>{type.name}</span>
                            ))}
                        </div>
                        <div className='detail__vote'>
                            <span className='star'>
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                            </span>
                            <span className="vote">({item.vote_count})</span>
                        </div>
                        <div className='btns'>
                            <button
                                onClick={handleWatch}
                            >
                                Xem Ngay
                            </button>
                            <button>Xem Trailler</button>
                            <span 
                                onClick={handleActiveHeart}
                                className={heart ? 'heart active' : 'heart'}
                            >
                                <BsHeartFill />
                            </span>
                        </div>
                </div>
                <div className='homepage'>
                    <a href={item.homepage}>ĐẾN TRANG CHỦ PHIM</a>
                </div>
            </div>
        </div>
        <Cast category={category} id={id} />
        <Similar category={category} id={id} />
        </>
    )
}

export default Detail