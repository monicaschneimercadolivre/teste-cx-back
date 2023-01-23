

const { ProductModel } = require('../model/product');
const { ProductItemModel } = require('../model/productItem');
const { agregation } = require('../agregations/productItemDetail')
const { agregationSearch } = require('../agregations/productSearch')
const { agregationAuthorItem,agregationItem, agregationAuthorHasItem } = require('../agregations/authorItem')
const { ObjectId } = require("mongodb");


class ProductService {

  constructor() { }

  async create(product) {
    return await ProductModel.create(product)
  }

  async findBySearch(search) {
    const response = await agregationSearch(search)
    return response
  }

  async findItemById(id) {
    const response = await agregation(id)
    console.log(response)
    return response
  }

  async findItemByIdFomProductItem (itemId){
    const response = await agregationItem(itemId)
    return response
  }

  async saveProductItem(productImage) {
    let response = await ProductItemModel.create(productImage)
    return response
  }

  async addPriceToItemm(price, itemId){
    const updatedItem = ProductItemModel.updateOne({_id: ObjectId(itemId)},{
      $set:{
      price: {
        currency: price.currency,
        amount: price.amount,
        decimals: price.decimals
      },
      }
    })
    return updatedItem
  }

  async findToAuthor(authorId){
    const authorItem = await agregationAuthorItem(authorId)
    const arrayItems = authorItem.map((author)=> author.items).flat()
    return arrayItems
  }

  async addItemToAuthor(authorId, itemId){
    const arrayAuthor = await this.findToAuthor(authorId)
    const newItem = await this.findItemByIdFomProductItem(itemId)
    if(arrayAuthor.length === 0 || arrayAuthor.some((id)=> id._id == itemId) === false){ // '==' pra não avaliar o tipo, somente o número _id é numero, itemId é string
    const updatedArrayItemsAuthor = arrayAuthor.concat(newItem)
    console.log(newItem)
    console.log(updatedArrayItemsAuthor)
    const authorItetmsUpdated = ProductModel.updateOne({_id: ObjectId(authorId)},
  {
    $set:{
     items: updatedArrayItemsAuthor
    }
  })

    return authorItetmsUpdated
  }
return `The item: ${itemId} already is in the author list`
}

 
}

module.exports = {
  ProductService,
};