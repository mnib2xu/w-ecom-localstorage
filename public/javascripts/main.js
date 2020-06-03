window.onload = function () {

    const orderData = {
        'Bola Halo': [],
        'Cielo': [],
        'Circa': []
    }

    // Update Local Storage
    updateLocalStorage = function () {
        localStorage.setItem("orderData", JSON.stringify(orderData))
        JSON.parse(localStorage.getItem("orderData"))
    }

    // Empty InputFields
    clearInputFields = function () {
        document.getElementById("gifteeName").value = null;
        document.getElementById("gifteeEmail").value = null;
    }

    // Update Cart Quantity
    updateCartQuantity = function () {
        let cartQuantityArray = document.getElementsByClassName("CartQuantity");
        for (i=0; i < cartQuantityArray.length; i++) {
            let productTitle = cartQuantityArray[i].parentElement.firstElementChild.innerText
            document.getElementsByClassName("CartQuantity")[i].value = orderData[productTitle].length
        }
        updateLocalStorage()
    }

    // Add orderdata
    document.getElementById("addGiftee").onclick = function () {
        const gifteeName = document.getElementById("gifteeName").value;
        const gifteeEmail = document.getElementById("gifteeEmail").value;
        const list = document.getElementById("gifteeList");

        const productTitle = document.getElementsByClassName("size1-text")[0].innerText

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
        clearInputFields();
    }

    // Clearing the Data
    document.getElementById("clearList").onclick = function () {
        let productTitle = document.getElementsByClassName("size1-text")[0].innerText;
        let productQuantity = document.getElementById("quantity-4b15c280ea11e6a3b92d522c3eec69df");
        document.getElementById("gifteeList").innerHTML = '';
        orderData[productTitle] = [];
        productQuantity.value = orderData[productTitle].length;
        clearInputFields()
        updateLocalStorage()
    }



    // Add to Cart / Update
    document.getElementById("add-to-cart").onclick = function () {
        localStorage.setItem("orderData", JSON.stringify(orderData));

        let itemsInCartView = document.getElementsByClassName('w-commerce-commercecartproductname');

        updateCartQuantity();
        $('.cartGiftee').remove();

        let i;
        for (i = 0; i < itemsInCartView.length; i++) {
            if (itemsInCartView[i].innerText !== '' && orderData[itemsInCartView[i].innerText] !== []) {
                orderData[itemsInCartView[i].innerText].forEach((x) => {
                    itemsInCartView[i].insertAdjacentHTML('afterend', `
                    <div class="cartGiftee" style="display:flex;">
                        <p style="margin:4px;">${x.name} ${x.email}</p>
                    </div>
                    `
                    )
                })
            }
        }
        updateLocalStorage();
    }



    // Cart open link (Cart / Go to Cart)
    document.querySelector(".w-commerce-commercecartopenlink").onclick = function () {

    }
}

// w-commerce-commercecartlist
// w-commerce-commercecartproductname

// JSON.parse(localStorage.getItem("orderData"))

// itemsInOrder.forEach((x) => {
//     console.log(JSON.parse(localStorage.getItem("orderData"))[x.innerText]);
//     if ((JSON.parse(localStorage.getItem("orderData"))[x.innerText]) !== []) {

//     }
//     debugger;
// })