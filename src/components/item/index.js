import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAction, buttonText }) {
  const handleAction = e => {
    e.stopPropagation();
    onAction(item.code);
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{item.price} ₽</div>
      {item.quantity && <div className="Item-quantity">{item.quantity} шт.</div>}
      <div className="Item-actions">
        <button onClick={handleAction}>{buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default React.memo(Item);

