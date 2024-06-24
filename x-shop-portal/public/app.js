const maxCashbackPerMonth = 10000; // THB
const maxCashbackPerOrder = 500; // THB

const shopCashbackRates = {
    amazon: 0.05,
    shopee: 0.07,
    lazada: 0.02,
    ebay: 0.03
};

const orderData = {
    OrderID: 'LM123568',
    XShopPortalUserID: 'U123098', // Example UserID
    PaymentType: 'Credit Card',
    TotalPrice: 1500,
    PriceAfterDiscount: 1200,
    ShippingFee: 100,
    Timestamp: new Date().toISOString()
};

function calculateCashback(priceAfterDiscount, cashbackPercentage) {
    let cashback = priceAfterDiscount * cashbackPercentage;
    if (cashback > maxCashbackPerOrder) {
        cashback = maxCashbackPerOrder;
    }
    return cashback;
}

function redirectToShop(shop) {
    const cashbackPercentage = shopCashbackRates[shop.toLowerCase()];
    const totalCashback = calculateCashback(orderData.PriceAfterDiscount, cashbackPercentage);

    const url = `result.html?shop=${shop}&orderId=${orderData.OrderID}&userId=${orderData.XShopPortalUserID}&paymentType=${orderData.PaymentType}&totalPrice=${orderData.TotalPrice}&priceAfterDiscount=${orderData.PriceAfterDiscount}&shippingFee=${orderData.ShippingFee}&timestamp=${orderData.Timestamp}&cashback=${totalCashback}`;
    window.location.href = url;
}

async function notifyOrder(orderData) {
    try {
        const response = await fetch('http://localhost:5500/3rd-api/update-user-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        const result = await response.json();
        if (result.status === 'OK') {
            alert(`Order ${result.OrderId} processed successfully for user ${result.USER_ID}.`);
        } else {
            alert('Error processing order.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error processing order.');
    }
}

// Example order data for notification
// Uncomment below line to test the API notification
// notifyOrder(orderData);
