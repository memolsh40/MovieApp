import logo from './logo.svg';

import './App.css';


import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {Navigation} from './Components/Navigation';
import {Home} from './Pages/Home';
import {About} from './Pages/About';
import {Contact} from './Pages/Contact';
import {Products} from './Pages/Products';
import {Footer} from './Components/Footer';
import {LogIn} from './Pages/LogIn';
import {SignUp} from './Pages/SignUp';
import {CategoryProducts} from './Pages/CategoryProducts';
import {ProductDetail} from './Pages/ProductDetail';
import {MovieList} from './Pages/MovieList';
import {SeriesList} from './Pages/SeriesList';
function App() {
  
  return (
    <Router>
    <div className="App custom-dark-color">
      <Navigation/>
     
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path="/productCList" element={<CategoryProducts />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/movieList" element={<MovieList />} />
        <Route path="/seriesList" element={<SeriesList />} />
      </Routes>
      
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
