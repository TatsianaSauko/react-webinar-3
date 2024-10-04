import StoreModule from '../module';

/**
 * Состояние категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  /**
   * Получение всех категорий
   * @return {Promise<void>}
   */
  async fetchCategories() {
    this.setState({ ...this.getState(), waiting: true }, 'Начата загрузка категорий');
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      this.setState(
        {
          categories: json.result.items,
          waiting: false,
        },
        'Загружены категории',
      );
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
      this.setState({ ...this.getState(), waiting: false }, 'Ошибка при загрузке категорий');
    }
  }
}

export default CategoryState;
