import { createStore } from "vuex"
import authModule from "./authModule"

let store = createStore({
    state: {
        products: [],
        value: "",
        categoryFiltered: [],
        category: "",
        categoriesArray: [
            'Верхняя одежда',
            'Обувь',
            'Товары для дома',
            'Аксессуары',
            'Электроника',
            'Игрушки',
            'Мебель',
            'Продукты',
            'Бытовая техника',
            'Зоотовары',
            'Спорт',
            'Автотовары',
            'Школа',
            'Книги',
            'Ювелирные изделия',
            'Здоровье',
            'Сад и дача'
        ]
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },

        setInput(state, value) {
            state.value = value
        },

        setCategory(state, products) {
            state.categoryFiltered = products
        },

        setCategoryTitle(state, category) {
            state.category = category
        }
    },

    actions: {
        searchProductsFunction({commit}, products) {
            commit('setProducts', products)
        },

        saveInputValue({commit}, value) {
            commit('setInput', value)
        },

        setFilteredCategory({commit}, products) {
            commit('setCategory', products)
        },

        getCategory({commit}, category) {
            commit('setCategoryTitle', category)
        }
    },

    getters: {
        filteredProducts(state) {
            return state.products
        },

        inputValueState(state) {
            return state.value
        },

        categoryFilteredProducts(state) {
            return state.categoryFiltered
        },

        categoryState(state) {
            return state.category
        }
    },

    modules: {
        auth: authModule
    }
})

export default store