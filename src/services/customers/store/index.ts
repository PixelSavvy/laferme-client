import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Customer } from "../schema";

type CustomerStore = {
  products: Customer[];
  setCustomers: (products: Customer[]) => void;
  getCustomer: (customerId: number) => Customer | undefined;
};

export const useCustomerStore = create<CustomerStore>()(
  immer((set, get) => ({
    products: [],
    setCustomers: (products) =>
      set((state) => {
        state.products = products;
      }),
    getCustomer: (customerId) =>
      get().products.find((product) => product.id === customerId),
  }))
);
