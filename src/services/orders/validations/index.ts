import { orderStatus } from "@/config";
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
    .positive({
      message: "მინ. 1 ც",
    }),

  weight: z.coerce
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .positive({
      message: "მინ. 1 კგ",
    }),
});

const orderProductSchema = productSchema
  .pick({
    title: true,
    id: true,
    productCode: true,
  })
  .extend({
    orderDetails: newOrderProductSchema,
  });

const updateOrderProductSchema = newOrderProductSchema;

// Order Product types
type NewOrderProduct = z.infer<typeof newOrderProductSchema>;
type OrderProduct = z.infer<typeof orderProductSchema>;
type UpdateOrderProduct = z.infer<typeof updateOrderProductSchema>;

// Order schemas
const newOrderSchema = z.object({
  customerId: z.number().int().nonnegative(),
  products: z.array(newOrderProductSchema),
  status: z.enum(orderStatus).default(orderStatus[0]),
});

const updateOrderSchema = z.object({
  id: z.number().int().nonnegative(),
  products: z.array(updateOrderProductSchema),
});

const orderSchema = z.object({
  id: z.number().int().nonnegative(),
  customer: customerSchema,
  products: z.array(orderProductSchema),
  status: z.enum(orderStatus),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

const updateOrderStatusSchema = z.object({
  id: z.number().int().nonnegative(),
  status: z.enum(orderStatus),
});

// Order types
type NewOrder = z.infer<typeof newOrderSchema>;
type UpdateOrder = z.infer<typeof updateOrderSchema>;
type Order = z.infer<typeof orderSchema>;
type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>;

// New Order  default values

const newOrderDefaultValues: NewOrder = {
  customerId: 0,
  products: [],
  status: orderStatus[0],
};

export type {
  NewOrder,
  NewOrderProduct,
  Order,
  OrderProduct,
  UpdateOrder,
  UpdateOrderProduct,
  UpdateOrderStatus,
};

export {
  newOrderDefaultValues,
  newOrderProductSchema,
  newOrderSchema,
  orderProductSchema,
  orderSchema,
  updateOrderProductSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
};
