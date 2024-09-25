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
      count: 0,
      currentPage: 1,
      totalPages: 0,
      pages: [],
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

    // Обновление состояния страниц
    const pages = this.generatePages(page, totalPages);

    this.setState(
      {
        ...this.getState(),
        list: data.result.items,
        count: data.result.count,
        currentPage: page,
        totalPages,
        pages,
      },
      'Загружены товары из АПИ',
    );
  }

  setPage(page) {
    const { totalPages } = this.getState();
    const pages = this.generatePages(page, totalPages);

    this.setState(
      {
        ...this.getState(),
        currentPage: page,
        skip: (page - 1) * this.getState().limit,
        pages,
      },
      'Изменена страница',
    );
    this.load({ page });
  }

  generatePages(currentPage, totalPages) {
    const pages = [];

    if (totalPages <= 5) {
      // Если страниц 5 или меньше, показываем все страницы без многоточий
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        // Специальная логика для первой страницы
        pages.push(1, 2, 3, '...', totalPages);
      } else {
        if (currentPage > 2) {
          pages.push(1);
        }

        if (currentPage > 3) {
          pages.push('...');
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (currentPage < totalPages - 2) {
          pages.push('...');
        }

        if (currentPage < totalPages - 1) {
          pages.push(totalPages);
        }
      }
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    if (!pages.includes(1)) {
      pages.unshift(1);
    }

    return pages;
  }
}

export default Catalog;
