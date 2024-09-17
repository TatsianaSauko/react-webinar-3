import React, { useState, useCallback, useEffect } from 'react';
import PageLayout from './components/page-layout';
import Head from './components/head';
import List from './components/list';
import CartModal from './components/cart-modal';
import CartSummary from './components/cart-summary';

function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return () => unsubscribe();
  }, [store]);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),
    onRemoveFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),
    onOpenCart: useCallback(() => {
      setIsCartOpen(true);
    }, []),
    onCloseCart: useCallback(() => {
      setIsCartOpen(false);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartSummary cart={state.cart} onOpenCart={callbacks.onOpenCart} />
      <List list={state.list} onAction={callbacks.onAddToCart} buttonText="Добавить" />
      {isCartOpen && <CartModal cart={state.cart} onRemoveFromCart={callbacks.onRemoveFromCart} onClose={callbacks.onCloseCart} />}
    </PageLayout>
  );
}

export default App;
