<script>

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
            inputValue: '',
            showPublicMenu: false,
            textareaValue: '',
            inputName: '',
            photoValue: '',
            selectValue: ''
        }
    },

    computed: {
        emptyValue() {
            return this.inputValue >= 5 && this.inputValue <= 90
        },

        CreateFill() {
            return this.inputName.length >= 8 && this.textareaValue.length >= 150 && this.photoValue.length >= 10 && this.selectValue !== ''
        }
    },

    methods: {
        showSale(evt) {
            evt.preventDefault()
            this.showSaleMenu = true
            opacityEffectsOn()
        },

        closeSale(evt) {
            evt.preventDefault()
            this.showSaleMenu = false
            opacityEffectsOff()
        },

        showPublic(evt) {
            evt.preventDefault()
            this.showPublicMenu = true
            opacityEffectsOn()
        },

        closePublic(evt) {
            evt.preventDefault()
            this.showPublicMenu = false
            opacityEffectsOff()
        }
    }
}

</script>

<template>
    <div class="container" id="container-stat">
        <div class="wrapper" :class="{
            'opacity': showSaleMenu || showPublicMenu
        }" >
            <div class="container_top">
                <div class="block_left">
                    <div class="information">
                        <h2 class="mb-4"><b>Информация</b></h2>
                        <div class="wrapper-info">
                            <h5>Название бренда: <b>Brand</b></h5>
                            <h5>Контактное лицо: <b>Роман</b></h5>
                            <h5>Категория: <b>Бытовая техника</b></h5>
                            <h5>Почта: <b>qwerty@gmail.com</b></h5>
                            <h5>Телефон: <b>+79001234567</b></h5>
                            <h5>Описание бренда: <br><textarea disabled>sadasdadwdadwdwwadawdwadsadwadadadwdwadwadsw</textarea></h5>
                        </div>
                    </div>
                </div>
                <div class="block_right">
                    <div class="statistics">
                        <h2 class="mb-4"><b>Статистика</b></h2>
                        <div class="wrapper-statistics">
                            <h5>Товаров продано: <b>6535</b></h5>
                            <h5>Активных заказов: <b>123</b></h5>
                            <h5>Возвратов: <b>42</b></h5>
                            <h5>Активных возвратов: <b>12</b></h5>
                            <h5>Время с момента заключения партнерства: <br><b>1 год 2 месяца</b></h5>
                        </div>
                    </div>
                    <div class="balance">
                        <h2 class="mb-4"><b>Баланс</b></h2>
                        <div class="wrapper-balance">
                            <h5 class="text-success">У вас на счету:</h5>
                            <h2 class="summ">
                                1 323<i class="fa fa-rub"></i>
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
                    <div class="products-card" v-for="index in 7">
                        <div class="info-prod">
                            <div class="image-prod" style="background: url('https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg') no-repeat center center;">
                                <button class="btn btn-danger" disabled>-74%</button>
                            </div>
                            <div class="add-info">
                                <p><b>Наушники беспроводные</b></p>
                                <p class="rub">Цена: <b>3 302 <i class="fa fa-rub"></i></b></p>
                                <p>Товар куплен: <b>23</b> раз(а)</p>
                            </div>
                        </div>
                        <div class="manage-prod">
                            <button class="btn btn-outline-success" @click="showSale" ><b>Повесить скидку</b></button>
                            <button class="btn btn-outline-danger"><b>Удалить<i class="fa fa-trash"></i></b></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="changesale" v-if="showSaleMenu">
            <i class="fa fa-times" @click="closeSale" ></i>
            <div class="content">
                <h2><b>Скидка</b></h2>
                <p><b>Введите только число<br> (от 5 до 90)</b></p>
                <div class="input d-flex">
                    <input v-model="inputValue" type="number" class="form-control">%
                </div>
                <button class="btn" @click="closeSale" :class="{
                        'opacity': !emptyValue
                    }" >Применить</button>
            </div>
        </div>
        <div class="changesale create" v-if="showPublicMenu">
            <i class="fa fa-times" @click="closePublic" ></i>
            <div class="content">
                <h2><b>Создание товара</b></h2>
                <div>
                    <p>Введите название</p>
                    <input type="text" class="form-control mt-2" v-model="inputName" placeholder="Например, Беспроводные наушники" >
                </div>
                <div>
                    <p>Выберите категорию товара</p>
                    <select class="mt-2 w-100" v-model="selectValue">
                        <option class="category-item">Мужская верхняя одежда</option>
                        <option class="category-item">Женская верхняя одежда</option>
                        <option class="category-item">Мужская обувь</option>
                        <option class="category-item">Женская обувь</option>
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
                <button class="btn" @click="closePublic" :class="{
                        'opacity': !CreateFill
                    }" >Опубликовать товар</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellstatistics.scss';

</style>