import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import { formatPrice } from '../../utils';
import './style.css';

function Cart({ cart, onRemoveFromCart, onClose }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedPrice = formatPrice(totalPrice);

  return (
    <>
      <Head title="Корзина">
        <button onClick={onClose} className="Button-close">
          Закрыть
        </button>
      </Head>
      <div className="Cart-body">
        {cart.length === 0 ? (
          <div className="Cart-empty">Корзина пуста</div>
        ) : (
          <List list={cart} onAction={onRemoveFromCart} buttonText="Удалить" />
        )}
      </div>
      {cart.length > 0 && (
        <div className="Cart-footer">
          <div className="Cart-total">
            <div className="Cart-total-label">Итого</div>
            <div className="Cart-total-value">{formattedPrice} ₽</div>
          </div>
        </div>
      )}
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
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Cart);
