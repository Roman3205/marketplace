<script>
import axios from 'axios'
import { scrollWin } from '../components/AppFooter.vue'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            images: [
                '/images/nike.jpg',
                '/images/waikiki.jpg',
                '/images/apple.jpg'
            ],
            currentIndex: 1,
            productsMain: [],
            productsTrend: [],
            loading: undefined
        }
    },

    mounted() {
        this.getProducts()
    },

    computed: {
        currentImage() {
            return this.images[this.currentIndex]
        },

        ...mapGetters({
            filteredProducts: 'filteredProducts',
            inputValueState: 'inputValueState',
            categoryState: 'categoryState',
            categoryFilteredProducts: 'categoryFilteredProducts',
            isLeave: 'auth/getLeaveStatus',
            isLeaveSeller: 'auth/getLeaveSellerStatus'
        })
    },

    methods: {
        prevSlide() {
            if (this.currentIndex === 0) {
                this.currentIndex = this.images.length - 1;
            } else {
                this.currentIndex--;
            }
        },

        nextSlide() {
            if (this.currentIndex === this.images.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
        },

        async changeSlidePrev() {
            await new Promise(prom => setTimeout(prom, 450))
            this.prevSlide()
        },

        async changeSlideNext() {
            await new Promise(prom => setTimeout(prom, 450))
            this.nextSlide()
        },

        async getProducts() {
            try {
                this.loading = true
                let response = await axios.get('/products/all')
                this.loading = false
                this.productsMain = response.data

                this.productsTrend = this.productsMain.filter(product => product.amountSold > 10)
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        goProduct(evt, item) {
            evt.preventDefault()
            this.$router.push({
                name: 'product',
                params: {
                    article: item.article
                }
            })
            scrollWin()
        },

        productsText() {
            let count = this.filteredProducts.length
            if (count === 1) {
                return 'товар'
            } else if (count > 1 && count <= 4) {
                return 'товара'
            } else {
                return 'товаров'
            }
        },

        categoryProducts() {
            let count = this.categoryFilteredProducts.length
            if (count === 1) {
                return 'товар'
            } else if (count > 1 && count <= 4) {
                return 'товара'
            } else {
                return 'товаров'
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="notification" v-if="this.isLeave === true">
                <div class="alert alert-info w-100 text-center">Вы вышли из аккаунта пользователя</div>
            </div>
            <div class="notification" v-if="this.isLeaveSeller === true">
                <div class="alert alert-info w-100 text-center">Вы вышли из аккаунта продавца</div>
            </div>
            <div class="results" v-if="categoryState && categoryFilteredProducts.length == 0">
                <h2><b>{{ categoryState }}</b></h2>
                <p class="ms-5 mt-3">Ничего не найдено</p>
            </div>
            <div class="search-result" v-if="categoryState && categoryFilteredProducts.length != 0">
                <h2><b>{{ categoryState }}</b> <span style="font-size: 19px;">{{ categoryFilteredProducts.length }} {{ categoryProducts() }}</span></h2>
                <div class="content mt-4">
                    <div class="product" v-for="(item) in  categoryFilteredProducts" @click="goProduct($event, item)" >
                        <div class="image-prod" :style="'background: url(' + item.picture + ') no-repeat center center;'">
                            <button v-if="item.discount > 0" class="btn btn-danger" disabled>- {{ item.discount }} %</button>
                        </div>
                        <div class="rub">
                            <h5><b>{{ item.price }}</b></h5>
                            <i class="fa fa-rub"></i>
                            <h5 v-if="item.discount > 0" :style="item.discount > 0 ? {textDecoration: 'line-through', color: 'dimgray', transform: 'scale(0.89)'} : {}">
                                <b>{{ Number(item.price + (item.price / 100 * item.discount)).toFixed(0) }}</b>
                            </h5>
                            <i v-if="item.discount > 0" :style="item.discount > 0 ? {color: 'gray', transform: 'scale(0.77)', marginLeft: '-8px'} : {}" class="fa fa-rub"></i>
                        </div>
                        <p><b>{{ item.brand_id.brandName }} /</b> {{ item.title }}</p>
                    </div>
                </div>
            </div>
            <div class="results" v-if="inputValueState && filteredProducts.length == 0">
                <h2><b>Результаты поиска</b></h2>
                <p class="ms-5 mt-3">Ничего не найдено</p>
            </div>
            <div class="search-result" v-if="inputValueState && filteredProducts.length != 0">
                <h2><b>По вашему запросу "{{ inputValueState }}" найдено</b><span class="ms-4" style="font-size: 19px;">{{ filteredProducts.length }} {{ productsText() }}</span></h2>
                <div class="content mt-4">
                    <div class="product" v-for="(item) in  filteredProducts" @click="goProduct($event, item)" >
                        <div class="image-prod" :style="'background: url(' + item.picture + ') no-repeat center center;'">
                            <button v-if="item.discount > 0" class="btn btn-danger" disabled>- {{ item.discount }} %</button>
                        </div>
                        <div class="rub">
                            <h5><b>{{ item.price }}</b></h5>
                            <i class="fa fa-rub"></i>
                            <h5 v-if="item.discount > 0" :style="item.discount > 0 ? {textDecoration: 'line-through', color: 'dimgray', transform: 'scale(0.89)'} : {}">
                                <b>{{ Number(item.price + (item.price / 100 * item.discount)).toFixed(0) }}</b>
                            </h5>
                            <i v-if="item.discount > 0" :style="item.discount > 0 ? {color: 'gray', transform: 'scale(0.77)', marginLeft: '-8px'} : {}" class="fa fa-rub"></i>
                        </div>
                        <p><b>{{ item.brand_id.brandName }} /</b> {{ item.title }}</p>
                    </div>
                </div>
            </div>
            <div class="slider" v-if="inputValueState === '' && categoryState === ''">
                <button class="slider-button" @click="changeSlidePrev"><i class="fa fa-arrow-left"></i></button>
                <div v-if="images.length">
                    <img :src="currentImage"/>
                </div>
                <button class="slider-button" @click="changeSlideNext"><i class="fa fa-arrow-right"></i></button>
            </div>
            <div class="block-products" v-if="inputValueState === '' && categoryState === ''">
                <h2><b>Мы рекомендуем вам</b></h2>
                <spinner-loading v-if="loading" style="align-self: center;"></spinner-loading>
                <div class="content">
                    <div class="product" v-for="(item) in  productsMain" @click="goProduct($event, item)" >
                        <div class="image-prod" :style="'background: url(' + item.picture + ') no-repeat center center;'">
                            <button v-if="item.discount > 0" class="btn btn-danger" disabled>- {{ item.discount }} %</button>
                        </div>
                        <div class="rub">
                            <h5><b>{{ item.price }}</b></h5>
                            <i class="fa fa-rub"></i>
                            <h5 v-if="item.discount > 0" :style="item.discount > 0 ? {textDecoration: 'line-through', color: 'dimgray', transform: 'scale(0.89)'} : {}">
                                <b>{{ Number(item.price / (100 - item.discount) * 100).toFixed(0) }}</b>
                            </h5>
                            <i v-if="item.discount > 0" :style="item.discount > 0 ? {color: 'gray', transform: 'scale(0.77)', marginLeft: '-8px'} : {}" class="fa fa-rub"></i>
                        </div>
                        <p><b>{{ item.brand_id.brandName }} /</b> {{ item.title }}</p>
                    </div>
                </div>
            </div>
            <div class="block-products" v-if="inputValueState === '' && categoryState === ''">
                <h2><b>Хиты продаж</b></h2>
                <spinner-loading class="mt-3" v-if="loading" style="align-self: center;"></spinner-loading>
                <h5 class="ms-5 mt-3" v-if="productsTrend.length == 0 && !loading">Предложений нет</h5>
                <div class="content" v-if="productsTrend.length != 0">
                    <div class="product" v-for="(item) in  productsTrend" @click="goProduct($event, item)" >
                        <div class="image-prod" :style="'background: url(' + item.picture + ') no-repeat center center;'">
                            <button v-if="item.discount > 0" class="btn btn-danger" disabled>- {{ item.discount }} %</button>
                        </div>
                        <div class="rub">
                            <h5><b>{{ item.price }}</b></h5>
                            <i class="fa fa-rub"></i>
                            <h5 v-if="item.discount > 0" :style="item.discount > 0 ? {textDecoration: 'line-through', color: 'dimgray', transform: 'scale(0.89)'} : {}">
                                <b>{{ Number(item.price + (item.price / 100 * item.discount)).toFixed(0) }}</b>
                            </h5>
                            <i v-if="item.discount > 0" :style="item.discount > 0 ? {color: 'gray', transform: 'scale(0.77)', marginLeft: '-8px'} : {}" class="fa fa-rub"></i>
                        </div>
                        <p><b>{{ item.brand_id.brandName }} /</b> {{ item.title }}</p>
                    </div>
                </div>
            </div>
            <div class="block-products info-card mt-lg-5">
                <h2><b>Широкий ассортимент и высокое качество</b></h2>
                <p>Интернет-магазин Marketplace – это доступные цены, широкий, регулярно обновляемый ассортимент. В онлайн-каталоге Marketplace представлено около 300 000 ведущих брендов одежды, электроники, мебели и других товаров для всех сфер жизни. Покупателям предлагается электроника, книжная продукция, детские товары. В интернет-магазине можно приобрести продукцию для дома, продукты питания, товары для красоты, ювелирные изделия, игрушки. Для удобства пользования онлайн-каталог поделен на разделы, все товары можно сортировать по ряду критериев: цена, материал изготовления, сезонность, бренд.</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/main.scss';

</style>