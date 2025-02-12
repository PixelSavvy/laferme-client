import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულო";
const GEORGIAN_REGEX = new RegExp("^[ა-ჰ\\-,\\s]+$");
const prices = z.object(
  {
    TR1: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TR2: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TR3: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TR4: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TR5: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TRC: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TRD: z.coerce
      .number({
        required_error: REQUIRED_ERROR_MSG,
      })
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
  },
  {
    required_error: REQUIRED_ERROR_MSG,
  },
);

const productSchema = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: REQUIRED_ERROR_MSG,
    })
    .regex(GEORGIAN_REGEX, {
      message: "მხოლოდ ქართული, მძიმე ან/და ტირე",
    }),
  productCode: z.string({
    required_error: REQUIRED_ERROR_MSG,
  }),
  hasVAT: z.enum(["0", "1"], {
    required_error: REQUIRED_ERROR_MSG,
  }),
  prices: prices,
});

const newProductSchema = productSchema.omit({ id: true });

const orderProductSchema = z
  .object({
    id: z.string(),
    price: z.coerce.number().nonnegative(),

    quantity: z.coerce.number().nonnegative(),
    preparedQuantity: z.coerce.number().nonnegative().default(0),

    weight: z.coerce.number().nonnegative(),
    preparedWeight: z.coerce.number().nonnegative().default(0),
    distributedWeight: z.coerce.number().nonnegative().default(0),
  })
  .extend(productSchema.pick({ title: true, productCode: true }).shape);

type Product = z.infer<typeof productSchema>;
type NewProduct = z.infer<typeof newProductSchema>;
type OrderProduct = z.infer<typeof orderProductSchema>;

const newProductDefaultValues: NewProduct = {
  title: "",
  productCode: "",
  hasVAT: "0",
  prices: {
    TR1: 0,
    TR2: 0,
    TR3: 0,
    TR4: 0,
    TR5: 0,
    TRC: 0,
    TRD: 0,
  },
};

export {
  newProductDefaultValues,
  newProductSchema,
  orderProductSchema,
  productSchema,
  type NewProduct,
  type OrderProduct,
  type Product,
};
