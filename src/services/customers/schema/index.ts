import { paymentOptions, priceIndex } from "@/config";
import { productDefaultValues, productSchema } from "@/services/products";
import { z } from "zod";

const REQUIRED_ERROR_MSG = "სავალდებულოა";
const GEORGIAN_REGEX = new RegExp(
  "^[ა-ჰ\\s.,?!:;\"'()\\-+@#$%^&*<>[\\]{}|\\\\/]+$",
);

const customerProductsSchema = productSchema;

type CustomerProduct = z.infer<typeof customerProductsSchema>;

const customerProductsDefaultValues: CustomerProduct = productDefaultValues;

const newCustomerSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: REQUIRED_ERROR_MSG,
    })
    .regex(GEORGIAN_REGEX, {
      message: "მხოლოდ ქართული ასოები",
    }),

  priceIndex: z.enum(priceIndex, {
    required_error: REQUIRED_ERROR_MSG,
  }),

  paymentOption: z.enum(paymentOptions, {
    required_error: REQUIRED_ERROR_MSG,
  }),
  phone: z
    .string({})
    .min(9, {
      message: "მინიმუმ 9 სიმბოლო",
    })
    .max(9, {
      message: "მაქსიმუმ 9 სიმბოლო",
    }),
  email: z
    .string()
    .min(1, {
      message: REQUIRED_ERROR_MSG,
    })
    .email({ message: "არასწორი ფორმატი" }),
  needInvoice: z.enum(["0", "1"]),
  products: z.array(customerProductsSchema).optional(),
});

type NewCustomer = z.infer<typeof newCustomerSchema>;

const newCustomerDefaultValues: NewCustomer = {
  name: "",
  priceIndex: "TR1",
  paymentOption: "CASH",
  phone: "",
  email: "",
  needInvoice: "1",
  products: [],
};

const customerSchema = newCustomerSchema.extend({
  id: z.number().nonnegative(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
});

type Customer = z.infer<typeof customerSchema>;

const customerDefaultValues: Customer = {
  ...newCustomerDefaultValues,
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export {
  customerDefaultValues,
  customerProductsDefaultValues,
  customerProductsSchema,
  customerSchema,
  newCustomerDefaultValues,
  newCustomerSchema,
  type Customer,
  type CustomerProduct,
  type NewCustomer,
};
