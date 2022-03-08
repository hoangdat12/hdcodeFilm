import './App.scss';
import 'swiper/swiper.min.css'

import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

import Header from './components/header/header';
import Footer from './components/footer/footer';

import Home from './pages/Home';
import Detail from './pages/datial/Detail'
import WatchMovie from './pages/watch/watchMovie';
import Catalog from './pages/Catalog';
import Search from './pages/search/search';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:category/:id' element={<Detail />} />
        {/* <Route path='/detail/watch/:category/:id' element={<WatchMovie />} /> */}
        <Route path='/:movie/:type' element={<Catalog />} />
        <Route path='/:tv/:type' element={<Catalog />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
