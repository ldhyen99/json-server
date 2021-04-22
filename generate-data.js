const { random, fake } = require('faker');
const faker = require('faker')
const fs = require("fs")

faker.locale = 'vi'

// console.log(faker.commerce.department());
// console.log(faker.commerce.product());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());

const randomCategoryList = (numbers) => {
    if (numbers <= 0) return []

    const categoryList = []

    // loop and push category 
    Array.from(new Array(numbers)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        categoryList.push(category)
    })

    return categoryList
}

const randomProductList = (categoryList, numbers) => {
    if (numbers <= 0) return []
    const productList = []

    for (const category of categoryList) { // ứng từng danh mục thì làm gì đó
        Array.from(new Array(numbers)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400, 400)
            }

            productList.push(product)
        })
    }

    return productList
}

//IFFE
(() => {
    // prepare db object
    const categoryList = randomCategoryList(4)
    const productList = randomProductList(categoryList, 5) //Đầu vào là categoryList, mỗi cate có 5 sp => 20sp tổng

    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Hy"
        }
    };

    // write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Write data successfully :v');
    })
})()