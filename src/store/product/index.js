import StoreModule from '../module';

class ProductStore extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: null,
    };
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=description,title,price,edition,madeIn(title,code),category(title)`,
    );
    const data = await response.json();
    this.setState({ product: data.result }, 'Загружен товар из АПИ');
  }
}

export default ProductStore;
