// Payment methods
export const paymentMethodsObj = {
  CASH: "CASH",
  CONSIGNMENT: "CONSIGNMENT",
  TRANSFER: "TRANSFER",
  TRIAL: "TRIAL",
  DISCOUNT: "DISCOUNT",
};

export const paymentMethods = Object.values(paymentMethodsObj) as [
  string,
  ...string[],
];

// Price indexes
export const priceIndexesObj = {
  TR1: "TR1",
  TR2: "TR2",
  TR3: "TR3",
  TR4: "TR4",
  TR5: "TR5",
  TRD: "TRD",
  TRC: "TRC",
};
export const priceIndexes = Object.values(priceIndexesObj) as [
  string,
  ...string[],
];

// Order stages
export const stagesObj = {
  ORDER: "ORDER",
  CLEANZONE: "CLEANZONE",
  DISTRIBUTION: "DISTRIBUTION",
  DELIVERED: "DELIVERED",
};

export const stages = Object.values(stagesObj) as [string, ...string[]];

// Customer types
export const customerTypesObj = {
  INDIVIDUAL: "INDIVIDUAL",
  SOLE_SMALL: "SOLE_SMALL",
  SOLE_STANDARD: "SOLE_STANDARD",
  LLC: "LLC",
};

export const customerTypes = Object.values(customerTypesObj) as [
  string,
  ...string[],
];

// Order statuses
export const statusesObj = {
  order: {
    ACCEPTED: "ACCEPTED",
    PREPARING: "PREPARING",
    PREPARED: "PREPARED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  },
  cleanZone: {
    ACCEPTED: "ACCEPTED",
    PREPARING: "PREPARING",
    PREPARED: "PREPARED",
    CANCELLED: "CANCELLED",
  },

  distribution: {
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  },
};

export const orderStatuses = Object.values(statusesObj.order) as [
  string,
  ...string[],
];
export const cleanZoneStatuses = Object.values(statusesObj.cleanZone) as [
  string,
  ...string[],
];
export const distributionStatuses = Object.values(statusesObj.distribution) as [
  string,
  ...string[],
];

// Selectable items
export const booleanItems = [
  { label: "კი", value: "1" },
  { label: "არა", value: "0" },
];

export const customerTypeItems = [
  {
    label: "ფიზიკური პირი",
    value: "INDIVIDUAL",
  },
  {
    label: "იდ. მეწარმე (მცირე)",
    value: "SOLE_SMALL",
  },
  {
    label: "იდ. მეწარმე (სტანდ.)",
    value: "SOLE_STANDARD",
  },
  {
    label: "შპს",
    value: "LLC",
  },
];

export const paymentMethodsItems = [
  {
    label: "ქეში",
    value: "CASH",
  },
  {
    label: "კონსიგნაცია",
    value: "CONSIGNMENT",
  },
  {
    label: "გადარიცხვა",
    value: "TRANSFER",
  },
  {
    label: "სატესტო",
    value: "TRIAL",
  },
  {
    label: "ფასდაკლება",
    value: "DISCOUNT",
  },
];

export const priceIndexesItems = [
  {
    label: "TR1",
    value: "TR1",
  },
  {
    label: "TR2",
    value: "TR2",
  },
  {
    label: "TR3",
    value: "TR3",
  },
  {
    label: "TR4",
    value: "TR4",
  },
  {
    label: "TR5",
    value: "TR5",
  },
  {
    label: "TRD",
    value: "TRD",
  },
  {
    label: "TRC",
    value: "TRC",
  },
];
