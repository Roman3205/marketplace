<script>

import axios from 'axios'
import { scrollWin } from '../components/AppFooter.vue'

export default {
    data() {
        return {
            images: [
                '../../images/nike.jpg',
                '../../images/waikiki.jpg',
                '../../images/apple.jpg'
            ],
            currentIndex: 1,
            productsMain: [],
            filteredProducts: []
        }
    },

    mounted() {
        this.getProducts()
    },

    computed: {
        currentImage() {
            return this.images[this.currentIndex]
        }
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
            await new Promise(prom => setTimeout(prom, 550))
            this.prevSlide()
        },

        async changeSlideNext() {
            await new Promise(prom => setTimeout(prom, 550))
            this.nextSlide()
        },

        async getProducts() {
            let response = await axios.get('/products/all')
            this.productsMain = response.data
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
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="slider">
                <button class="slider-button" @click="changeSlidePrev"><i class="fa fa-arrow-left"></i></button>
                <div v-if="images.length">
                    <img :src="currentImage"/>
                </div>
                <button class="slider-button" @click="changeSlideNext"><i class="fa fa-arrow-right"></i></button>
            </div>
            <div class="block-products">
                <h2><b>Мы рекомендуем вам</b></h2>
                <div class="content">
                    <div class="product" v-for="(item) in  productsMain" @click="goProduct($event, item)" >
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
            <div class="block-products">
                <h2><b>Хиты продаж</b></h2>
                <div class="content">
                    <div class="product" v-for="index in 10">
                        <div class="image-prod" style="background: url('https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg') no-repeat center center;">
                            <button class="btn btn-danger" disabled>-74%</button>
                        </div>
                        <div class="rub">
                            <h5><b>1 253</b></h5><i class="fa fa-rub"></i>
                        </div>
                        <p><b>BrandName</b> Наушники</p>
                    </div>
                </div>
            </div>
            <div class="block-products info-card mt-5">
                <h2><b>Широкий ассортимент и высокое качество</b></h2>
                <p>Интернет-магазин Marketplace – это доступные цены, широкий, регулярно обновляемый ассортимент. В онлайн-каталоге Marketplace представлено около 300 000 ведущих брендов одежды, электроники, мебели и других товаров для всех сфер жизни. Покупателям предлагается электроника, книжная продукция, детские товары. В интернет-магазине можно приобрести продукцию для дома, продукты питания, товары для красоты, ювелирные изделия, игрушки. Для удобства пользования онлайн-каталог поделен на разделы, все товары можно сортировать по ряду критериев: цена, материал изготовления, сезонность, бренд.</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/main.scss';

</style>