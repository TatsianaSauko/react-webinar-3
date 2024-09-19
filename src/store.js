/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      isCartOpen: false,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (item) {
      const cartItem = this.state.cart.find(cartItem => cartItem.code === code);

      let newCart;
      if (cartItem) {
        newCart = this.state.cart.map(cartItem =>
          cartItem.code === code
            ? { ...cartItem, quantity: cartItem.quantity + 1, price: cartItem.price + item.price }
            : cartItem,
        );
      } else {
        newCart = [...this.state.cart, { ...item, quantity: 1 }];
      }

      this.setState({ ...this.state, cart: newCart });
    }
  }

  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  setIsCartOpen(isOpen) {
    this.setState({ ...this.state, isCartOpen: isOpen });
  }
}

export default Store;
