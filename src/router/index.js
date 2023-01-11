import {createRouter, createWebHashHistory} from 'vue-router';
import LayoutDefault from '@/layout/default/LayoutDefault.vue';
import HomeView from '@/view/home/HomeView.vue';
import MyView from '@/view/my/MyView.vue';
import OrderView from '@/view/order/OrderView.vue';
import CartView from '@/view/cart/CartView.vue';
import LoginView from '@/view/login/LoginView.vue';
import RegisterView from '@/view/register/RegisterView.vue';
import UserView from '@/view/user/UserView.vue';
import {useAuthStore} from '@/store/auth.js';
import NotFoundView from '@/view/error/NotFoundView.vue';

const publicRoute = ['login', 'index', 'home', 'cart', 'order', 'my', 'register'];

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        component: LayoutDefault,
        children: [
            {
                path: 'home',
                name: 'home',
                component: HomeView
            },
            {
                path: 'cart',
                name: 'cart',
                component: CartView
            },
            {
                path: 'order',
                name: 'order',
                component: OrderView
            },
            {
                path: 'my',
                name: 'my',
                component: MyView
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/user',
        name: 'user',
        component: UserView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

/**
 * 路由拦截
 */
router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    if (!publicRoute.includes(to.name) && !authStore.token) {
        return {
            name: 'login',
            query: {
                redirect: from.name
            }
        };
    }
});

export default router;