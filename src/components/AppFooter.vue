<script>

</script>

<template>
    <div class="container">
        <div class="footer-col">
          <h4>Покупателям</h4>
          <ul>
            <li>Как сделать заказ</li>
            <li>Способы оплаты</li>
            <li>Возврат товара</li>
            <li>Правила пользования торговой<br> площадкой</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Партнерам</h4>
          <ul>
            <li>Продавайте на Marketplace</li>
            <li>Правила продажи</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Компания</h4>
          <ul>
            <li>О нас</li>
          </ul>
        </div>
      </div>
</template>

<style scoped>
.container {
    background-color: rgb(145, 51, 208);
    width: 100%;
    height: 470px;
    display: flex;
    justify-content: center;
    color: #e6e6e6;
    gap: 200px;
    padding-top: 60px;
}

ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.footer-col h4 {
    font-size: 18px;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
    padding-left: 30px;
    font-size: 32px;
}

.footer-col ul li {
    text-transform: capitalize;
    text-decoration: none;
    font-weight: 300;
    transition: all 0.5s ease;
    font-size: 21px;
    cursor: pointer;
}

.footer-col ul li:hover {
  opacity: 0.7;
}

@media screen and (max-width: 767px) {
    .container {
        flex-direction: column;
        height: fit-content;
        gap: 20px;
    }

    .footer-col:last-child {
        margin-bottom: 60px;
    }
}

</style>