import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        component: () => import("@/components/Personal.vue")
      },
      {
        path: "/seat",
        component: () => import("@/components/Seats.vue")
      },
      {
        path: "/payment",
        component: () => import("@/components/Payment.vue")
      },
      {
        path: "/confirmation",
        component: () => import("@/components/Confirmation.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = "TktBooking";
  next();
});

export default router;
