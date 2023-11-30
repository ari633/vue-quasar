const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/view/",
    name: "view",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "new",
        component: () => import("pages/FormPage.vue"),
        children: [
          {
            path: "detail/:id",
            name: "update",
            component: () => import("pages/FormPage.vue"),
          },
        ],
      },
    ],
  },

  // {
  //   path: "/new",
  //   name: "new",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [{ path: "/new", component: () => import("pages/FormPage.vue") }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
