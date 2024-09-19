import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import './style.css';

function Cart({ cart, onRemoveFromCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Head title="Корзина" />
      <div className="Cart-body">
        <List list={cart} onAction={onRemoveFromCart} buttonText="Удалить" />
      </div>
      <div className="Cart-footer">
        <div className="Cart-total">
          <div className="Cart-total-label">Итого</div>
          <div className="Cart-total-value">{totalPrice} ₽</div>
        </div>
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);
