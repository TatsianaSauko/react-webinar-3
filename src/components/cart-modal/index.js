import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import './style.css';

function CartModal({ cart, onRemoveFromCart, onClose }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="CartModal">

<div className="CartModal-content">
        <Head title="Корзина" />
        <button onClick={onClose} className='Button-close'>Закрыть</button>
        <div className="CartModal-body">
        <List list={cart} onAction={onRemoveFromCart} buttonText="Удалить" />
        </div>
        <div className="CartModal-footer">
        <div className="CartModal-total">
            <div className="CartModal-total-label">Итого</div>
            <div className="CartModal-total-value">{totalPrice} ₽</div>
        </div>
        </div>
        </div>
      </div>

  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(CartModal);

