import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/all-beers',
        name: 'all beers',
        component: () =>
            import(
                /* webpackChunkName: "random beer" */ '../views/AllBeers.vue'
            )
    },
    {
        path: '/random-beer',
        name: 'random beer',
        component: () =>
            import(
                /* webpackChunkName: "random beer" */ '../views/RandomBeer.vue'
            )
    },
    {
        path: '/find-beer',
        name: 'find beer',
        component: () =>
            import(/* webpackChunkName: "find beer" */ '../views/FindBeer.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
