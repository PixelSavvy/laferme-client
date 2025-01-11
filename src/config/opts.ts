export const paymentOptions = [
  "CASH",
  "CONSIGNMENT",
  "TRANSFER",
  "TRIAL",
  "DISCOUNT",
] as [string, ...string[]];

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

export const statuses = {
  order: {
    ACCEPTED: "1000",
    PREPARING: "1001",
    PREPARED: "1002",
    READYTODELIVER: "1003",
    DELIVERING: "1004",
    DELIVERED: "1005",
    CANCELLED: "1006",
    RETURNED: "1007",
  },
  freezone: {
    ACCEPTED: "1000",
    PREPARING: "1001",
    PREPARED: "1002",
  },

  distribution: {
    READYTODELIVER: "1003",
    DELIVERING: "1004",
    DELIVERED: "1005",
    CANCELLED: "1006",
    RETURNED: "1007",
  },
};

export const orderStatuses = Object.values(statuses.order) as [
  string,
  ...string[],
];

export const freezoneStatuses = Object.values(statuses.freezone) as [
  string,
  ...string[],
];

export const distributionStatuses = Object.values(statuses.distribution) as [
  string,
  ...string[],
];
