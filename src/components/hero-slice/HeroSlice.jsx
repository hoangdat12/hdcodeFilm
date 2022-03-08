import './HeroSlice.scss'

import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const HeroSlice = () => {

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(1, 6));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
        console.log(movieItems)
    }, []);

    return (
        <div className="hero-slice">
            <Swiper
               modules={[Autoplay]}
               grabCursor={true}
               spaceBetween={0}
               slidesPerView={1}
               autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSliceItem item={item} className={`${isActive ? 'active' : ''}`}  />
                            )}
                        </SwiperSlide>
                    ))
                }

                {
                    movieItems.map((item, index) => {
                        
                    })
                }
            </Swiper>
        </div>
    )
}

const HeroSliceItem = props => {

    let navigate = useNavigate();
    const modalRef = useRef();
    const [showModal, setShowModal] = useState(false);

    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const showTrailler = () => {
        setShowModal(true)
    }

    const handleCloseModal = (e) => {
        if(modalRef.current === e.target ) {
            setShowModal(false)
        }
    }

    const handleDetailFilm = () => {
        navigate(`/detail/movie/${item.id}`)
    }

    return (
       <>   
            <div 
                className={`hero-slice__item ${props.className}`}
                style={{backgroundImage: `url(${background})`}}
            >
                <div 
                    className="hero-slice__item__poster"
                >
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
                
                <div className="hero-slice__item__info">
                    <h5 className='name-film'>
                        {item.title || item.original_title}
                    </h5>
                    <p className='content-film'>
                        {item.overview}
                    </p>
                    <div className='btns'>
                        <button 
                            onClick={handleDetailFilm}
                            className='watch-film'
                        >
                            Xem phim
                        </button>

                        <button 
                            onClick={showTrailler}
                            className='trailer-film'
                        >
                            Trailer
                        </button>
                    </div>
                </div>
            </div>
            <div 
                ref={modalRef}
                className={showModal ? 'modal-trailer' : 'modal-trailer hidden' }
                onClick={handleCloseModal}
            >
                <div className='modal__content'>
                    <iframe src='https://www.youtube.com/embed/KKc_RMln5UY?list=RDfjtjs8ABkmw' width="90%" height="90%" title="trailer"></iframe>
                    {/* <iframe width="864" height="486" src="https://www.youtube.com/embed/KKc_RMln5UY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                </div>
            </div>
       </>
    )
}


export default HeroSlice