import { Mongoose, Schema, model } from "mongoose";
import { config } from "dotenv"

config()

const mongo = new Mongoose()

async function aula04() {
    try {
        await mongo.connect(process.env.DATABASE_URL || "")
        console.log("Conexão realizada com sucesso");
        
        const salesSchema = new Schema({
            product: String,
            state: String,
            quantity: Number,
            unitPrice: Number
        })

        const sales = mongo.model('vendas', salesSchema);

        const firstQuery = await sales.aggregate([
            {
                $group: { _id: "$state" }
            }   
        ])

        const secondQuery = await sales.aggregate([
            { $match: { quantity: { $gt: 100 } } },
            {
                $group: {
                    _id: "$state",
                    totalSales: { $sum: { $multiply: ["$quantity", "$unitPrice"] } }
                }
            }
        ])

        console.log("Primeira questão: \n", firstQuery);
        console.log("Segunda questão: \n", secondQuery);

    } catch (error) {
        console.log("Um erro aconteceu");
        console.log(error);
    }
}

aula04()