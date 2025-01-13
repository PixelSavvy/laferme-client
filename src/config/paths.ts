export const appPaths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    logout: {
      path: "/auth/logout",
      getHref: (redirectTo?: string | null) =>
        `/auth/logout${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },
  app: {
    root: {
      path: "/",
      getHref: () => "/",
    },
    orders: {
      path: "/app/orders",
      getHref: () => "/app/orders",
    },
    freezone: {
      path: "/app/freezone",
      getHref: () => "/app/freezone",
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
    freezone: "/freezone-items",
    distribution: "/distribution-items",
  },
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    resetPassword: "/auth/reset-password",
  },
} as const;
