import { distributionStatus } from "@/config";
import { customerDefaultValues, customerSchema } from "@/services/customers";
import { productSchema } from "@/services/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";
const status = Object.values(distributionStatus) as [string, ...string[]];

const distributionItemProductsSchema = productSchema
  .omit({
    prices: true,
    hasVAT: true,
  })
  .extend({
    distributionDetails: z.object({
      price: z.coerce.number({ required_error: REQUIRED_ERROR_MSG }).positive(),
      adjustedWeight: z.coerce.number().nonnegative(),
      distributedWeight: z.coerce.number().int().nonnegative(),
    }),
  });

const distributionItemSchema = z.object({
  id: z.number().nonnegative(),
  freezoneItemId: z
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .nonnegative(),
  status: z.enum(status, {
    required_error: REQUIRED_ERROR_MSG,
  }),
  products: z.array(distributionItemProductsSchema),
  customer: customerSchema,

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
});

type DistributionItemProducts = z.infer<typeof distributionItemProductsSchema>;

type DistributionItem = z.infer<typeof distributionItemSchema>;

const distributionItemDefaultValues: DistributionItem = {
  id: 0,
  freezoneItemId: 0,
  status: status[0],
  products: [],
  customer: customerDefaultValues,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const updateDistributionItemSchema = z.object({
  id: z.number().int().nonnegative(),
  freezoneItemId: z.number().int().nonnegative(),
  status: z.enum(status),
  products: z.array(
    z.object({
      price: z.coerce.number().positive(),
      adjustedWeight: z.coerce.number().int().positive(),
      distributedWeight: z.coerce.number().int().positive(),
    })
  ),
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
