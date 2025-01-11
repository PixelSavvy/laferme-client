import { Product } from "@/services/products";
import _ from "lodash";

export const isUpdated = (original: Product, updated: Product) => {
  console.log("original", original);
  console.log("updated", updated);
  console.log("is updated", _.isEqual(original, updated));

  return {};
};
