<script>

</script>

<template>
    <div class="container">
        <h2><b>Способы оплаты</b></h2>
        <p>Понравившиеся вещи Вы можете оплатить перечисленными ниже способами.</p>
        <div class="toggle-menu">
            <label for="toggle" class="toggle__label"><h2><b>Оплата балансом</b></h2>
                <input type="checkbox" id="toggle">
                <ul class="toggle__on">
                    <li>Возврат денежных средств за возвращенный товар осуществляется на Баланс ЛК для распоряжения покупателем по своему усмотрению. Покупатель вправе оплатить денежными средствами последующие покупки или осуществить их перевод на реквизиты своего расчётного счета, а также осуществить перевод через СБП. Для осуществления возврата покупателю необходимо заполнить форму в разделе «Баланс». Баланс ЛК является приоритетным способом оплаты заказов. Вне зависимости от выбранного способа оплаты вся стоимость товара будет списана с Баланса ЛК. Если средств на Балансе ЛК недостаточно для полной оплаты заказанных товаров, оставшаяся часть стоимость будет списана с Банковской карты покупателя.</li>
                </ul>
            </label>
        </div>
    </div>
</template>

<style scoped>
    .container {
        margin: 60px 0px 50px 70px;
    }

    .container p {
        color: #a7a7a7;
        line-height: 60px;
        font-size: 20px;
    }

    .container h2 {
        font-size: 24px;
    }

    .toggle__on {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
        height: 0;
        list-style: none;
        font-size: 0px;
        margin: 0;
        padding: 0;
    }

    .toggle__label {
        cursor: pointer;
        transition: 0.6s;
        font-size: 20px;
        display: flex;
        padding-top: 20px;
        width: 91%;
        flex-direction: column;
        border-top: 2px solid lightgrey;
        border-bottom: 2px solid lightgrey;
    }

    .toggle__label:hover {
        opacity: 0.7;
    }

    #toggle:checked ~ .toggle__on {
        opacity: 1;
        padding-bottom: 30px;
        padding-top: 10px;
        visibility: visible;
        font-size: 20px;
        height: auto;
    }

    #toggle {
        visibility: hidden;
    }
</style>