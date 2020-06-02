window.onload = function () {

    const orderData = {
        'Bola Halo': [],
        'Cielo': [],
        'Circa': []
    }

    // If there we are on the page with an order class or id, and an order is placed on that order, then right below the class it should display a list or names on that order.

    // Add orderdata
    document.getElementById("addGiftee").onclick = function () {
        const gifteeName = document.getElementById("gifteeName").value;
        const gifteeEmail = document.getElementById("gifteeEmail").value;
        const list = document.getElementById("gifteeList");

        const productTitle = document.getElementsByClassName("size1-text")[1].innerText

        // Add order to Array Object
        if (gifteeName.length > 1 && gifteeEmail.includes("@")) {
            const singleOrder = {
                'name': gifteeName,
                'email': gifteeEmail
            }
            orderData[productTitle].push(singleOrder);
            document.getElementById("gifteeList").innerHTML = '';
            if (orderData[productTitle].length >= 1) {
                orderData[productTitle].forEach(function(x) {
                    list.insertAdjacentHTML('beforeend', `
                    <div style="display:flex;">
                        <p style="margin:4px;">${x.name} ${x.email}</p>
                    </div>
                    `)
                });
            }
            document.getElementById("quantity-4b15c280ea11e6a3b92d522c3eec69df").value = orderData[productTitle].length;
        }

        // Clear input fields
        document.getElementById("gifteeName").value = null;
        document.getElementById("gifteeEmail").value = null;
    }

    // Clearing the Data
    document.getElementById("clearList").onclick = function () {
        let productTitle = document.getElementById("quantity-4b15c280ea11e6a3b92d522c3eec69df");
        document.getElementById("gifteeList").innerHTML = '';
        orderData[productTitle] = [];
        productTitle.value = orderData[productTitle].length;
        document.getElementById("gifteeName").value = null;
        document.getElementById("gifteeEmail").value = null;
    }

    // Add to Cart
    document.getElementById("add-to-cart").onclick = function () {
        debugger
        localStorage.setItem("orderData", JSON.stringify(orderData));
    }

    // Cart open link (Cart / Go to Cart)
    document.querySelector(".w-commerce-commercecartopenlink").onclick = function () {
        localStorage.setItem("orderData", JSON.stringify(orderData));

        let itemsInOrder = document.getElementsByClassName('w-commerce-commercecartproductname');
        let i;
        for (i = 0; i < itemsInOrder.length; i++) {
            if (itemsInOrder[i].innerText !== '') {
                JSON.parse(localStorage.getItem("orderData"))[itemsInOrder[i].innerText].forEach((x) => {
                    itemsInOrder[i].insertAdjacentHTML('beforeend', `
                    <div style="display:flex;">
                        <p style="margin:4px;">${x.name} ${x.email}</p>
                    </div>
                    `
                    )
                })
            }
        }
    }
}

// w-commerce-commercecartlist
// w-commerce-commercecartproductname


// itemsInOrder.forEach((x) => {
//     console.log(JSON.parse(localStorage.getItem("orderData"))[x.innerText]);
//     if ((JSON.parse(localStorage.getItem("orderData"))[x.innerText]) !== []) {

//     }
//     debugger;
// })