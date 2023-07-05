<script>

export default {
    methods: {
        goLog(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'login'
            })
        },

        goMain(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'main'
            })
        }
    }
}

</script>
<template>
    <div class="container">
        <div class="container__header header-top">
            <div class="header__money">
                <i class="fa fa-rub"></i><span>RUB</span>
            </div>
            <button class="header__button btn btn-primary text-white">Стать продавцом</button>
        </div>
        <div class="container__header header-bottom">
            <div class="header__menu">
                <i class="fa fa-bars"></i>
                <h1 @click="goMain" >MARKETPLACE</h1>
            </div>
            <div class="header__search">
                <label for="search"><i class="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" placeholder="Я ищу..." id="search" class="form-control">
            </div>
            <div class="header__box box">
                <div class="box__user" @click="goLog" >
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    <span>Войти</span>
                </div>
                <div class="header__cart">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>Корзина</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        background-color: rgb(145, 51, 208);
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #e6e6e6;
    }

    .fa-bars {
        border: 1px solid #fff;
        border-radius: 10px;
        padding: 5px;
        font-size: 44px!important;
        height: 56px;
    }

    .btn {
        transition: 0.6s;
    }

    .header-bottom h1 {
        font-size: 44px!important;
        padding-top: 1px;
        color: #fff;
        cursor: pointer;
    }

    .container i {
        font-size: 32px;
    }

    .container i:hover {
        cursor: pointer;
    }

    .header-bottom input {
        width: 700px;
        box-shadow: none;
        font-size: 20px;
        height: 50px;
    }

    .box__user, .header__cart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        font-size: 21px;
    }

    .header__menu, .header__search, .box {
        display: flex;
        gap: 35px;
    }

    .header__search {
        gap: 15px;
        align-items: center;
        justify-content: center;
    }

    .header-bottom {
        display: flex;
        gap: 60px;
        justify-content: center;
        align-items: center;
    }

    .header__money {
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
    }

    .header-top {
        display: flex;
        gap: 40px;
        align-items: center;
        margin-left: 70px;
        margin-top: 10px;
    }

    @media screen and (max-width: 767px) {
        .container {
            flex-wrap: wrap;
            height: fit-content;
        }

        .header-bottom {
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .box {
            gap: 80px;
        }

        .header__menu {
            margin-top: 15px;
        }

        .header__search {
            order: 4;
            margin: 10px 0px 30px 0px;
        }

        .header__search input {
            width: 300px;
        }
    }
</style>