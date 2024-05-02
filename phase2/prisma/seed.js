import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const buyersPath = path.join(process.cwd(), 'app/data/buyers.json')
const categoriesPath = path.join(process.cwd(), 'app/data/categories.json')
const productsPath = path.join(process.cwd(), 'app/data/products.json')
const sellersPath = path.join(process.cwd(), 'app/data/sellers.json')
const transactionsPath = path.join(process.cwd(), 'app/data/transactions.json')

async function main() {
    try {
        const buyers = await fs.readJSON(buyersPath)
        const categories = await fs.readJSON(categoriesPath)
        const products = await fs.readJSON(productsPath)
        const sellers = await fs.readJSON(sellersPath)
        const transactions = await fs.readJSON(transactionsPath)

        for (const buyer of buyers) await prisma.buyer.create({ data: buyer })
        for (const category of categories) await prisma.category.create({ data: category })
        for (const product of products) await prisma.product.create({ data: product })
        for (const seller of sellers) await prisma.seller.create({ data: seller })
        for (const transaction of transactions) await prisma.transaction.create({ data: transaction })

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })