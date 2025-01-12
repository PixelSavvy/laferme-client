import { orderStatuses, statuses } from "@/config";
import { customerSchema } from "@/services/customers";
import { productSchema } from "@/services/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";

// Order Product schemas
const newOrderProductSchema = z.object({
  productId: z.number().int().nonnegative(),
  price: z.coerce
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .positive({
      message: "მინ. 1 ₾",
    }),
  quantity: z.coerce
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .int({
      message: "მთელი",
    })
    .nonnegative(),

  weight: z.coerce
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .nonnegative(),
});

const orderProductSchema = productSchema
  .pick({
    title: true,
    id: true,
    productCode: true,
  })
  .extend({
    orderDetails: newOrderProductSchema.omit({
      productId: true,
    }),
  });

const updateOrderProductSchema = productSchema
  .pick({
    title: true,
    productCode: true,
  })
  .extend(newOrderProductSchema.shape);

// Order Product types
type NewOrderProduct = z.infer<typeof newOrderProductSchema>;
type OrderProduct = z.infer<typeof orderProductSchema>;
type UpdateOrderProduct = z.infer<typeof updateOrderProductSchema>;

// Order schemas
const newOrderSchema = z.object({
  customerId: z.number().int().nonnegative(),
  products: z.array(newOrderProductSchema),
  status: z.enum(orderStatuses),
  dueDateAt: z.coerce.date().nullable(),
});

const updateOrderSchema = z.object({
  id: z.number().int().nonnegative(),
  products: z.array(updateOrderProductSchema),
  status: z.enum(orderStatuses),
  dueDateAt: z.coerce.date().nullable(),
});

const orderSchema = z.object({
  id: z.number().int().nonnegative(),
  customer: customerSchema,
  products: z.array(orderProductSchema),
  status: z.enum(orderStatuses),
  dueDateAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

// Order types
type NewOrder = z.infer<typeof newOrderSchema>;
type UpdateOrder = z.infer<typeof updateOrderSchema>;
type Order = z.infer<typeof orderSchema>;

// New Order  default values for form

const newOrderDefaultValues: NewOrder = {
  customerId: 0,
  products: [],
  status: statuses.all.ACCEPTED,
  dueDateAt: null,
};

export type {
  NewOrder,
  NewOrderProduct,
  Order,
  OrderProduct,
  UpdateOrder,
  UpdateOrderProduct,
};

export {
  newOrderDefaultValues,
  newOrderProductSchema,
  newOrderSchema,
  orderProductSchema,
  orderSchema,
  updateOrderProductSchema,
  updateOrderSchema,
};
