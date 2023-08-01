<script>

import { opacityEffectsOff, opacityEffectsOn } from './InfoDetails.vue'
import { scrollWin } from '../components/AppFooter.vue'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            showReviewBar: false,
            inputValue: '',
            highlightedStars: 0,
            product: null,
            currentDate: new Date(),
            successCreate: undefined,
            notCorrect: undefined,
            addSuccess: undefined,
            alreadyInCart: undefined,
            alreadyWritten: undefined,
            prodRecieved: undefined
        }
    },

    computed: {
        emptyValue() {
            return this.inputValue.length >= 30 && this.highlightedStars !== 0
        }
    },

    mounted() {
        this.getParamsProduct()
    },

    methods: {
        showReviewCreate(evt) {
            evt.preventDefault()

            if(!localStorage.getItem('token')) {
                this.$router.push({
                    name: 'login'
                })
            }

            this.showReviewBar = true
            opacityEffectsOn()
        },

        closeReviewCreate() {
            this.showReviewBar = false
            opacityEffectsOff()
        },

        closeMenu() {
            this.prodRecieved = false
            opacityEffectsOff()
        },

        scrollLeft(ref) {
            const row = this.$refs[ref];
            row.scrollBy({
                left: -466,
                behavior: 'smooth'
            })
        },

        scrollRight(ref) {
            const row = this.$refs[ref];
            row.scrollBy({
                left: 466,
                behavior: 'smooth'
            })
        },

        selectRating(index) {
            this.highlightedStars = index;
        },

        async getParamsProduct() {
            try {
                let response = await axios.get('/product', {
                    params: {
                        article: this.$route.params.article
                    }
                })

                this.product = response.data

                this.checkInCart()

            } catch (error) {
                if(error.response && error.response.status === 404) {
                    this.$router.push('/not-found')
                }
            }
        },

        async CreateReview(evt) {
            evt.preventDefault()

            if(!localStorage.getItem('token')) {
                this.$router.push({
                    name: 'login'
                })
            }

            this.successCreate = false
            this.alreadyWritten = false
            this.notCorrect = false
            this.prodRecieved = false

            let filter = /([a-zA-Zа-яА-Я])\1{2}/;
            if (!/^[А-Яа-я\s,'-.!" "?]+$/.test(this.inputValue) || filter.test(this.inputValue)) {
                this.notCorrect = true
            } else {
                try {
                    let token = 'Bearer ' + localStorage.getItem('token')
                    await axios.post('/review/create', {
                        text: this.inputValue,
                        rating: this.highlightedStars,
                        article: this.$route.params.article
                    }, {
                        headers: {
                            Authorization: token
                        }
                    })

                    this.successCreate = true
                    await new Promise(prom => setTimeout(prom, 1300))
                    this.getParamsProduct()
                    this.inputValue = ''
                    this.highlightedStars = 0
                    this.closeReviewCreate()
                    this.successCreate = false

                } catch (error) {
                    if(error.response && error.response.status === 409) {
                        this.alreadyWritten = true
                    } else if (error.response && error.response.status === 403) {
                        this.closeReviewCreate()
                        this.prodRecieved = true
                        opacityEffectsOn()
                    }
                }
            }
        },

        async addToCart(evt) {
            evt.preventDefault()
            this.addSuccess = false

            let token = 'Bearer ' + localStorage.getItem('token')

            if(!localStorage.getItem('token')) {
                this.$router.push({
                    name: 'login'
                })
            }
            
            await axios.post('/cart/add', {
                article: this.$route.params.article
            }, {
                headers: {
                    Authorization: token
                }
            })

            this.addSuccess = true
            this.checkInCart()
        },

        async checkInCart() {
            this.alreadyInCart = false

            try {
                let token = 'Bearer ' + localStorage.getItem('token')
                await axios.get('/product/check', {
                    params: {
                        article: this.$route.params.article
                    },

                    headers: {
                        Authorization: token
                    }
                })
            } catch (error) {
                if(error.response && error.response.status === 409) {
                    this.alreadyInCart = true
                }
            }
        },

        getTime(date) {
            let day = dayjs(date)
            return day.fromNow(true)
        },

        getRandomDateDelivery() {
            let min = 2
            let max = 5
            return Math.floor(Math.random() * (max - min) + min)
        },

        getDeliver(date) {
            let day = dayjs(date)
            let deliveryDate = day.add(this.getRandomDateDelivery(), 'day')
            return deliveryDate.format('D MMMM')
        },

        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        },

        getTimeReview(date) {
            let day = dayjs(date)
            return day.format('D MMMM YYYY, HH:mm')
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper" :class="{
            'opacity': showReviewBar || prodRecieved
        }" >
            <div class="prod-title" v-if="product">
                <h2><b>{{ product.brand_id.brandName }} / {{ product.title }}</b></h2>
                <div class="info">
                    <p v-if="product.averageRating > 0" class="star"><i class="fa fa-star"></i><span>{{ product.averageRating }}</span></p>
                    <p><u>{{ product.amountReviews }} оценок</u></p>
                    <p>Артикул: {{ product.article }}</p>
                    <p>Купили {{ product.amountSold }} раз</p>
                </div>
            </div>
            <div class="prod-content" v-if="product">
                <img :src="product.picture" width="450" alt="">
                <div class="prod-menu">
                    <div class="brand">
                        <h2>{{ product.brand_id.brandName }}</h2>
                        <div class="brand-info">
                            <div class="sale">
                                <i class="fa fa-thumbs-up"></i>{{ product.brand_id.sold }}<br>товаров продано
                            </div>
                            <div class="reg">
                                {{ getTime(product.brand_id.createdAt) }}<br>на Marketplace
                            </div>
                        </div>
                    </div>
                    <div class="prod-description" v-if="product">
                        <h2><b>О товаре</b></h2>
                        <div class="cat">
                            <h6><b>Категория:</b></h6>
                            <span>{{ product.category }}</span>
                        </div>
                        <div class="desc">
                            <h6><b>Описание:</b></h6>
                            <p>{{ product.description }}</p>
                        </div>
                        <div class="lock">
                            <i class="fa fa-lock"></i><span><u>Качество подтверждено</u></span>
                        </div>
                    </div>
                </div>
                <div class="to-card">
                    <div class="balance">
                        <div class="rub">
                            <p><b>{{ product.price }}</b></p><i class="fa fa-rub"></i>
                        </div>
                        <button class="btn button-buy" :disabled="showReviewBar" @click="addToCart" v-if="!alreadyInCart && product.runOut == false" >Добавить в корзину</button>
                        <button class="btn button-buy" disabled v-if="product.runOut == true" >Товар закончился на складе</button>
                        <button class="btn button-cart" v-if="alreadyInCart && product.runOut == false" @click="goRoute($event, 'cart')" >Перейти в корзину</button>
                        <p><b>{{ getDeliver(currentDate) }}</b> доставка со склада</p>
                    </div>
                    <div v-if="addSuccess" class="w-100 text-center mt-4 alert alert-success">Товар успешно добавлен в корзину</div>
                </div>
            </div>
            <div class="reviews" v-if="product">
                <div class="review-title">
                    <div class="main-title">
                        <h2><b>Отзывы</b></h2>
                        <h5 v-if="product.averageRating > 0">Средняя оценка: <b>{{ product.averageRating }}</b></h5>
                    </div>
                    <button class="write-active-button" @click="showReviewCreate" >Написать отзыв</button>
                </div>
                <h5 class="mt-4" v-if="product.reviews.length == 0">Отзывов на этот товар нет</h5>
                <div class="box" v-if="product.reviews.length > 0">
                    <div class="row ms-lg-1 mt-lg-3 ms-lg-2" ref="reviews">
                        <div class="review" v-for="(item) in product.reviews">
                            <div class="rev-user">
                                <img :src="'../..//images/' + item.author_id.profilePicture">
                                <div class="time">
                                    <div class="user">
                                        <b>{{ item.author_id.name }}</b>
                                        <p>{{ getTimeReview(item.createdAt) }}</p>
                                    </div>
                                    <div class="stars">
                                        <i v-for="index in item.rating" class="me-1 fa fa-star star-rev"></i>
                                    </div>
                                </div>
                            </div>
                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                    <div class="buttons mt-4 ms-2" v-if="product.reviews">
                        <button :disabled="showReviewBar" class="scroll-button left" @click="scrollLeft('reviews')">&#8249;</button>
                        <button :disabled="showReviewBar" class="scroll-button right" @click="scrollRight('reviews')">&#8250;</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="write-review1" v-if="showReviewBar" style="opacity: 1!important; z-index: 999;">
            <i class="fa fa-times" @click="closeReviewCreate" ></i>
            <form class="content" @submit="CreateReview" >
                <h2><b>{{ product.brand_id.brandName }} / {{ product.title }}</b></h2>
                <div class="inp-review1">
                    <span>Оцените товар</span>
                    <div class="stars-review">
                        <i v-for="index in 5"
                        class="fa fa-star"
                        :class="{ active: index <= highlightedStars }"
                        @click="selectRating(index)"></i>
                    </div>
                    <div class="textarea-review">
                        <div class="textarea-options">
                            <span>Расскажите о товаре</span>
                            <span>{{ this.inputValue.length }} / 150</span>
                        </div>
                        <textarea v-model="inputValue" name="" id="" cols="" rows="4" maxlength="150" style="font-size: 22px;"></textarea>
                    </div>
                </div>
                <button class="btn" :disabled="!emptyValue" :class="{
                    'opacity': !emptyValue
                }" >Отправить</button>
            </form>
            <div v-if="notCorrect" class="w-100 mt-4 mb-2 p-2 text-center alert alert-danger">Произошла ошибка в заполнении</div>
            <div v-if="successCreate" class="w-100 mt-4 mb-2 p-2 text-center alert alert-success">Ваш отзыв успешно создан</div>
            <div v-if="alreadyWritten" class="w-100 mt-4 mb-2 p-2 text-center alert alert-danger">Вы уже оставляли отзыв на этот товар</div>
        </div>
        <div class="write-review2" v-if="prodRecieved">
            <i class="fa fa-times" @click="closeMenu" ></i>
            <div class="content">
                <h2><b>Отзыв не оставить</b></h2>
                <div class="inp-review">
                    <p>Поделиться мнением о товаре можно только после его получения</p>
                </div>
                <button class="btn" @click="closeMenu" >Понятно, спасибо</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/product.scss';
</style>