import React from 'react'

import HeroSlice from '../components/hero-slice/HeroSlice'

import MovieList from '../components/List/movieList'
import TvList from '../components/List/tvList';
import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {

    return (
        <div className='home'>
            <HeroSlice />
            {/* <MovieList category={category.movie} type={movieType.popular}/> */}
            <MovieList category={category.movie} type={movieType.popular}/>
            <MovieList category={category.movie} type={movieType.top_rated}/>
            <TvList category={category.tv} type={tvType.popular} />
            <TvList category={category.tv} type={tvType.top_rated} />
        </div>
    )
}

export default Home