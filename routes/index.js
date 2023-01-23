const express = require('express')
const router = express()
const multer = require('multer')
const crypto = require('crypto')
const { extname } = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        const newFileName = crypto.randomBytes(32).toString('hex')
        const fileExtension = extname(file.originalname)
        cb(null, newFileName + fileExtension)
    }
})
const upload = multer({ storage })
const { ProductService } = require('../service/productService');

//Adicionar produto com author.
//Body: 
// {
//     "author": {
//         "name": "Autho1",
//         "lastName": "LastName1",
//         "locale": "Locale1"
//     },
//     "categories": ["Eletrônicos"],
//     "items": []
// }
router.post('/product', async (req, res, next) => {
    const product = req.body
    const productService = new ProductService()
    await productService.create(product);
    return res.status(200).json(product);
})

// adicionaar item
// Body:
// Title:Celular
// condition:ótima
// free_shipping:true
// stock:12
// description:Iphone 23 prata novinho em folha

router.post('/items', upload.single('picture'),async (req, res, next) => {
const productItem = {
    product: JSON.parse(JSON.stringify(req.body)),
    image: req.file
}
    const productService = new ProductService()
    const productImageItem = await productService.saveProductItem(productItem.product);
    return res.status(201).json({
        message: "Created product successfuly",
    })
})

//adicionar preço ao item
//Body:
// {
//     "currency": "R$",
//     "amount": 5000,
//     "decimals": 0
// }
router.post('/item/price/:itemId', async (req, res, next)=>{
    const price = req.body
    const itemId = req.params.itemId
    const priceService = new ProductService()
    const itemPrice = await priceService.addPriceToItemm(price, itemId)
    return res.status(200).json(itemPrice)
})

//aidiconar item ao autor
router.get('/author/:authorId/:itemId', async(req,res,next)=>{
    const authorId =req.params.authorId
    const itemId = req.params.itemId
    const authorService =new ProductService()
    const addItemToAuthor = await authorService.addItemToAuthor(authorId,itemId )
    return res.status(200).json(addItemToAuthor)
})

//pegar a lista de items com o mesmo título
router.get('/items', async (req, res, next) => {
    const search = req.query.search
    console.log(search)
    const productService = new ProductService()
    const products = await productService.findBySearch(search);
    return res.status(201).json(products);
})

//Pega o item pelo id
router.get('/items/:id', async (req, res, next) => {
    const id = req.params.id
    const productService = new ProductService()
    const product = await productService.findItemById(id);
    return res.status(201).json(product);
})

module.exports = router;