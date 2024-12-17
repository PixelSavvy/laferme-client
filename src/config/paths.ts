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
      path: "/orders/current",
      getHref: () => "/orders/current",
    },
    freezone: {
      path: "/freezone",
      getHref: () => "/freezone",
    },
    distribution: {
      path: "/distribution",
      getHref: () => "/distribution",
    },
    customers: {
      path: "/customers",
      getHref: () => "/customers",
    },
    products: {
      path: "/products",
      getHref: () => "/products",
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
