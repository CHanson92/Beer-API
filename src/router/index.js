import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home')
    },
    {
        path: '/all-beers',
        name: 'all beers',
        component: () =>
            import(/* webpackChunkName: "AllBeers" */ '../views/AllBeers')
    },
    {
        path: '/random-beer',
        name: 'random beer',
        component: () =>
            import(/* webpackChunkName: "RandomBeer" */ '../views/RandomBeer')
    },
    {
        path: '/find-beer',
        name: 'find beer',
        component: () =>
            import(/* webpackChunkName: "FindBeer" */ '../views/FindBeer')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: '/Beer-API/',
    routes
});

export default router;
