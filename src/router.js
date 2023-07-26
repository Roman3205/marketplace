import { createRouter, createWebHistory } from "vue-router";
import SignupPage from './views/SignupPage.vue'
import LoginPage from  './views/LoginPage.vue'
import MainPage from './views/MainPage.vue'
import OplataPage from './views/OplataPage.vue'
import VozvratPage from './views/VozvratPage.vue'
import PravilaPol from './views/PravilaPol.vue'
import PravilaPr from './views/PravilaPr.vue'
import SellLogin from './views/SellerLog.vue'
import SellSignup from  './views/SellerSignup.vue'
import NotFoundPage from './views/NotFoundPage.vue'
import LkPage from './views/LkPage.vue'
import BalancePage from './views/BalancePage.vue'
import AboutUs from './views/AboutUs.vue'
import InfoDetails from './views/InfoDetails.vue'
import ChatsPage from './views/ChatsPage.vue'
import MessengerPage from './views/MessengerPage.vue'
import ProductPage from './views/ProductPage.vue'
import CartPage from './views/CartPage.vue'
import ReviewsPage from './views/ReviewsPage.vue'
import OrdersPage from './views/OrdersPage.vue'
import ReturnPage from './views/ReturnPage.vue'
import DeliveryPage from './views/DeliveryPage.vue'
import SellStatistics from './views/SellStatistics.vue'
import SellRefunds from './views/SellRefunds.vue'
import SellManage from './views/SellManage.vue'
import SellChats from './views/SellChats.vue'
import SellMessenger from './views/SellMessenger.vue'

export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/seller/login',
            name: 'sellLogin',
            component: SellLogin
        },
        {
            path: '/seller/sign-up',
            name: 'sellSignup',
            component: SellSignup
        },
        {
            path: '/seller/manage',
            name: 'manage',
            component: SellManage
        },
        {
            path: '/seller/chats',
            name: 'sellchats',
            component: SellChats
        },
        {
            path: '/seller/chats/messenger',
            name: 'sellmessenger',
            component: SellMessenger
        },
        {
            path: '/seller/refund',
            name: 'sellrefund',
            component: SellRefunds
        },
        {
            path: '/seller/statistics',
            name: 'statistics',
            component: SellStatistics
        },
        {
            path: '/seller',
            redirect: '/seller/statistics'
        },
        {
            path: '/security/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/security/sign-up',
            name: 'signup',
            component: SignupPage
        },
        {
            path: '/',
            name: 'main',
            component: MainPage
        },
        {
            path: '/services/sposoby-oplaty',
            name: 'sposob',
            component: OplataPage
        },
        {
            path: '/services/vozvrat-tovara',
            name: 'vozvrat',
            component: VozvratPage
        },
        {
            path: '/services/pravila-polzovaniya-torgovoy-ploshchadkoy',
            name: 'pravilapol',
            component: PravilaPol
        },
        {
            path: '/services/pravila-prodazhi',
            name: 'pravilapr',
            component: PravilaPr
        },
        {
            path: '/lk',
            name: 'lk',
            component: LkPage
        },
        {
            path: '/lk/mywallet/purchases',
            name: 'balance',
            component: BalancePage
        },
        {
            path: '/services/o-nas',
            name: 'about-us',
            component: AboutUs
        },
        {
            path: '/lk/details',
            name: 'details',
            component: InfoDetails
        },
        {
            path: '/lk/myorders/archive',
            name: 'orders',
            component: OrdersPage
        },
        {
            path: '/lk/myorders/delivery',
            name: 'delivery',
            component: DeliveryPage
        },
        {
            path: '/lk/refund',
            name: 'refund',
            component: ReturnPage
        },
        {
            path: '/lk/chats',
            name: 'chats',
            component: ChatsPage
        },
        {
            path: '/lk/chats/messenger', //:id
            name: 'messenger',
            component: MessengerPage
        },
        {
            path: '/lk/discussion/feedback',
            name: 'reviews',
            component: ReviewsPage
        },
        {
            path: '/catalog/:article',
            name: 'product',
            component: ProductPage
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage
        },
        {
            path: '/:pathMatch(.*)',
            name: 'notfound',
            component: NotFoundPage
        }
    ]
})