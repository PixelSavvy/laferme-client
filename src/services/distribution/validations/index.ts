import { distributionStatuses, statuses } from "@/config";
import { customerDefaultValues, customerSchema } from "@/services/customers";
import { productSchema } from "@/services/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";

const distributionItemProductsSchema = productSchema
  .omit({
    prices: true,
    hasVAT: true,
  })
  .extend({
    distributionDetails: z.object({
      price: z.coerce.number({ required_error: REQUIRED_ERROR_MSG }).positive({
        message: "მინ. 1 ₾",
      }),
      adjustedWeight: z.coerce
        .number({
          message: "მინ. 1 კგ",
        })
        .nonnegative(),
      distributedWeight: z.coerce
        .number({
          message: "მინ. 1 კგ",
        })
        .nonnegative(),
    }),
  });

const distributionItemSchema = z.object({
  id: z.number().nonnegative(),
  freezoneItemId: z
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .nonnegative(),
  status: z.enum(distributionStatuses, {
    required_error: REQUIRED_ERROR_MSG,
  }),
  total: z.coerce.number().nonnegative(),
  products: z.array(distributionItemProductsSchema),
  customer: customerSchema,
  dueDateAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
});

type DistributionItemProducts = z.infer<typeof distributionItemProductsSchema>;

type DistributionItem = z.infer<typeof distributionItemSchema>;

const distributionItemDefaultValues: DistributionItem = {
  id: 0,
  freezoneItemId: 0,
  status: statuses.all.READYTODELIVER,
  products: [],
  customer: customerDefaultValues,
  total: 0,
  dueDateAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const updateDistributionItemSchema = z.object({
  id: z.number().int().nonnegative(),
  freezoneItemId: z.number().int().nonnegative(),
  status: z.enum(distributionStatuses),
  products: z.array(
    z.object({
      price: z.coerce.number().positive(),
      adjustedWeight: z.coerce.number().int().positive(),
      distributedWeight: z.coerce.number().int().positive(),
    }),
  ),
  dueDateAt: z.date().nullable(),
  total: z.coerce.number().nonnegative(),
});

type UpdateDistributionItem = z.infer<typeof updateDistributionItemSchema>;

export {
  distributionItemDefaultValues,
  distributionItemProductsSchema,
  distributionItemSchema,
  updateDistributionItemSchema,
  type DistributionItem,
  type DistributionItemProducts,
  type UpdateDistributionItem,
};
