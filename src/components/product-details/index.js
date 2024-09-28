import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const ProductDetails = ({ product, handleAddToBasket }) => {
  const cn = bem('Product');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{product.description}</div>
      <div className={cn('madeIn')}>
        Страна производитель:{' '}
        <span className="bold">
          {product.madeIn.title} ({product.madeIn.code})
        </span>
      </div>
      <div className={cn('category')}>
        Категория: <span className="bold">{product.category.title}</span>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <span className="bold">{product.edition}</span>
      </div>
      <div className={cn('price')}>
        Цена: {product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
      </div>
      <button className="add-button" onClick={handleAddToBasket}>
        Добавить
      </button>
    </div>
  );
};

export default ProductDetails;
