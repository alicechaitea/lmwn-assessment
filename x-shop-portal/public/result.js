function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        shop: params.get('shop'),
        orderId: params.get('orderId'),
        userId: params.get('userId'),
        paymentType: params.get('paymentType'),
        totalPrice: params.get('totalPrice'),
        priceAfterDiscount: params.get('priceAfterDiscount'),
        shippingFee: params.get('shippingFee'),
        timestamp: params.get('timestamp'),
        cashback: params.get('cashback')
    };
}

function displayOrderDetails() {
    const params = getQueryParams();

    document.getElementById('order-id').innerText = `Order ID: ${params.orderId}`;
    document.getElementById('user-id').innerText = `User ID: ${params.userId}`;
    document.getElementById('payment-type').innerText = `Payment Type: ${params.paymentType}`;
    document.getElementById('total-price').innerText = `Total Price: ${params.totalPrice}`;
    document.getElementById('price-after-discount').innerText = `Price After Discount: ${params.priceAfterDiscount}`;
    document.getElementById('shipping-fee').innerText = `Shipping Fee: ${params.shippingFee}`;
    document.getElementById('timestamp').innerText = `Timestamp: ${params.timestamp}`;
    document.getElementById('cashback-display').innerText = `Total cashback for ${params.shop}: ${params.cashback} THB`;
}

window.onload = displayOrderDetails;
