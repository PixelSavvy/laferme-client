import { z } from "zod";

const newSurplusProductSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  quantity: z.coerce.number(),
  weight: z.coerce.number(),
  identificator: z.string(),
});

const surplusProductSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  details: z.object({
    quantity: z.coerce.number(),
    weight: z.coerce.number(),
    identificator: z.string(),
  }),
});

const surplusSchema = z.object({
  id: z.coerce.number(),
  orderId: z.coerce.number(),
  products: z.array(surplusProductSchema),
  createdAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
});

const newSurplusSchema = surplusSchema
  .omit({ id: true, products: true })
  .extend({
    products: z.array(newSurplusProductSchema),
  });

type Surplus = z.infer<typeof surplusSchema>;
type NewSurplus = z.infer<typeof newSurplusSchema>;

type SurplusData = {
  fresh: Surplus[];
  medium: Surplus[];
  expired: Surplus[];
  old: Surplus[];
};

export {
  newSurplusSchema,
  surplusSchema,
  type NewSurplus,
  type Surplus,
  type SurplusData,
};
