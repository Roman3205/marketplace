<script>

import { opacityEffectsOff, opacityEffectsOn } from './InfoDetails.vue'
import { scrollWin } from '../components/AppFooter.vue'

export default {
    data() {
        return {
            showEditMenu: false,
            inputValue: ''
        }
    },

    computed: {
        emptyValue() {
            return this.inputValue !== ''
        }
    },

    methods: {
        showEdit(evt) {
            evt.preventDefault()
            this.showEditMenu = true
            opacityEffectsOn()
        },

        closeEdit(evt) {
            evt.preventDefault()
            this.showEditMenu = false
            opacityEffectsOff()
        },

        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper" :class="{
            'opacity': showEditMenu
        }">
            <h2><b>Отзывы</b></h2>
            <!-- <div class="no-feedbacks">
                <p><b>Здесь будут ваши отзывы</b></p>
                <p>Помогите другим покупателям сделать выбор — <br>поделитесь мнением о товарах в разделе Покупки</p>
                <button @click="goRoute($event, 'orders')" >Перейти к покупкам</button>
            </div> -->
            <div class="feedbacks-container">
                <div class="feedback" v-for="index in 5">
                    <div class="image-feed">
                        <img src="https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg" width="150" alt="">
                        <div class="action-menu nothide">
                            <button :disabled="showEditMenu" class="btn btn-edit" @click="showEdit" ><span>Редактировать</span><i class="fa fa-pencil-square-o"></i></button>
                            <button :disabled="showEditMenu" class="btn btn-danger"><span>Удалить</span><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="main-content">
                        <div class="time">
                            <div class="user">
                                <span class="number-rev"><span>Номер отзыва:</span><h5><b>№2322423213</b></h5></span>
                                <b class="mt-2">BSmarty / Беспроводные наушники Pro</b>
                                <p>Дата написания отзыва: 09 июня 2023, 16:34</p>
                            </div>
                            <div class="stars">
                                <span>Ваша оценка:</span>
                                <div class="items">
                                    <i class="fa fa-star star-rev"></i>
                                    <i class="fa fa-star star-rev"></i>
                                    <i class="fa fa-star star-rev"></i>
                                    <i class="fa fa-star star-rev"></i>
                                    <i class="fa fa-star star-rev"></i>
                                </div>
                            </div>
                        </div>
                        <div class="text">
                            <p>Текст вашего отзыва:</p>
                            <textarea name="" id="" cols="30" rows="6" disabled>Отличный товар, очень понравился!</textarea>
                        </div>
                        <div class="action-menu hide">
                            <button :disabled="showEditMenu" class="btn btn-edit" @click="showEdit" ><span>Редактировать</span><i class="fa fa-pencil-square-o"></i></button>
                            <button :disabled="showEditMenu" class="btn btn-danger"><span>Удалить</span><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-menu" v-if="showEditMenu" style="z-index: 999;">
            <i class="fa fa-times" @click="closeEdit" ></i>
            <div class="content">
                <h2><b>Отзыв №33212121</b></h2>
                <div class="inp-edit">
                    <div class="options-edit">
                        <span>Текст отзыва</span>
                        <span>{{ inputValue.length }} / 150</span>
                    </div>
                    <textarea v-model="inputValue" type="text" maxlength="150"></textarea>
                </div>
                <button class="btn" :disabled="!emptyValue" :class="{
                        'opacity': !emptyValue
                    }" >Изменить</button>
                <!-- <div class="alert alert-success">Отзыв изменен успешно</div> -->
                <!-- <div class="alert alert-danger">Произошла ошибка попробуйте снова</div> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/reviews.scss';

</style>