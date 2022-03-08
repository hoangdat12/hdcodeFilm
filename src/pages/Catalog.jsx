import React, {useEffect, useState} from 'react'

import './Catelog.scss'

import { useParams, useNavigate } from 'react-router-dom'
import {BsStarFill, BsPlayCircleFill, BsSuitHeartFill} from 'react-icons/bs'

import tmdbApi from '../api/tmdbApi';
import apiConfig from '../api/apiConfig'
import axios from "axios"; 

const Catalog = () => {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [heart, setHeart] = useState(false)
    const [page, setPage] = useState(1)

    const {movie, type} = useParams();

    let title;

    if( type === 'upcoming' || type === 'on_the_air') {
        title = ''
    }
    else {
        title =  type;
    }

    const handleHeart = () => {
        setHeart(!heart)
    }

    const handleDetail = id => {
        navigate(`/detail/${movie}/${id}`)
    }

    const handleNext = () => {
        setPage(page + 1)
    }

    const handlePrivius = () => {
        setPage(page - 1)
    }

    const handleChangePage = page => {
        switch(page) {
            case 1:
                setPage(1)
                break
            case 2:
                setPage(2)
                break
            case 3:
                setPage(3)
                break
            case 4:
                setPage(4)
                break
            case 5:
                setPage(5)
                break
            case 6:
                setPage(6)
                break
            case 7:
                setPage(7)
                break
            case 8:
                setPage(8)
                break
            default:
                console.log('error')
        }
    }
    
    const baseURL = `${apiConfig.baseUrl}${movie}/${type}?api_key=${apiConfig.apiKey}&language=en-US&page=${page}`

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setItems(response.data.results);
          });
    },[movie, page])
    
    console.log("list film",items)

    return (
        <div 
            className={movie == 'movie' ? 'catalog movie' : 'catalog tv'}
        >
            <div className='catalog__content'>
                <h3 className='title'>{movie === 'movie' ? `Phim Movies ${title}` : `Phim TV Series ${title}`}</h3>
                <div className='list__film row'>
                    {items && items.map((item, index) => (
                        <div 
                            key={index} 
                            className='film col-md-3 col-6'
                            onClick={() => handleDetail(item.id)}
                        >
                            <div className='poster__film'>
                                <img src={apiConfig.w500Image(item.poster_path)}/>
                            </div>
                            <div className='play__film'>
                                <span 
                                    onClick={() => handleDetail(item.id)}
                                    className='play'
                                >
                                    <BsPlayCircleFill />
                                </span>
                                <span 
                                    onClick={handleHeart}
                                    className={heart ? 'heart' : ''}
                                >
                                    <BsSuitHeartFill />
                                </span>
                            </div>
                            <div className="film__name">
                                <h5>{item.title || item.original_title || item.original_name}</h5>
                                <div className='evaluate'>
                                    <span className='star'>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                    </span>
                                    <span className='vote'>
                                        ({item.vote_count})
                                    </span>
                                </div >
                            </div>
                        </div>
                    ))}
                </div>
                <div className='pagination'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a 
                                    onClick={handlePrivius}
                                    className="page-link" 
                                    href="#" 
                                    aria-label="Previous"
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item">
                                <a 
                                onClick={() => handleChangePage (page )}
                                    className="page-link" 
                                    href="#"
                                >
                                    {page > 3 ? '...' : page}
                                </a>
                            </li>
                            <li className="page-item">
                                <a 
                                onClick={() => handleChangePage (page + 1)}
                                    value='1'
                                    className="page-link" 
                                    href="#"
                                >
                                    {page + 1}
                                </a>
                            </li>
                            <li className="page-item">
                                <a 
                                    onClick={() => handleChangePage (page + 2)}
                                    value='1'
                                    className="page-link" 
                                    href="#"
                                >
                                    {page + 2}
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">...</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">100</a>
                            </li>
                            <li className="page-item">
                                <a 
                                    onClick={handleNext}
                                    className="page-link" 
                                    href="#" 
                                    aria-label="Next"
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Catalog