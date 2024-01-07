const { PrismaClient } = require('@prisma/client');
var express = require('express');
var router = express.Router();





let prisma = new PrismaClient


//GetTranscationDetails
router.get('/GetTranscationDetails', async (req, res) => {
    try {
        let transactionId = req.body.transactionId
        let Transaction = await prisma.transaction.findFirst({
            where: {
                id: transactionId
            }
        })
        res.json(Transaction)
    } catch (error) {
        console.log(error)

    }
})


//AddTranscationSplitbyRatio
router.get('/AddTranscationSplitbyRatio', async (req, res) => {
    try {
        let { name, Amount, Category, ratio, groupId } = req.body
        let denominator = Object.values(ratio).reduce((sum, value) => sum + value, 0)
        let Share = {};
        for (let key in ratio) {
            Share[key] = (ratio[key] / denominator) * Amount;
        }
    } catch (error) {
        console.log(error)

    }
})

//UpdateTransations
router.get('/UpdateTransations', async (req, res) => {
    try {
    } catch (error) {
        console.log(error)

    }
})

//DeleteTransaction
router.get('/DeleteTransaction', async (req, res) => {
    try {
        let id = req.body.transactionId
        let transaction = await prisma.transaction.delete({
            where: {
                id: id
            }

        })
    } catch (error) {
        console.log(error)

    }
})


module.exports = router;