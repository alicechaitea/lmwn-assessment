const maxCashbackPerMonth = 10000; // THB
const maxCashbackPerOrder = 500; // THB

function calculateCashback(priceAfterDiscount, cashbackPercentage, userId, userCashbackData) {
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

module.exports = {
    calculateCashback
};
