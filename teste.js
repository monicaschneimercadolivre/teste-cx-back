const array = [
    {
      _id:"63b2b66b72373189653dfb7c",
      title: 'Aitem',
      condition: 'great',
      free_shipping: true,
      sold_quantity: 12,
      description: 'description',
      createdAt: '2023-01-02T10:48:11.078Z',
      updatedAt: '2023-01-02T22:41:13.093Z',
      __v: 0,
      picture: 'noPicture',
      price: { currency: 'R$', amount: 1234, decimals: 50 }
    }
  ]

  const array2 = [
    {
      title: 'item1',
      price: { currency: 'R$', amount: 123, decimals: 5 },
      picture: 'aPicture',
      condition: 'aCondition',
      free_shipping: true,
      sold_quantity: 23,
      description: 'aDescription',
      _id: "63a982ba4202d1d1daf2ea17"
    }
  ]
  const newArray = array.concat(array2)
  console.log(newArray)