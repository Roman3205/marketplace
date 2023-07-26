let express = require('express')
let app = express()
let port = 3003
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let cookieParser = require('cookie-parser')

app.listen(port, function() {
    console.log('http://localhost:' + port)
})

let cors = require('cors')
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(cookieParser())

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/clothes-shop')

let cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'product'
    }],
    totalCost: Number
}, {
    timestamps: true
})

let Cart = mongoose.model('cart', cartSchema)

let orderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.ObjectId,
        ref: 'product'
    },
    status: String
}, {
    timestamps: true
})

let Order = mongoose.model('order', orderSchema)

let operationSchema = new mongoose.Schema({
    title: String,
    money: Number
}, {
    timestamps: true
})

let customerSchema = new mongoose.Schema({
    name: String,
    password: String,
    mail: String,
    profilePicture: String,
    cart_id: {
        type: mongoose.ObjectId,
        ref: 'cart'
    },
    orders: [{
        type: mongoose.ObjectId,
        ref: 'order'
    }],
    chats: [{
        type: mongoose.ObjectId,
        ref: 'chat'
    }],
    reviews: [{
        type: mongoose.ObjectId,
        ref: 'review'
    }],
    refunds: [{
        type: mongoose.ObjectId,
        ref: 'refund'
    }],
    operations: [operationSchema],
    balance: Number,
    amountRedemption: Number,
    boughtProducts: Number
}, {
    timestamps: true
})

let Customer = mongoose.model('customer', customerSchema)

let sellerSchema = new mongoose.Schema({
    brandName: String,
    brandCategory: String,
    name: String,
    mail: String,
    tel: String,
    description: String,
    password: String,
    products: [{
        type: mongoose.ObjectId,
        ref: 'product'
    }],
    orders: [{
        type: mongoose.ObjectId,
        ref: 'order'
    }],
    balance: Number,
    sold: Number,
    activeOrders: Number,
    returns: Number,
    activeReturns: Number,
    chats: [{
        type: mongoose.ObjectId,
        ref: 'chat'
    }],
    refunds: [{
        type: mongoose.ObjectId,
        ref: 'refund'
    }],
}, {
    timestamps: true
})

let Seller = mongoose.model('seller', sellerSchema)

let reviewSchema = new mongoose.Schema({
    text: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    author_id: {
        type: mongoose.ObjectId,
        ref: 'customer'
    }
}, {
    timestamps: true
})

let Review = mongoose.model('review', reviewSchema)

let refundSchema = new mongoose.Schema({
    status: String,
    uniqueNumber: Number,
    product_id: {
        type: mongoose.ObjectId,
        ref: 'product'
    },
    albumLink: String,
    text: String,
    author_id: {
        type: mongoose.ObjectId,
        ref: 'customer'
    }
}, {
    timestamps: true
})

let Refund = mongoose.model('refund', refundSchema)

let productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    averageRating: Number,
    amountReviews: Number,
    article: Number,
    amountSold: Number,
    discount: Number,
    picture: String,
    brand_id: {
        type: mongoose.ObjectId,
        ref: 'seller'
    },
    reviews: [{
        type: mongoose.ObjectId,
        ref: 'review'
    }]
}, {
    timestamps: true
})

let Product = mongoose.model('product', productSchema)

let chatSchema = new mongoose.Schema ({
    people: [{
        type: mongoose.ObjectId,
        ref: 'seller'
    }, {
        type: mongoose.ObjectId,
        ref: 'customer'
    }],
    messages: [{
        type: mongoose.ObjectId,
        ref: 'message'
    }]
}, {
    timestamps: true
})

let Chat = mongoose.model('chat', chatSchema)

let messageSchema = new mongoose.Schema ({
    from: mongoose.ObjectId,
    to: mongoose.ObjectId,
    text: String
}, {
    timestamps: true
})

let Message = mongoose.model('message', messageSchema)

let VerifyTokenUser = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send('Вы не авторизованы')
    }

    jwt.verify(token.replace('Bearer ', ''), 'user', (error, decoded) => {
        if (error) {
            return res.status(401).send('Вы не авторизованы')
        }

        req.userId = decoded._id
        next()
    })
}

let VerifyTokenSeller = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json('Вы не авторизованы')
    }

    jwt.verify(token.replace('Bearer ', ''), 'seller', (error, decoded) => {
        if(error) {
            return res.status(401).json('Вы не авторизованы')
        }

        req.sellerId = decoded._id
        next()
    })
}

let getRandomArticle = () => {
    let min = 100000
    let max = 999999
    return Math.floor(Math.random() * (max - min) + min)
}

