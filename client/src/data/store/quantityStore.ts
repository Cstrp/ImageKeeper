import { makeAutoObservable, runInAction } from 'mobx';

class QuantityStore {
  constructor() {
    makeAutoObservable(this);
  }

  public quantity: number = 0;

  public setQuantity(quantity: number) {
    runInAction(() => {
      this.quantity = quantity;
    });
  }

  public getQuantity = () => {
    return this.quantity;
  };

  public addQuantity() {
    runInAction(() => {
      this.quantity += 1;
    });
  }

  public removeQuantity() {
    runInAction(() => {
      this.quantity -= 1;
    });
  }
}

export const quantityStore = new QuantityStore();
