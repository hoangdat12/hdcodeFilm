import './search.scss'

import { ImSearch } from 'react-icons/im'

const Search = () => {

    return (
        <div className="search">
            <div className='search__film'>
                <input type="text" className='search__input' placeholder='Nhập tên phim, đạo diễn, diễn viên...' />
                <span className='search__logo'><ImSearch /></span>
            </div>
        </div>
    )
}

export default Search