let CreateArticle = async () => {
    while(true) {
        article = getRandomArticle()
        let existArticle = await Product.findOne({article: article})
        if(!existArticle) {
            return article
        }
    }
}

app.post('/registration', async (req, res) => {
    let { name, password, mail } = req.body

    let checkMail = await Customer.findOne({mail: mail})

    if(checkMail) {
        return res.status(409).send('Аккаунт с введенной почтой уже существует')
    }

    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)

    let cart = new Cart({
        products: [],
        totalCost: 0
    })

    await cart.save()

    let customer = new Customer({
        name: name,
        password: hashedPassword,
        mail: mail,
        profilePicture: 'user.png',
        cart_id: cart._id,
        orders: [],
        chats: [],
        reviews: [],
        refunds: [],
        operations: [],
        balance: 0,
        amountRedemption: 0,
        boughtProducts: 0
    })

    await customer.save()

    res.sendStatus(200)
})

app.post('/login', async (req,res) => {
    let { mail, password } = req.body

    let customer = await Customer.findOne({mail: mail})

    if(!customer) {
        return res.status(404).send({
            message: 'Аккаунт пользователя не найден'
        })
    }

    let passwordCheck = await bcrypt.compare(password, customer.password)

    if(!passwordCheck) {
        return res.status(400).send({
            message: 'Неверные данные'
        }) 
    }

    let token = jwt.sign({_id: customer._id}, 'user')
    
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none'
    })

    res.send(token)
})

app.get('/main', VerifyTokenUser, async (req, res) => {
    let customer = await Customer.findOne({ _id: req.userId })
    
    if(!customer) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }
    
    res.send(customer)
})

app.post('/mail/change', VerifyTokenUser, async (req, res) => {
    let mail = req.body.mail
    let check = await Customer.findOne({ mail: mail })

    if(check) {
        return res.status(409).send('Аккаунт с введенной почтой уже существует')
    }

    let customer = await Customer.findOne({ _id: req.userId })

    if(!customer) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    customer.mail = mail

    await customer.save()

    return res.status(200).json({ message: 'Почта успешно изменена' })
})

app.post('/name/change', VerifyTokenUser, async (req, res) => {
    let name = req.body.name

    let customer = await Customer.findOne({ _id: req.userId })

    if(!customer) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    customer.name = name

    await customer.save()

    return res.status(200).json({ message: 'Имя успешно изменено' })
})

app.get('/products', async (req, res) => {
    let products = await Product.find().populate('brand_id')

    res.send(products)
})

app.get('/product', async (req, res) => {
    let article = req.query.article

    let product = await Product.findOne({article: article}).populate({
        path: 'reviews',
        populate: {
            path: 'author_id'
        },
        options: {
            sort: {
                createdAt: -1
            }
        }
    }).populate('brand_id')

    res.send(product)
})

app.post('/review/create', VerifyTokenUser, async (req, res) => {
    let article = req.body.article
    let text = req.body.text
    let rating = req.body.rating

    let customer = await Customer.findOne({_id: req.userId})

    if(!customer) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    let review = new Review({
        text: text,
        rating: rating,
        author_id: customer._id
    })

    await review.save()

    customer.reviews.push(review._id)

    await customer.save()

    let product = await Product.findOne({article: article}).populate('reviews')

    let averageCount = 0
    for(let i = 0; i < product.reviews.length; i++) {
        averageCount += product.reviews[i].rating
    }

    if (!isNaN(averageCount) && product.reviews.length > 1) {
        product.averageRating = (averageCount / product.reviews.length).toFixed(1)
    } else {
        product.averageRating = 0
    }

    product.amountReviews++
    product.reviews.push(review._id)
        
    await product.save()

    res.sendStatus(200)
})

app.post('/cart/add', VerifyTokenUser, async (req, res) => {
    let article = req.body.article

    let customer = await Customer.findOne({ _id: req.userId }).populate('cart_id')

    if(!customer) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }
        
    let product = await Product.findOne({article: article})

    let cart = await Cart.findOne({_id: customer.cart_id})
        
    cart.products.push(product._id)
    cart.totalCost += product.price

    await cart.save()

    res.sendStatus(200)
})

app.post('/cart/remove', VerifyTokenUser, async (req, res) => {
    let article = req.body.article

    let customer = await Customer.findOne({_id: req.userId}).populate('cart_id')

    if(!customer) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    let product = await Product.findOne({article: article})

    let cart = await Cart.findOne({_id: customer.cart_id})
        
    cart.products.splice(product._id, 1)
    cart.totalCost -= product.price

    await cart.save()

    res.send({product, cart})
})

