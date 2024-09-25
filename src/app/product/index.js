import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Product() {
  const { id } = useParams();
  const store = useStore();
  const product = useSelector(state => state.product.product);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const cn = bem('Product');

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const handleAddToBasket = () => {
    store.actions.basket.addToBasket(product._id);
  };

  useEffect(() => {
    store.actions.product.loadProduct(id);
    store.actions.modals.close();
  }, [store, id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <PageLayout>
      <Head title={product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
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
    </PageLayout>
  );
}

export default Product;
