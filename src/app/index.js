import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path=":id" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </Router>
  );
}

export default App;