app.get('/product/check', VerifyTokenUser, async (req, res) => {
    let article = req.query.article

    let customer = await Customer.findOne({ _id: req.userId })

    if(!customer) {
        return res.status(401).send('Вы не авторизованы')
    }
        
    let product = await Product.findOne({article: article})

    let cart = await Cart.findOne({_id: customer.cart_id})
    
    let check = cart.products.includes(product._id)

    if(check) {
        return res.sendStatus(409)
    }
    
    res.sendStatus(200)
})

app.get('/cart', VerifyTokenUser, async (req, res) => {
    let customer = await Customer.findOne({ _id: req.userId })

    if(!customer) {
        return res.status(401).send('Вы не авторизованы')
    }

    let cart = await Cart.findOne({_id: customer.cart_id}).populate({
        path: 'products',
        populate: {
            path: 'brand_id'
        },
        options: {
            sort: {
                createdAt: 1
            }
        }
    })

    res.send({customer, cart})
})







app.post('/logout', async (req,res) => {
    res.cookie('user-jwt', '', {maxAge: 0})

    res.sendStatus(200)
})

app.post('/registration/seller', async (req, res) => {
    let { brandName, brandCategory, name, mail, tel, description, password } = req.body
    
    let check = await Seller.findOne({mail: mail})

    if(check) {
        return res.status(409).send('Аккаунт с введенной почтой уже существует')
    }

    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)

    let seller = new Seller({
        brandName: brandName,
        brandCategory: brandCategory,
        name: name,
        mail: mail,
        tel: tel,
        description: description,
        password: hashedPassword,
        products: [],
        orders: [],
        balance: 0,
        sold: 0,
        activeOrders: 0,
        returns: 0,
        activeReturns: 0,
        chats: [],
        refunds: []
    })

    await seller.save()

    res.sendStatus(200)
})

app.post('/login/seller', async (req, res) => {
    let { mail, password } = req.body

    let seller = await Seller.findOne({mail: mail})

    if(!seller) {
        return res.status(404).send({
            message: 'Аккаунт продавца не найден'
        })
    }

    let passwordCheck = await bcrypt.compare(password, seller.password)

    if(!passwordCheck) {
        return res.status(400).send({
            message: 'Неверные данные'
        }) 
    }

    let token = jwt.sign({_id: seller._id}, 'seller')

    res.cookie('seller-jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none'
    })

    res.send(token)
})

app.get('/main-seller', VerifyTokenSeller, async (req, res) => {
    let seller = await Seller.findOne({_id: req.sellerId})

    if(!seller) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    res.send(seller)
})

app.post('/product/create', VerifyTokenSeller, async (req, res) => {
    let { title, description, price, category, picture } = req.body
    
    let seller = await Seller.findOne({_id: req.sellerId})

    if(!seller) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    let check = await Product.findOne({$or: [{description: description}, {picture: picture}]})

    if(check) {
        return res.status(409).send('Ошибка при создании')
    }

    let product = new Product({
        title: title,
        description: description,
        category: category,
        price: price,
        averageRating: 0,
        amountReviews: 0,
        article: await CreateArticle(),
        amountSold: 0,
        discount: 0,
        picture: picture,
        brand_id: seller._id,
        reviews: []
    })

    await product.save()

    seller.products.push(product._id)

    await seller.save()

    res.sendStatus(200)
})

app.get('/products/all', VerifyTokenSeller, async (req, res) => {
    let seller = await Seller.findOne({_id: req.sellerId})

    if(!seller) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    let products = await seller.populate('products')

    res.send(products)
})

app.post('/product/remove', VerifyTokenSeller, async (req, res) => {
    let id = req.body.id

    let seller = await Seller.findOne({_id: req.sellerId})

    if(!seller) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    let product = await Product.deleteOne({_id: id})

    seller.products.splice(product._id, 1)

    await seller.save()

    res.sendStatus(200)
})

app.post('/discount/set', VerifyTokenSeller, async (req, res) => {
    let id = req.body.id
    let discount = req.body.discount

    let seller = await Seller.findOne({_id: req.sellerId})

    if(!seller) {
        return res.status(401).send({
            message: 'Вы не авторизованы'
        })
    }

    let product = await Product.findOne({_id: id})
    product.discount = discount

    await product.save()

    res.sendStatus(200)
})







app.post('/logout/seller', async (req, res) => {
    res.cookie('seller-jwt', '', {maxAge: 0})

    res.sendStatus(200)
})