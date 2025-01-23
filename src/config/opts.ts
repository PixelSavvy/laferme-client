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
  ALL: "ALL",
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
  all: {
    ACCEPTED: "ACCEPTED",
    PREPARING: "PREPARING",
    PREPARED: "PREPARED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  },
  order: {
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  },
  cleanzone: {
    PREPARING: "PREPARING",
    PREPARED: "PREPARED",
  },

  distribution: {
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  },
};

export const allStatuses = Object.values(statusesObj.all) as [
  string,
  ...string[],
];

export const orderStatuses = Object.values(statusesObj.order) as [
  string,
  ...string[],
];
export const cleanzoneStatuses = Object.values(statusesObj.cleanzone) as [
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

export const remainderProductItems = [
  {
    value: "Q1",
    label: "ქათამი - თავფეხით, ჯიგარით",
  },
  {
    value: "V1",
    label: "ვარია - თავფეხით, ჯიგრით",
  },
  {
    value: "J1",
    label: "წიწილა - თავფეხით, ჯიგარით",
  },
  {
    value: "Q2",
    label: "ქათამი - უთავფეხოდ",
  },
  {
    value: "V2",
    label: "ვარია - უთავფეხოდ",
  },
  {
    value: "J2",
    label: "წიწილა - უთავფეხოდ",
  },
  {
    value: "QM1",
    label: "მკერდი",
  },
  {
    value: "QM2",
    label: "ფილე",
  },
  {
    value: "QB1",
    label: "ბარკალი, ბარკლის ძირით",
  },
  {
    value: "QF1",
    label: "ფრთა, ფრთის ძირით",
  },
  {
    value: "G2",
    label: "გულ-ღვიძლი",
  },
  {
    value: "G3",
    label: "კუჭი",
  },
  {
    value: "K1",
    label: "კისერი + კარკასი",
  },
  {
    value: "X1",
    label: "ნარჩენი",
  },
];
