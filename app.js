const maxCashbackPerMonth = 10000; // THB
const maxCashbackPerOrder = 500; // THB

function redirectToShop(shop, cashbackPercentage) {
    const userId = 'U123098'; // Example UserID
    const url = `http://localhost:5500/redirect?shop=${shop}&userId=${userId}&cashback=${cashbackPercentage}`;
    window.location.href = url;
}

function calculateCashback(priceAfterDiscount, cashbackPercentage, userId) {
    let cashback = priceAfterDiscount * cashbackPercentage;
    if (cashback > maxCashbackPerOrder) {
        cashback = maxCashbackPerOrder;
    }

    const userData = userCashbackData[userId];
    const currentMonth = new Date().getMonth();

    if (userData.month !== currentMonth) {
        userData.totalCashbackThisMonth = 0;
        userData.month = currentMonth;
    }

    if ((userData.totalCashbackThisMonth + cashback) > maxCashbackPerMonth) {
        const remainingCashback = maxCashbackPerMonth - userData.totalCashbackThisMonth;
        cashback = remainingCashback > 0 ? remainingCashback : 0;
    }

    userData.totalCashbackThisMonth += cashback;
    return cashback;
}

async function notifyOrder(orderData) {
    try {
        const response = await fetch('http://localhost:3000/3rd-api/update-user-order', {
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
const orderData = {
    OrderID: 'LM123568',
    XShopPortalUserID: 'U123098',
    PaymentType: 'Credit Card',
    TotalPrice: 1500,
    PriceAfterDiscount: 1200,
    ShippingFee: 100,
    Timestamp: new Date().toISOString()
};

// Uncomment below line to test the API notification
// notifyOrder(orderData);
