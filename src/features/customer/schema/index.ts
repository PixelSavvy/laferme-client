import { customerTypes, paymentMethods, priceIndexes } from "@/config";
import { productSchema } from "@/features/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";
const WRONG_FORMAT_ERROR_MSG = "არასწორი ფორმატი";
const GEORGIAN_REGEX = new RegExp(
  "^[ა-ჰ\\s.,?!:;\"'()\\-+@#$%^&*<>[\\]{}|\\\\/]+$",
);

const contactPerson = z.object({
  name: z.string().regex(GEORGIAN_REGEX, {
    message: "მხოლოდ ქართული ასოები",
  }),
  position: z.string(),
  phone: z.string(),
  email: z.string().email({ message: WRONG_FORMAT_ERROR_MSG }),
});

const customerSchema = z.object({
  id: z.coerce.number().int().nonnegative(),

  // Select Fields
  priceIndex: z.enum(priceIndexes),
  paymentMethod: z.enum(paymentMethods),
  paysVAT: z.enum(["0", "1"]),
  needsInvoice: z.enum(["0", "1"], {
    message: REQUIRED_ERROR_MSG,
  }),
  type: z.enum(customerTypes),

  // Customer Info
  name: z.string().regex(GEORGIAN_REGEX, {
    message: "მხოლოდ ქართული ასოები",
  }),
  identificationNumber: z
    .string()
    .min(9, {
      message: "მინიმუმ 9 სიმბოლო",
    })
    .max(11, {
      message: "მაქსიმუმ 11 სიმბოლო",
    }),

  address: z.string(),
  phone: z.string(),
  email: z.string().email({ message: WRONG_FORMAT_ERROR_MSG }),

  // Products
  products: z.array(productSchema).optional(),

  // Contact Person
  contactPerson: contactPerson,
});

const newCustomerSchema = customerSchema.omit({
  id: true,
});

type Customer = z.infer<typeof customerSchema>;
type NewCustomer = z.infer<typeof newCustomerSchema>;

const newCustomerDefaultValues: NewCustomer = {
  priceIndex: priceIndexes[0],
  paymentMethod: paymentMethods[0],
  paysVAT: "0",
  needsInvoice: "0",
  type: customerTypes[0],
  contactPerson: {
    name: "",
    position: "",
    phone: "",
    email: "",
  },
  address: "",
  email: "",
  identificationNumber: "",
  name: "",
  phone: "",
  products: [],
};

export {
  customerSchema,
  newCustomerDefaultValues,
  newCustomerSchema,
  type Customer,
  type NewCustomer,
};
