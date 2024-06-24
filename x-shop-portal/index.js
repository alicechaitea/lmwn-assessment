const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { calculateCashback } = require('./utils');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const userCashbackData = {};

const shopCashbackRates = {
    amazon: 0.05,
    shopee: 0.07,
    lazada: 0.02,
    ebay: 0.03
};

app.post('/3rd-api/update-user-order', (req, res) => {
    const {
        OrderID,
        XShopPortalUserID,
        PaymentType,
        TotalPrice,
        PriceAfterDiscount,
        ShippingFee,
        Timestamp
    } = req.body;

    if (!OrderID || !XShopPortalUserID || !PaymentType || !TotalPrice || !PriceAfterDiscount || !ShippingFee || !Timestamp) {
        return res.status(400).json({ status: 'ERROR', message: 'Missing required fields' });
    }

    // Initialize user data if not present
    if (!userCashbackData[XShopPortalUserID]) {
        userCashbackData[XShopPortalUserID] = {
            totalCashbackThisMonth: 0,
            month: new Date().getMonth()
        };
    }

    const cashbackPercentage = parseFloat(req.query.cashback) || 0;
    const cashback = calculateCashback(PriceAfterDiscount, cashbackPercentage, XShopPortalUserID, userCashbackData);

    // Respond with success
    res.status(200).json({ status: 'OK', OrderId: OrderID, USER_ID: XShopPortalUserID });
});

const port = 5500;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
