import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულო";
const GEORGIAN_REGEX = new RegExp("^[ა-ჰ\\-,\\s]+$");

const pricesSchema = z.object(
  {
    TR1: z.coerce
      .number({
        message: "ცარიელი",
      })

      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),

    TR2: z.coerce
      .number({
        message: "ცარიელი",
      })
      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი რიცხვი",
      }),
    TR3: z.coerce
      .number({
        message: "ცარიელი",
      })
      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი",
      }),
    TR4: z.coerce
      .number({
        message: "ცარიელი",
      })
      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი",
      }),
    TR5: z.coerce
      .number({
        message: "ცარიელი",
      })
      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი",
      }),
    TRC: z.coerce
      .number({
        message: "ცარიელი",
      })
      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი",
      }),
    TRD: z.coerce
      .number({
        message: "ცარიელი",
      })
      .multipleOf(0.01)
      .nonnegative({
        message: "დადებითი",
      }),
  },
  {
    required_error: REQUIRED_ERROR_MSG,
  },
);

const newProductSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: REQUIRED_ERROR_MSG,
    })
    .regex(GEORGIAN_REGEX, {
      message: "ქართული ასოები",
    }),
  productCode: z.string().min(1, {
    message: REQUIRED_ERROR_MSG,
  }),
  hasVAT: z.enum(["0", "1"], {
    message: REQUIRED_ERROR_MSG,
  }),
  prices: pricesSchema,
});

const productSchema = newProductSchema.extend({
  id: z
    .number({
      required_error: REQUIRED_ERROR_MSG,
    })
    .nonnegative(),
});

type NewProduct = z.infer<typeof newProductSchema>;
type Product = z.infer<typeof productSchema>;

type ProductsTableFormData = {
  products: Product[];
};

const newProductDefaultValues: NewProduct = {
  title: "",
  productCode: "",
  hasVAT: "1",
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

const productDefaultValues: Product = {
  id: 0,
  ...newProductDefaultValues,
};

export {
  newProductDefaultValues,
  newProductSchema,
  productDefaultValues,
  productSchema,
  type NewProduct,
  type Product,
  type ProductsTableFormData,
};
