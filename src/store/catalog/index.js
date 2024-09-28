import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: 10,
      skip: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }

  async load({ page = 1 }) {
    const { limit } = this.getState();
    const skip = (page - 1) * limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
    );
    const data = await response.json();
    const totalPages = Math.ceil(data.result.count / limit);

    this.setState(
      {
        ...this.getState(),
        list: data.result.items,
        currentPage: page,
        totalPages,
      },
      'Загружены товары из АПИ',
    );

    return totalPages;
  }

  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
        skip: (page - 1) * this.getState().limit,
      },
      'Изменена страница',
    );
    this.load({ page });
  }
}

export default Catalog;
