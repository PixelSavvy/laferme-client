import { freezoneStatuses, orderStatuses, statuses } from "@/config";
import { customerDefaultValues, customerSchema } from "@/services/customers";
import { newOrderDefaultValues } from "@/services/orders";

import { productSchema } from "@/services/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";

const freezoneItemProductsSchema = productSchema
  .omit({
    prices: true,
    hasVAT: true,
  })
  .extend({
    freezoneDetails: z.object({
      quantity: z.coerce
        .number({ required_error: REQUIRED_ERROR_MSG })
        .int()
        .nonnegative(),
      weight: z.coerce
        .number({ required_error: REQUIRED_ERROR_MSG })
        .nonnegative(),
      price: z.coerce
        .number({ required_error: REQUIRED_ERROR_MSG })
        .positive({ message: "მინ. 1 ₾" }),
      adjustedWeight: z.coerce
        .number({
          required_error: REQUIRED_ERROR_MSG,
        })
        .nonnegative(),
      adjustedQuantity: z.coerce
        .number({
          required_error: REQUIRED_ERROR_MSG,
        })
        .int()
        .nonnegative(),
    }),
  });

const freezoneItemSchema = z.object({
  id: z.number().nonnegative(),
  orderId: z
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .nonnegative(),
  status: z.enum(freezoneStatuses, {
    required_error: REQUIRED_ERROR_MSG,
  }),
  isUpdated: z.boolean(),
  products: z.array(freezoneItemProductsSchema),
  customer: customerSchema,
  dueDateAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

type FreezoneItemProducts = z.infer<typeof freezoneItemProductsSchema>;

type FreezoneItem = z.infer<typeof freezoneItemSchema>;

const freezoneItemProductsDefaultValues = {
  ...newOrderDefaultValues,
  adjustedWeight: 0,
  adjustedQuantity: 0,
};

const freezoneItemDefaultValues: FreezoneItem = {
  orderId: 0,
  products: [],
  status: statuses.freezone.ACCEPTED,
  id: 0,
  customer: customerDefaultValues,
  dueDateAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  isUpdated: false,
};

const updateFreezoneItemSchema = z.object({
  id: z.number().int().nonnegative(),
  orderId: z.number().int().nonnegative(),
  status: z.enum(orderStatuses),
  products: z.array(
    z.object({
      quantity: z.number().int().positive(),
      weight: z.number().int().positive(),
      price: z.number().positive(),
      adjustedWeight: z.number().int().positive(),
      adjustedQuantity: z.number().int().positive(),
    }),
  ),
  dueDateAt: z.coerce.date().nullable(),
  isUpdated: z.boolean(),
});

type UpdateFreezoneItem = z.infer<typeof updateFreezoneItemSchema>;

export {
  freezoneItemDefaultValues,
  freezoneItemProductsDefaultValues,
  freezoneItemProductsSchema,
  freezoneItemSchema,
  updateFreezoneItemSchema,
  type FreezoneItem,
  type FreezoneItemProducts,
  type UpdateFreezoneItem,
};
