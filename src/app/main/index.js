import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load({ page: store.getState().catalog.currentPage });
  }, [store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    changePage: useCallback(page => store.actions.catalog.setPage(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} link={`/products/${item._id}`} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  const homeLink = '/products';

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        link={homeLink}
      />
      <List list={select.list} renderItem={renders.item} handleLink={callbacks.getCatalogItem} />
      <Pagination
        onPageChange={callbacks.changePage}
        currentPage={select.currentPage}
        totalPages={select.totalPages}
      />
    </PageLayout>
  );
}

export default memo(Main);
