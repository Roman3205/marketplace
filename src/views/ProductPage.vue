<script>

import { opacityEffectsOff, opacityEffectsOn } from './InfoDetails.vue'

export default {
    data() {
        return {
            showReviewBar: false,
            inputValue: '',
            highlightedStars: 0
        }
    },

    computed: {
        emptyValue() {
            return this.inputValue !== ''
        }
    },

    methods: {
        showReviewCreate(evt) {
            evt.preventDefault()
            this.showReviewBar = true
            opacityEffectsOn()
        },

        closeReviewCreate(evt) {
            evt.preventDefault()
            this.showReviewBar = false
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
            console.log(this.highlightedStars)
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper" :class="{
            'opacity': showReviewBar
        }" >
            <div class="prod-title">
                <h2><b>BSmarty / Беспроводные наушники Pro</b></h2>
                <div class="info">
                    <p class="star"><i class="fa fa-star"></i><span>4.7</span></p>
                    <p><u>15 оценок</u></p>
                    <p>Артикул: 24142122</p>
                    <p>Купили 213 раз</p>
                </div>
            </div>
            <div class="prod-content">
                <img src="../../images/test.png" width="450" alt="">
                <div class="prod-menu">
                    <div class="brand">
                        <h2>Brand</h2>
                        <div class="brand-info">
                            <div class="sale">
                                <i class="fa fa-thumbs-up"></i>3422<br>товаров продано
                            </div>
                            <div class="reg">
                                1 год и 1 месяц<br>на Marketplace
                            </div>
                        </div>
                    </div>
                    <div class="prod-description">
                        <h2><b>О товаре</b></h2>
                        <div class="cat">
                            <h6><b>Категория:</b></h6>
                            <span>Техника, гарнитура</span>
                        </div>
                        <div class="desc">
                            <h6><b>Описание:</b></h6>
                            <p>Беспроводные наушники выполнены из высококачественного материала, кейс очень качественно сделан и приятен на ощупь. Наушники Pro обладают современными комплектующими, качество звука не оставит вас равнодушным!</p>
                        </div>
                        <div class="lock">
                            <i class="fa fa-lock"></i><span><u>Качество подтверждено</u></span>
                        </div>
                    </div>
                </div>
                <div class="to-card">
                    <div class="balance">
                        <div class="rub">
                            <p><b>1 232</b></p><i class="fa fa-rub"></i>
                        </div>
                        <button class="btn button-buy" :disabled="showReviewBar">Добавить в корзину</button>
                        <!-- <button class="btn button-cart">Перейти в корзину</button> -->
                        <p><b>11 июля</b> доставка со склада</p>
                    </div>
                    <!-- <div class=" mt-4 alert alert-success">Товар успешно добавлен в корзину</div> -->
                </div>
            </div>
            <div class="reviews">
                <div class="review-title">
                    <div class="main-title">
                        <h2><b>Отзывы</b></h2>
                        <h5>Средняя оценка: <b>4.7</b></h5>
                    </div>
                    <button class="write-active-button" @click="showReviewCreate" >Написать отзыв</button>
                </div>
                <div class="box">
                    <div class="row ms-lg-1 mt-lg-3 ms-lg-2" ref="reviews">
                        <div class="review" v-for="index in 50">
                            <div class="rev-user">
                                <img src="../..//images/user.png" alt="">
                                <div class="time">
                                    <div class="user">
                                        <b>Оксана</b>
                                        <p>09 июня 2023, 16:34</p>
                                    </div>
                                    <div class="stars">
                                        <i class="fa fa-star star-rev"></i>
                                        <i class="fa fa-star star-rev"></i>
                                        <i class="fa fa-star star-rev"></i>
                                        <i class="fa fa-star star-rev"></i>
                                        <i class="fa fa-star star-rev"></i>
                                    </div>
                                </div>
                            </div>
                            <p>Отличный товар, очень понравился!</p>
                        </div>
                    </div>
                    <div class="buttons mt-4 ms-2">
                        <button :disabled="showReviewBar" class="scroll-button left" @click="scrollLeft('reviews')">&#8249;</button>
                        <button :disabled="showReviewBar" class="scroll-button right" @click="scrollRight('reviews')">&#8250;</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="write-review1" v-if="showReviewBar" style="opacity: 1!important; z-index: 999;">
            <i class="fa fa-times" @click="closeReviewCreate" ></i>
            <div class="content">
                <h2><b>BSmarty / Беспроводные наушники Pro</b></h2>
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
            </div>
        </div>
        <!-- <div class="write-review2" v-if="showReviewBar">
            <i class="fa fa-times" @click="closeReviewCreate" ></i>
            <div class="content">
                <h2><b>Отзыв не оставить</b></h2>
                <div class="inp-review">
                    <p>Поделиться мнением о товаре можно только после его получения</p>
                </div>
                <button class="btn"  @click="closeReviewCreate" >Понятно, спасибо</button>
            </div>
        </div> -->
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/product.scss';
</style>