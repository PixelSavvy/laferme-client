import { z } from "zod";

const surplusProductSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  quantity: z.coerce.number(),
  weight: z.coerce.number(),
});

const surplusSchema = z.object({
  id: z.coerce.number(),
  orderId: z.coerce.number(),
  products: z.array(surplusProductSchema),
  createdAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
});

const newSurplusSchema = surplusSchema.omit({ id: true });

type Surplus = z.infer<typeof surplusSchema>;
type NewSurplus = z.infer<typeof newSurplusSchema>;

export { newSurplusSchema, surplusSchema, type NewSurplus, type Surplus };
