export const paymentOptions: { [key: number]: string } = {
  2000: "CASH",
  2001: "CONSIGNMENT",
  2002: "TRANSFER",
  2003: "TRIAL",
  2004: "DISCOUNT",
};

export const orderStatus: { [key: number]: string } = {
  3000: "PREPARING",
  3001: "PREPARED",
  3002: "CANCELLED",
  3003: "RETURNED",
};

export const distributionStatus: { [key: number]: string } = {
  3000: "TODELIVER",
  3001: "DELIVERING",
  3002: "DELIVERED",
};

export const priceIndex: { [key: number]: string } = {
  1: "TR1",
  2: "TR2",
  3: "TR3",
  4: "TR4",
  5: "TR5",
  6: "TRC",
  7: "TRD",
};

export const paymentOptionValues = [
  { label: "ქეში", value: "2000" },
  { label: "ტრანსფერი", value: "2001" },
  { label: "კონსიგნაცია", value: "2002" },
  { label: "სატესტო", value: "2003" },
  { label: "ფასდაკლებული", value: "2004" },
];

export const priceIndexes = [
  { label: "TR1", value: "1" },
  { label: "TR2", value: "2" },
  { label: "TR3", value: "3" },
  { label: "TR4", value: "4" },
  { label: "TR5", value: "5" },
  { label: "TRD", value: "6" },
  { label: "TRC", value: "7" },
];

export const invoiceOptions = [
  { label: "კი", value: "1" },
  { label: "არა", value: "0" },
];
