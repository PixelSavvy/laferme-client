import { allStatuses, stages, stagesObj, statusesObj } from "@/config";
import { customerSchema, newCustomerDefaultValues } from "@/features/customer";
import { orderProductSchema } from "@/features/products";
import { addDays } from "date-fns";
import { z } from "zod";

const orderSchema = z.object({
  // Order Info
  id: z.string(),
  customerId: z.string(),
  customer: customerSchema,
  status: z.enum(allStatuses),
  stage: z.enum(stages),

  // Notes
  note: z.string().nullable(),

  // For tracking how many times order has been updated in freezone
  updateCount: z.number().int().nonnegative(),

  // Order Products Info
  products: z.array(orderProductSchema),

  // Payment Info
  total: z.coerce.number().nonnegative(),

  // Timestamps
  // Handled by DB
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional(),

  // When the order is due to be prepared
  // If the prepareDueAt is not provided, it will be set to the next day
  prepareDueAt: z.coerce.date().optional(),
  // When the order was prepared
  preparedAt: z.coerce.date().nullable(),
  // When the order is due to be delivered (prepareDueAt + 1 day)
  deliverDueAt: z.coerce.date().optional(),
  // When the order was delivered
  deliveredAt: z.coerce.date().nullable(),
});

const newOrderSchema = orderSchema
  .omit({
    id: true,
    note: true,
  })
  .superRefine((data) => {
    // If prepareDueAt is not provided, set it to today
    if (!data.prepareDueAt) {
      data.prepareDueAt = new Date();
    }
    // Set deliverDueAt to the next day of prepareDueAt
    data.deliverDueAt = addDays(data.prepareDueAt, 1);
    return data;
  });

type Order = z.infer<typeof orderSchema>;
type NewOrder = z.infer<typeof newOrderSchema>;

// New Order  default values for form
const newOrderDefaultValues: NewOrder = {
  customer: {
    id: "",
    ...newCustomerDefaultValues,
  },
  customerId: "",
  status: statusesObj.all.ACCEPTED,
  stage: stagesObj.ORDER,

  updateCount: 0,
  products: [],
  total: 0,

  // timestamps
  preparedAt: null,
  deliveredAt: null,
};

export {
  newOrderDefaultValues,
  newOrderSchema,
  orderSchema,
  type NewOrder,
  type Order,
};
