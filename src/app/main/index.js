import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination'; // Импортируем компонент пагинации
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
    totalItems: state.catalog.count,
    itemsPerPage: state.catalog.limit,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    pages: state.catalog.pages,
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
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        pages={select.pages}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
