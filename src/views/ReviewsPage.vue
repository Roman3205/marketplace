<script>

import { scrollWin } from '../components/AppFooter.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            inputValue: '',
            reviews: [],
            notificationTrue: undefined,
            loading: undefined,
            isClickDelete: false
        }
    },

    mounted() {
        this.loadReviews()
    },

    computed: {
        emptyValue() {
            return this.inputValue !== ''
        },

        ...mapGetters({
            getAccessToken: 'auth/getAccessToken'
        })
    },

    methods: {
        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        },

        async loadReviews() {
            try {
                this.loading = true
                let token = 'Bearer ' + this.getAccessToken

                let response = await axios.get('/reviews/all', {
                    headers: {
                        Authorization: token
                    }
                })

                this.loading = false

                this.reviews = response.data.reviews
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async deleteReview(evt, review) {
            evt.stopPropagation()
            evt.preventDefault()
            this.isClickDelete = false
            this.isClickDelete = true
            try {
                this.notificationTrue = false

                let token = 'Bearer ' + this.getAccessToken
                
                await axios.post('/review/remove', {
                    id: review._id,
                    article: review.product_id.article
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.notificationTrue = true
                let id = this.reviews.indexOf(review)
                console.log(id);
                this.reviews.splice(id, 1)
                await new Promise(prom => setTimeout(prom, 600))
                this.loadReviews()

            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            } finally {
                this.isClickDelete = false
            }
        },

        goProduct(evt, review) {
            evt.preventDefault()
            this.$router.push({
                name: 'product',
                params: {
                    article: review.article
                }
            })
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
        <div class="notification" v-if="notificationTrue">
            <div class="alert alert-info w-100 text-center">Отзыв успешно удален</div>
        </div>
        <div class="wrapper">
            <spinner-loading v-if="loading" class="mt-4" style="overflow: hidden; display: flex; justify-content: center;"></spinner-loading>
            <h2 v-if="!loading"><b>Отзывы</b></h2>
            <div class="no-feedbacks" v-if="reviews.length == 0 && !loading">
                <p><b>Здесь будут ваши отзывы</b></p>
                <p>Помогите другим покупателям сделать выбор — <br>поделитесь мнением о товарах в разделе Покупки</p>
                <button @click="goRoute($event, 'orders')" >Перейти к покупкам</button>
            </div>
            <div class="feedbacks-container"  v-if="reviews.length != 0">
                <transition-group name="common-group">
                    <div class="feedback" v-for="(review) in reviews" :key="review._id">
                        <div class="image-feed">
                            <img :src="review.product_id.picture" width="150" alt="" @click="goProduct($event, review.product_id)">
                            <div class="action-menu nothide">
                                <button :disabled="isClickDelete" @click="deleteReview($event, review)" class="btn btn-danger"><span>Удалить</span><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                        <div class="main-content">
                            <div class="time">
                                <div class="user">
                                    <b @click="goProduct($event, review.product_id)" class="mt-2">{{ review.product_id.brand_id.brandName }} / {{ review.product_id.title }}</b>
                                    <p>Дата написания отзыва: {{ getTimeReview(review.createdAt) }}</p>
                                </div>
                                <div class="stars">
                                    <span>Ваша оценка:</span>
                                    <div class="items">
                                        <i class="fa me-1 fa-star star-rev" v-for="index in review.rating"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="text">
                                <p>Текст вашего отзыва:</p>
                                <textarea name="" id="" disabled maxlength="150">{{ review.text }}</textarea>
                            </div>
                            <div class="action-menu hide">
                                <button :disabled="isClickDelete" @click="deleteReview($event, review)" class="btn btn-danger"><span>Удалить</span><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/reviews.scss';
    @import '@/assets/scss/transition-group.scss';

</style>