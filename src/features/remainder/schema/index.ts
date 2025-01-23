import { z } from "zod";

const remainderProductSchema = z.object({
  id: z.coerce.number(),
  productCode: z.string(),
  quantity: z.coerce.number(),
  weight: z.coerce.number(),
});

const remainderSchema = z.object({
  id: z.coerce.number(),
  orderId: z.coerce.number(),

  products: z.array(remainderProductSchema),

  createdAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
});

const newRemainderSchema = remainderSchema.omit({ id: true });

type RemainderProduct = z.infer<typeof remainderProductSchema>;
type Remainder = z.infer<typeof remainderSchema>;
type NewRemainder = z.infer<typeof newRemainderSchema>;

const newRemaindDefaultValues: NewRemainder = {
  orderId: 0,
  products: [],
  createdAt: null,
  expiresAt: null,
};

export {
  newRemaindDefaultValues,
  newRemainderSchema,
  remainderProductSchema,
  remainderSchema,
  type NewRemainder,
  type Remainder,
  type RemainderProduct,
};
