import React, { useCallback } from 'react';
import PageLayout from './components/page-layout';
import Head from './components/head';
import List from './components/list';
import Cart from './components/cart';
import CartSummary from './components/cart-summary';
import ModalLayout from './components/modal-layout';

function App({ store }) {
  const state = store.getState();

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
    onSetModal: useCallback(
      isOpen => {
        store.setIsCartOpen(isOpen);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartSummary cart={state.cart} onOpenCart={callbacks.onSetModal} />
      <List list={state.list} onAction={callbacks.onAddToCart} buttonText="Добавить" />
      <ModalLayout isOpen={state.isCartOpen} onClose={() => callbacks.onSetModal(false)}>
        <Cart cart={state.cart} onRemoveFromCart={callbacks.onRemoveFromCart} />
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
