import React from 'react';
import PropTypes from 'prop-types';
import { plural, formatPrice } from '../../utils';
import './style.css';

function CartSummary({ cart = [], onOpenCart }) {
  const uniqueItemsTotal = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedPrice = formatPrice(totalPrice);

  const cartContent =
    uniqueItemsTotal > 0 ? (
      <div className="CartSummary-content">
        {uniqueItemsTotal}{' '}
        {plural(uniqueItemsTotal, { one: 'товар', few: 'товара', many: 'товаров' })} /{' '}
        {formattedPrice} ₽
      </div>
    ) : (
      <div className="CartSummary-empty">пусто</div>
    );

  return (
    <div className="CartSummary">
      B корзине: {cartContent}
      <button className="Button-go" onClick={() => onOpenCart(true)}>
        Перейти
      </button>
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
