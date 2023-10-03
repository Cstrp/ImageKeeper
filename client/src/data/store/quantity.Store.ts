import { action, makeAutoObservable, observable } from 'mobx';

class QuantityStore {
  public quantity: number = 0;

  constructor() {
    makeAutoObservable(this, {
      quantity: observable,
      setQuantity: action,
      getQuantity: action,
      removeQuantity: action,
    });
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getQuantity() {
    return this.quantity;
  }

  addQuantity() {
    this.quantity += 1;
  }

  removeQuantity() {
    this.quantity -= 1;
  }
}

export const quantityStore = new QuantityStore();
