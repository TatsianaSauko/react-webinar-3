import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function CartSummary ({ cart = [], onOpenCart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const cartContent = totalItems > 0
    ? <div className='CartSummary-content'>{totalItems} {plural(totalItems, { one: 'товар', few: 'товара', many: 'товаров' })} / {totalPrice} ₽</div>
    : <div className='CartSummary-empty'>пусто</div>;

  return (
    <div className="CartSummary">
      B корзине: {cartContent}
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

CartSummary.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ),
  onOpenCart: PropTypes.func.isRequired,
};

export default React.memo(CartSummary);
