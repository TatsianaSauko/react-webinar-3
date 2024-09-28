import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ProductDetails from '../../components/product-details';

function Product() {
  const { id } = useParams();
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const product = useSelector(state => state.product.product);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const handleAddToBasket = () => {
    if (product) {
      store.actions.basket.addToBasket(product._id);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      await store.actions.product.loadProduct(id);
      setLoading(false);
    };

    loadProduct();
    store.actions.modals.close();
  }, [store, id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  const homeLink = '/products';

  return (
    <PageLayout>
      <Head title={product.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        link={homeLink}
      />
      <ProductDetails product={product} handleAddToBasket={handleAddToBasket} />
    </PageLayout>
  );
}

export default Product;
