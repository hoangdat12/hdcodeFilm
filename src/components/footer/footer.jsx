import './footer.scss';

import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai'

import React, {useRef, useState, useEffect} from 'react';

const listFilm = [
    {
        id:'1',
        src:'https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.15752-9/89063361_222718875785096_5291198120086994944_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=QbgNQKplXLkAX99hUxi&_nc_oc=AQn9wJOlazarrPG9CuqVKxXKxtp7fsK0vLASdW6WA1uw2j_7RVNdU6c7TAYa78jK3dE&_nc_ht=scontent.fsgn5-11.fna&oh=03_AVLC4bucDNTi9a5af5-FIUIjuQ6HKY2-zFxbz5Q1hGs9Hw&oe=6244D340',
        name:'huong'
    },
    {
        id:'2',
        src:'https://cdn.fbsbx.com/v/t59.2708-21/275040865_1321410601674491_1067917721528560086_n.gif?_nc_cat=111&ccb=1-5&_nc_sid=041f46&_nc_ohc=pu6fbjI2oqkAX-Qy13U&_nc_ht=cdn.fbsbx.com&oh=03_AVKp3481maFs3utu75J8AUS-iINXBCxS65x69v4XviU28g&oe=622243E6',
        name:'thuat'
    },
    {
        id:'3',
        src:'https://scontent.fdad3-5.fna.fbcdn.net/v/t1.15752-9/274774576_295590305973344_2076757495885429837_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_ohc=gdNjoGqrfBIAX9gmRkb&_nc_ht=scontent.fdad3-5.fna&oh=03_AVLoAbViRA27ywSYpa_V-CisOrV-yWp6sM93lCoLegoGkA&oe=6246C7BC',
        name:'bao'
    },
    {
        id:'4',
        src:'https://scontent.fdad3-2.fna.fbcdn.net/v/t1.15752-9/274544306_1116512872466640_8691072974717455614_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=ae9488&_nc_ohc=cHVvYK69nl8AX_PcRbL&_nc_ht=scontent.fdad3-2.fna&oh=03_AVLynZCBx0WptpAo8mhHunouYNtbcuZbOLrFqN1_F_IQUQ&oe=6246BABB',
        name:'quy'
    },
    {
        id:'5',
        src:'https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.15752-9/274772167_530684874997860_11098429467822840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=8b_wHeY1SiIAX9KgG_C&_nc_ht=scontent.fsgn5-11.fna&oh=03_AVIYeDhaKXlotldfaAVwDFNfTHN-vJWs3DPtW_SdIXuZoQ&oe=62472144',
        name:'cay'
    },
    {
        id:'6',
        src:'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.15752-9/266707510_590691265337923_3525171678051726844_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=-WkrlZaLnYQAX8vKm2g&_nc_ht=scontent.fdad3-4.fna&oh=03_AVJeNU2vi5M8XsCv1n5LflFbWgI4ToHehkYQMzNAx5U6TQ&oe=6245B344',
        name:'nhan'
    },
    {
        id:'7',
        src:'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.15752-9/271526727_4680771612010713_4197701450952074762_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=xnqxXNO2bawAX-W1C-V&tn=7mzLg52cdZzRgACe&_nc_ht=scontent.fdad3-3.fna&oh=03_AVKD0yIG4M1h1XMzk1jN5sgpvq96w5-MVaKj-mhB5HUXtA&oe=62457DF4',
        name:'tuyen'
    },
    {
        id:'8',
        src:'https://scontent.fdad3-2.fna.fbcdn.net/v/t1.15752-9/271795178_409149734337994_5742127506179498382_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=ae9488&_nc_ohc=OFd4ZSJKIBYAX9Wh6IE&_nc_oc=AQnv_9NR-y8Af1Q2xUW_EiJdyQyRifaYZt6zaM-dDTSm27jpx4U4AkIjUoNnCojjtQY&_nc_ht=scontent.fdad3-2.fna&oh=03_AVKDn_CqOXl2eLacwZkVpGfC7WQfOnPy61_mGEN-o1Ec1g&oe=624549C8',
        name:'ny'
    },
    {
        id:'9',
        src:'https://scontent.fdad3-2.fna.fbcdn.net/v/t39.30808-1/273952168_1034942894035516_2587902505853206012_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-5&_nc_sid=7206a8&_nc_ohc=lKK1dvYP-zAAX_Cl1zZ&_nc_ht=scontent.fdad3-2.fna&oh=00_AT_yi842TdrC9mAjJrdJekK8QGvGeuE-IAdx5X2Kn5i6Eg&oe=622607A9',
        name:'viet'
    },
]

const Footer = () => {

    const [input, setInput] = useState('')
    const [hidden, setHidden] = useState(false)
    const [showPrize, setShowPrize] = useState(false)
    const [img, setImg] = useState('')
    const [showLetter, setShowLetter] = useState(false)
    console.log(input)

    const handleButton = () => {
        setHidden(true)
    }

    const handlePrize = () => {
        switch(input) {
            case 'Hương':
                setImg(listFilm[0].src)
                break;
            case 'Thuật':
                setImg(listFilm[1].src)
                break;
            case 'Bảo':
                setImg(listFilm[2].src)
                break;
            case 'Quý':
                setImg(listFilm[3].src)
                break;
            case 'Huy':
                setImg(listFilm[4].src)
                break;
            case 'Nhân':
                setImg(listFilm[5].src)
                break;
            case 'Tuyền':
                setImg(listFilm[6].src)
                break;
            case 'Ny':
                setImg(listFilm[7].src)
                break;
            case 'Việt':
                setImg(listFilm[8].src)
                break;
            default:
                setImg('https://s.memehay.com/files/posts/20200813/2f24ef07ce0da58d626debf204018f1fla-bai-ma-thuat-huan-hoa-hong.jpg')
                setShowLetter(true)

        }
        setShowPrize(true)
    }

    useEffect(() => {

    }, [img])

    console.log(img)

    return (
        <div className="footer">
            <div className="row container">
                <div className="col-md-6 col-12">
                    <h4 className='footer__title'>Liên Hệ</h4>
                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <a href='https://www.facebook.com/profile.php?id=100011693771182' className='footer__link'>
                                <FaFacebookF/>
                            </a>
                        </li>
                        <li className='footer__item'>
                            <a href='https://www.instagram.com/dathoang2279/' className='footer__link'><AiOutlineInstagram/></a>
                        </li>
                        <li className='footer__item'>
                            <a href='https://www.youtube.com/' className='footer__link'><AiFillYoutube/></a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6 col-12">
                    <h4 className='footer__title'>Vòng quay may mắn</h4>
                    <div className={hidden ? 'input__name hidden' : 'input__name'}>
                        <input 
                            onChange={e => setInput(e.target.value)}
                            value={input}
                            type='text'
                            placeholder='Nhập tên của bạn...' 
                        />
                        <button
                            onClick={handleButton}
                        >
                            Bắt đầu
                        </button>
                    </div>
                    <div className={hidden ? "prize-btn show" : "prize-btn"}>
                        <button
                            onClick={handlePrize}
                        >
                            Rút thưởng
                        </button>
                    </div>
                    <div className={showPrize ? 'prize show1' : 'prize'}>
                            <h4>Phần thưởng của bạn là: </h4>
                            <div className="img">
                                <img src={img} />
                            </div>
                            <p className={showLetter ? '' : 'hidden'}>Có làm có ăn </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;