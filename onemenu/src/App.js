import './App.css';
import ChoosePlace from './components/ChoosePlace/ChoosePlace';
import Header from './components/Header/Header';
import HomeAddress from './components/ChooseAddress/HomeAddress/HomeAddress';
import Menu from './components/Menu/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import RestaurantAddress from './components/ChooseAddress/RestaurantAddress/RestaurantAddress';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/choose-place" />} />
        <Route path="/choose-place" element={<ChoosePlace />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/choose-address-home' element={<HomeAddress />} />
        <Route path='/choose-address-restaurant' element={<RestaurantAddress />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
