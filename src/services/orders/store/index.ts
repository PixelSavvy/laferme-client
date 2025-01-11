import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Order } from "../validations";

type OrdersStore = {
  data: {
    orders: Order[];
    message: string;
  };

  setOrders: (data: { orders: Order[]; message: string }) => void;
  getOrder: (id: number) => Order | undefined;
};

export const useOrdersStore = create<OrdersStore>()(
  immer((set, get) => ({
    data: {
      orders: [],
      message: "",
    },
    setOrders: ({ orders, message }) =>
      set((state) => {
        state.data.orders = orders;
        state.data.message = message;
      }),
    getOrder: (id) => {
      const order = get().data.orders.find((order) => order.id === id);
      return order;
    },
  })),
);
