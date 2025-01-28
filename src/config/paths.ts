export const appPaths = {
  auth: {
    login: {
      path: "/",
      getHref: (redirectTo?: string | null) =>
        `/${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    logout: {
      path: "/auth/logout",
      getHref: (redirectTo?: string | null) =>
        `/auth/logout${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },
  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    surplus: {
      path: "/app/surplus",
      getHref: () => "/app/surplus",
    },
    orders: {
      path: "/app/orders",
      getHref: () => "/app/orders",
    },
    cleanzone: {
      path: "/app/cleanzone",
      getHref: () => "/app/cleanzone",
    },
    distribution: {
      path: "/app/distribution",
      getHref: () => "/app/distribution",
    },
    customers: {
      path: "/app/customers",
      getHref: () => "/app/customers",
    },
    products: {
      path: "/app/products",
      getHref: () => "/app/products",
    },
  },
} as const;

export const apiPaths = {
  root: "/api",
  app: {
    product: "/products",
    customer: "/customers",
    order: "/orders",
    surplus: "/surplus",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    resetPassword: "/auth/reset-password",
    me: "/auth/me",
  },
  excel: {
    order: "/excel/orders",
    product: "/excel/products",
    distribution: "/excel/distribution",
    cleanzone: "/excel/cleanzone",
    customer: "/excel/customers",
    surplus: "/excel/surplus",
  },
} as const;
