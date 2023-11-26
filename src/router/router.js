import { createRouter, createWebHistory } from "vue-router";
// import { lazyLoad } from '@/lazy.js'

let router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/main',
            redirect: '/',
            name: 'zero',
            component: () => import('@/pages/Main.vue'),
            children: [
                {
                    path: '/',
                    name: "main",
                    component: () => import('@/views/MainPage.vue')
                },
                {
                    path: '/services/sposoby-oplaty',
                    name: 'sposob',
                    component: () => import("@/views/OplataPage.vue")
                },
                {
                    path: '/services/vozvrat-tovara',
                    name: 'vozvrat',
                    component: () => import("@/views/VozvratPage.vue")
                },
                {
                    path: '/services/kak-sdelat-zakaz',
                    name: 'create-manual',
                    component: () => import("@/views/CreateOrderManual.vue")
                },
                {
                    path: '/services/pravila-polzovaniya-torgovoy-ploshchadkoy',
                    name: 'pravilapol',
                    component: () => import("@/views/PravilaPol.vue")
                },
                {
                    path: '/services/pravila-prodazhi',
                    name: 'pravilapr',
                    component: () => import("@/views/PravilaPr.vue")
                },
                {
                    path: '/lk',
                    name: 'lk',
                    component: () => import("@/views/LkPage.vue")
                },
                {
                    path: '/lk/mywallet/purchases',
                    name: 'balance',
                    component: () => import("@/views/BalancePage.vue")
                },
                {
                    path: '/services/o-nas',
                    name: 'about-us',
                    component: () => import("@/views/AboutUs.vue")
                },
                {
                    path: '/lk/details',
                    name: 'details',
                    component: () => import("@/views/InfoDetails.vue")
                },
                {
                    path: '/lk/myorders/archive',
                    name: 'orders',
                    component: () => import("@/views/OrdersPage.vue")
                },
                {
                    path: '/lk/myorders/delivery',
                    name: 'delivery',
                    component: () => import("@/views/DeliveryPage.vue")
                },
                {
                    path: '/lk/refund',
                    name: 'refund',
                    component: () => import("@/views/ReturnPage.vue")
                },
                {
                    path: '/lk/chats',
                    name: 'chats',
                    component: () => import("@/views/ChatsPage.vue")
                },
                {
                    path: '/lk/chats/messenger/:id',
                    name: 'messenger',
                    component: () => import("@/views/MessengerPage.vue")
                },
                {
                    path: '/lk/discussion/feedback',
                    name: 'reviews',
                    component: () => import("@/views/ReviewsPage.vue")
                },
                {
                    path: '/catalog/:article',
                    name: 'product',
                    component: () => import("@/views/ProductPage.vue")
                },
                {
                    path: '/cart',
                    name: 'cart',
                    component: () => import("@/views/CartPage.vue")
                },
            ]
        },
        {
            path: '/seller',
            name: 'seller',
            redirect: '/seller/statistics',
            component: () => import('@/pages/Seller.vue'),
            children: [
                {
                    path: '/seller/manage',
                    name: 'manage',
                    component: () => import("@/views/SellManage.vue")
                },
                {
                    path: '/seller/chats',
                    name: 'sellchats',
                    component: () => import("@/views/SellChats.vue")
                },
                {
                    path: '/seller/chats/messenger/:id',
                    name: 'sellmessenger',
                    component: () => import("@/views/SellMessenger.vue")
                },
                {
                    path: '/seller/refund',
                    name: 'sellrefund',
                    component: () => import("@/views/SellRefunds.vue")
                },
                {
                    path: '/seller/statistics',
                    name: 'statistics',
                    component: () => import("@/views/SellStatistics.vue")
                },
            ]
        },
        {
            path: '/seller/login',
            name: 'sellLogin',
            component: () => import("@/views/SellerLog.vue")

        },
        {
            path: '/seller/sign-up',
            name: 'sellSignup',
            component: () => import("@/views/SellerSignup.vue")
        },
        {
            path: '/security/login',
            name: 'login',
            component: () => import("@/views/LoginPage.vue")

        },
        {
            path: '/security/sign-up',
            name: 'signup',
            component: () => import("@/views/SignupPage.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: () => import("@/views/NotFoundPage.vue")
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { ...savedPosition, behavior: 'smooth' } || new Promise((resolve) => {
            setTimeout(() => resolve({ top: 0 }), 100)
        })
    }
})

router.beforeEach((from, to, next) => {
    let token = localStorage.token || localStorage.getItem('token')
    let tokenSell = localStorage.tokenSell || localStorage.getItem('tokenSell')

    let securityLogin = [
        'lk',
        'cart',
        'reviews',
        'messenger',
        'chats',
        'refund',
        'delivery',
        'orders',
        'details',
        'balance'
    ]

    let securityLoginSeller = [
        'statistics',
        'sellrefund',
        'sellchats',
        'sellmessenger',
        'manage'
    ]

    let additionalRoutes = [
        'cart',
        'main',
        'product'
    ]

    if (
        (!token && securityLogin.includes(from.name)) ||
        (tokenSell && securityLogin.includes(from.name)) ||
        (tokenSell && additionalRoutes.includes(from.name))
    ) {
        router.push('/security/login')
    } else if (
        (!token && !tokenSell && securityLoginSeller.includes(from.name)) ||
        (token && securityLoginSeller.includes(from.name))
    ) {
        router.push('/seller/login')
    } else {
        next()
    }
})

export default router