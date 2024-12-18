export const paymentOptions = [
  "CASH",
  "CONSIGNMENT",
  "TRANSFER",
  "TRIAL",
  "DISCOUNT",
] as [string, ...string[]];

export const orderStatus = [
  "PREPARING",
  "PREPARED",
  "CANCELLED",
  "RETURNED",
] as [string, ...string[]];

export const distributionStatus = ["TODELIVER", "DELIVERING", "DELIVERED"] as [
  string,
  ...string[],
];

export const priceIndex = ["TR1", "TR2", "TR3", "TR4", "TR5", "TRD", "TRC"] as [
  string,
  ...string[],
];

export const paymentOptionValues = [
  { label: "ქეში", value: "CASH" },
  { label: "ტრანსფერი", value: "TRANSFER" },
  { label: "კონსიგნაცია", value: "CONSIGNMENT" },
  { label: "სატესტო", value: "TRIAL" },
  { label: "ფასდაკლებული", value: "DISCOUNT" },
];

export const priceIndexes = [
  { label: "TR1", value: "TR1" },
  { label: "TR2", value: "TR2" },
  { label: "TR3", value: "TR3" },
  { label: "TR4", value: "TR4" },
  { label: "TR5", value: "TR5" },
  { label: "TRD", value: "TRC" },
  { label: "TRC", value: "TRD" },
];

export const invoiceOptions = [
  { label: "კი", value: "1" },
  { label: "არა", value: "0" },
];
