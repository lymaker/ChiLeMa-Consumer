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
import AddressView from '@/view/address/AddressView.vue';
import FormChild from '@/view/address/child/FormChild.vue';
import AddressChild from '@/view/address/child/AddressChild.vue';

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
        path: '/address',
        redirect: {
            name: 'address-form'
        },
        name: 'address',
        component: AddressView,
        children: [
            {
                path: 'form',
                name: 'address-form',
                component: FormChild
            },
            {
                path: 'select',
                name: 'address-select',
                component: AddressChild
            }
        ]
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
 * ????????????
 */
router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    const loginRoute = {
        name: 'login',
        query: {
            redirect: from.name
        }
    };
    if (publicRoute.includes(to.name)) {
        return true;
    }
    if (!authStore.token) {
        return loginRoute;
    }
    return authStore.check() || loginRoute;
});

export default router;