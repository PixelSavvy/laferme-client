import { orderStatus } from "@/config";
import { customerDefaultValues, customerSchema } from "@/services/customers";
import { productSchema } from "@/services/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";
const status = Object.keys(orderStatus) as [string, ...string[]];

const orderProductSchema = productSchema
  .omit({
    prices: true,
  })
  .extend({
    orderDetails: z.object({
      quantity: z.coerce
        .number({ required_error: REQUIRED_ERROR_MSG })
        .int()
        .positive(),
      weight: z.coerce
        .number({ required_error: REQUIRED_ERROR_MSG })
        .positive(),
      price: z.coerce.number({ required_error: REQUIRED_ERROR_MSG }).positive(),
    }),
  });

type OrderProduct = z.infer<typeof orderProductSchema>;

const orderProductDefaultValues: OrderProduct = {
  id: 0,
  title: "",
  productCode: "",
  hasVAT: "",
  orderDetails: {
    quantity: 0,
    weight: 0,
    price: 0,
  },
};

const newOrderSchema = z.object({
  customerId: z.number().nonnegative(),
  status: z.enum(status, {
    required_error: REQUIRED_ERROR_MSG,
  }),
  products: z.array(orderProductSchema),
});

type NewOrder = z.infer<typeof newOrderSchema>;

const newOrderDefaultValues: NewOrder = {
  customerId: 0,
  status: status[0],
  products: [],
};

const orderSchema = newOrderSchema
  .extend({
    id: z.number().int().nonnegative(),
    customer: customerSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    deletedAt: z.coerce.date().nullable(),
  })
  .omit({ customerId: true });

type Order = z.infer<typeof orderSchema>;

const orderDefaultValues: Order = {
  ...newOrderDefaultValues,
  id: 0,
  customer: customerDefaultValues,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const updateOrderSchema = z.object({
  id: z.number().int().nonnegative(),
  customerId: z.number().int().nonnegative(),
  status: z.enum(status),
  products: z.array(
    z.object({
      quantity: z.number().int().positive(),
      weight: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});

type UpdateOrder = z.infer<typeof updateOrderSchema>;

export {
  newOrderDefaultValues,
  newOrderSchema,
  orderDefaultValues,
  orderProductDefaultValues,
  orderProductSchema,
  orderSchema,
  updateOrderSchema,
  type NewOrder,
  type Order,
  type OrderProduct,
  type UpdateOrder,
};
