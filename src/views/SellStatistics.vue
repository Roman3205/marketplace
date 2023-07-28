<script>

import dayjs from 'dayjs'
import axios from 'axios'

const opacityEffectsOn = () => {
    document.querySelector('#container-stat').style.overflowY = 'hidden'
    document.documentElement.style.overflowY = 'hidden'
    document.querySelector('.sidebar-seller').style.pointerEvents = 'none'
    document.querySelector('.sidebar-seller').classList.add('changemenu-opacity')
}

const opacityEffectsOff = () => {
    document.querySelector('#container-stat').style.overflowY = 'scroll'
    document.documentElement.style.overflowY = 'hidden'
    document.querySelector('.sidebar-seller').style.pointerEvents = 'all'
    document.querySelector('.sidebar-seller').classList.remove('changemenu-opacity')
}

export default {
    data() {
        return {
            showSaleMenu: false,
            discount: '',
            discountItem: '',
            showPublicMenu: false,
            textareaValue: '',
            inputName: '',
            photoValue: '',
            selectValue: '',
            priceValue: '',
            sellerInfo: null,
            successCreate: undefined,
            notCorrect: undefined,
            existProd: undefined,
            products: [],
            discountSuccess: undefined,
            notificationTrue: undefined,
            deleteProd: undefined
        }
    },

    mounted() {
        this.getSeller()
        this.getProducts()
    },

    computed: {
        emptyValue() {
            return this.discount >= 5 && this.discount <= 90
        },

        CreateFill() {
            return this.inputName.length >= 8 && this.textareaValue.length >= 150 && this.photoValue.length >= 10 && this.selectValue !== '' && this.priceValue !== ''
        }
    },

    methods: {
        showSale(evt, item) {
            evt.preventDefault()
            this.showSaleMenu = true
            this.discountItem = item._id
            opacityEffectsOn()
        },

        closeSale() {
            this.showSaleMenu = false
            opacityEffectsOff()
        },

        showPublic(evt) {
            evt.preventDefault()
            this.showPublicMenu = true
            opacityEffectsOn()
        },

        closePublic() {
            this.showPublicMenu = false
            opacityEffectsOff()
        },

        async getSeller() {
            let token = 'Bearer ' + localStorage.getItem('tokenSell')
            let response = await axios.get('/seller/main', {
                headers: {
                    Authorization: token
                }
            })
            this.sellerInfo = response.data
        },

        async CreateProd(evt) {
            evt.preventDefault()
            this.successCreate = false
            this.notCorrect = false
            this.existProd = false

            let filter = /([a-zA-Zа-яА-Я])\1{1}/;
            if (filter.test(this.inputName) || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.textareaValue) || /^[А-Яа-я\s,'-.!" "?]+$/.test(this.photoValue) || !filter.test(this.textareaValue)) {
                this.notCorrect = true
            } else {
                try {
                    let token = 'Bearer ' + localStorage.getItem('tokenSell')
                    await axios.post('/product/create', {
                        title: this.inputName,
                        description: this.textareaValue,
                        picture: this.photoValue,
                        price: this.priceValue,
                        category: this.selectValue
                    }, {
                        headers: {
                            Authorization: token
                        }
                    })

                    this.successCreate = true
                    await new Promise(prom => setTimeout(prom, 1300))
                    this.getSeller()
                    this.getProducts()
                    this.inputName = ''
                    this.textareaValue = ''
                    this.photoValue = ''
                    this.priceValue = ''
                    this.selectValue = ''
                    this.closePublic()
                    this.successCreate = false
                } catch(error) {
                    if(error.response && error.response.status === 409) {
                        this.existProd = true
                    }
                }
            }
        },

        async getProducts() {
            let token = 'Bearer ' + localStorage.getItem('tokenSell')
            let response = await axios.get('/seller/products/all', {
                headers: {
                    Authorization: token
                }
            })
            this.products = response.data
        },

        async deleteProduct(evt, item) {
            evt.preventDefault()
            this.notificationTrue = false
            this.deleteProd = false

            try {
                let token = 'Bearer ' + localStorage.getItem('tokenSell')
            
                await axios.post('/product/remove', {
                    id: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.deleteProd = true

                await new Promise(prom => setTimeout(prom, 1300))

                this.getProducts()

            } catch (error) {
                if(error.response && error.response.status === 409) {
                    this.notificationTrue = true
                }
            }
        },

        async setDiscount(evt) {
            evt.preventDefault()
            this.discountSuccess = false

            let token = 'Bearer ' + localStorage.getItem('tokenSell')
            
            await axios.post('/discount/set', {
                id: this.discountItem,
                discount: this.discount
            }, {
                headers: {
                    Authorization: token
                }
            })

            this.discountSuccess = true
            await new Promise(prom => setTimeout(prom, 1300))
            this.getProducts()
            this.discount = ''
            this.closeSale()
            this.discountSuccess = false
        },

        getTime(date) {
            let day = dayjs(date)
            return day.fromNow(true)
        }
    }
}

</script>

<template>
    <div class="container" id="container-stat">
        <div class="notification" v-if="notificationTrue">
            <div class="alert alert-danger w-100 text-center">Нельзя удалить товар пока он находится в заказах у пользователей</div>
        </div>
        <div class="notification" v-if="deleteProd">
            <div class="alert alert-success w-100 text-center">Товар удален с сайта</div>
        </div>
        <div class="wrapper" :class="{
            'opacity': showSaleMenu || showPublicMenu
        }" >
            <div class="container_top">
                <div class="block_left">
                    <div class="information">
                        <h2 class="mb-4"><b>Информация</b></h2>
                        <div class="wrapper-info">
                            <h5 v-if="sellerInfo">Название бренда: <b>{{ sellerInfo.brandName }}</b></h5>
                            <h5 v-if="sellerInfo">Контактное лицо: <b>{{ sellerInfo.name }}</b></h5>
                            <h5 v-if="sellerInfo">Категория: <b>{{ sellerInfo.brandCategory }}</b></h5>
                            <h5 v-if="sellerInfo">Почта: <b>{{ sellerInfo.mail }}</b></h5>
                            <h5 v-if="sellerInfo">Телефон: <b>{{ sellerInfo.tel }}</b></h5>
                            <h5 v-if="sellerInfo">Описание бренда: <br><textarea disabled>{{ sellerInfo.description }}</textarea></h5>
                        </div>
                    </div>
                </div>
                <div class="block_right">
                    <div class="statistics">
                        <h2 class="mb-4"><b>Статистика</b></h2>
                        <div class="wrapper-statistics">
                            <h5 v-if="sellerInfo">Товаров продано: <b>{{ sellerInfo.sold }}</b></h5>
                            <h5 v-if="sellerInfo">Активных заказов: <b>{{ sellerInfo.activeOrders }}</b></h5>
                            <h5 v-if="sellerInfo">Возвратов: <b>{{ sellerInfo.returns }}</b></h5>
                            <h5 v-if="sellerInfo">Активных возвратов: <b>{{ sellerInfo.activeReturns }}</b></h5>
                            <h5 v-if="sellerInfo">Время с момента заключения партнерства: <br><b>{{ getTime(sellerInfo.createdAt) }}</b></h5>
                        </div>
                    </div>
                    <div class="balance">
                        <h2 class="mb-4"><b>Баланс</b></h2>
                        <div class="wrapper-balance">
                            <h5 class="text-success">У вас на счету:</h5>
                            <h2 class="summ" v-if="sellerInfo">{{ sellerInfo.balance }}<i class="fa fa-rub"></i>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container_bottom">
                <div class="blocks-title">
                    <h2><b>Ваши товары</b></h2>
                    <button class="btn" @click="showPublic" ><b>Опубликовать новый товар</b></button>
                </div>
                <div class="container-blocks">
                    <h5 class="mt-4" v-if="products.products == 0">У вас нет опубликованных товаров</h5>
                    <div class="products-card" v-for="(item) in products.products" v-if="products.products != 0">
                        <div class="info-prod p-2">
                            <div class="image-prod" :style="'background: url(' + item.picture + ') no-repeat center center; border: 2px solid gray;'">
                                <button v-if="item.discount > 0" class="btn btn-danger" disabled>- {{ item.discount }} %</button>
                            </div>
                            <div class="add-info">
                                <p><b>{{ item.title }}</b></p>
                                <p class="rub d-flex gap-2">Цена: <b>{{ item.price }} <i class="fa fa-rub"></i></b></p>
                                <p>Товар куплен: <b>{{ item.amountSold }}</b> раз(а)</p>
                            </div>
                        </div>
                        <div class="manage-prod">
                            <button class="btn btn-outline-success" @click="showSale($event, item)" ><b>Повесить скидку</b></button>
                            <button class="btn btn-outline-danger" @click="deleteProduct($event, item)"><b>Удалить<i class="fa fa-trash"></i></b></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="changesale" v-if="showSaleMenu">
            <i class="fa fa-times" @click="closeSale" ></i>
            <form class="content" @submit="setDiscount">
                <span class="w-100"><h2><b>Скидка</b></h2>(от текущей цены)</span>
                <p><b>Введите только число<br> (от 5 до 90)</b></p>
                <div class="input d-flex price">
                    <input v-model="discount" type="number" class="form-control" min="5" max="90">%
                </div>
                <button class="btn" :class="{
                        'opacity': !emptyValue
                    }" >Применить</button>
            </form>
            <div v-if="discountSuccess" class="w-100 mt-1 mb-4 p-2 text-center alert alert-success">Скидка успешно создана</div>
        </div>
        <div class="changesale create" v-if="showPublicMenu">
            <i class="fa fa-times" @click="closePublic" ></i>
            <form class="content" @submit="CreateProd">
                <h2><b>Создание товара</b></h2>
                <div>
                    <p>Введите название</p>
                    <input type="text" class="form-control mt-2" v-model="inputName" placeholder="Например, Беспроводные наушники" >
                </div>
                <div>
                    <p>Выберите категорию товара</p>
                    <select class="mt-2 w-100" v-model="selectValue">
                        <option class="category-item">Верхняя одежда</option>
                        <option class="category-item">Обувь</option>
                        <option class="category-item">Товары для дома</option>
                        <option class="category-item">Аксессуары</option>
                        <option class="category-item">Электроника</option>
                        <option class="category-item">Игрушки</option>
                        <option class="category-item">Мебель</option>
                        <option class="category-item">Продукты</option>
                        <option class="category-item">Бытовая техника</option>
                        <option class="category-item">Зоотовары</option>
                        <option class="category-item">Спорт</option>
                        <option class="category-item">Автотовары</option>
                        <option class="category-item">Школа</option>
                        <option class="category-item">Книги</option>
                        <option class="category-item">Ювелирные изделия</option>
                        <option class="category-item">Здоровье</option>
                        <option class="category-item">Сад и дача</option>
                    </select>
                </div>
                <div>
                    <div class="textarea-options">
                        <p>Сделайте описание вашему товару</p>
                        <span>{{ this.textareaValue.length }} / 300</span>
                    </div>
                    <textarea class="mt-2" v-model="textareaValue" maxlength="300"></textarea>
                </div>
                <div class="photo">
                    <p>Вставьте ссылку на фотографию (1 шт) вашего товара</p>
                    <input type="text" placeholder="Ссылка на фото из интернета" v-model="photoValue" class="mt-2 form-control">
                </div>
                <div class="price">
                    <p>Введите цену товара (в руб.)</p>
                    <input type="number" placeholder="Цена" v-model="priceValue" class="mt-2 form-control" min="1" max="50000">
                </div>
                <button class="btn" :class="{
                        'opacity': !CreateFill
                    }" >Опубликовать товар</button>
                <div v-if="notCorrect" class="w-100 mt-1 mb-4 p-2 text-center alert alert-danger">Произошла ошибка в заполнении</div>
                <div v-if="successCreate" class="w-100 mt-1 mb-4 p-2 text-center alert alert-success">Товар успешно опубликован</div>
                <div v-if="existProd" class="w-100 mt-1 mb-4 p-2 text-center alert alert-danger">Товар с введенным описанием или фото уже существует</div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellstatistics.scss';

</style>