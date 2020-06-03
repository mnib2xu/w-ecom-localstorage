window.onload = function () {

    const orderData = {
        'Cielo': []
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

    // Append Giftees at the right productOrder
    insertGifteeHTML = function (itemsInView) {
        let i;
        for (i = 0; i < itemsInView.length; i++) {
            if (itemsInView[i].innerText !== '' && orderData[itemsInView[i].innerText] !== []) {
                JSON.parse(localStorage.getItem("orderData"))[itemsInView[i].innerText].forEach((x) => {
                    itemsInView[i].insertAdjacentHTML('afterend', `
                    <div class="cartGiftee" style="display:flex;">
                        <p style="margin:4px;">${x.name} ${x.email}</p>
                    </div>
                    `
                    )
                })
            }
        }
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

            if (orderData[productTitle] === undefined) {
                orderData[productTitle] = [];
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
        updateLocalStorage();
        updateCartQuantity();
        $('.cartGiftee').remove();

        let itemsInCartView = document.getElementsByClassName('w-commerce-commercecartproductname');
        insertGifteeHTML(itemsInCartView);

        let itemsInCheckoutView = document.getElementsByClassName('w-commerce-commerceboldtextblock');
        insertGifteeHTML(itemsInCheckoutView);
    }

    // Continue to Checkout button
    document.getElementById("continueToCheckout").onclick = function () {
        updateLocalStorage();
        updateCartQuantity();
        $('.cartGiftee').remove();

        let itemsInCartView = document.getElementsByClassName('w-commerce-commercecartproductname');
        insertGifteeHTML(itemsInCartView);

        let itemsInCheckoutView = document.getElementsByClassName('w-commerce-commerceboldtextblock');
        insertGifteeHTML(itemsInCheckoutView);
    }

    // Cart open link (Cart / Go to Cart)
    document.querySelector(".w-commerce-commercecartopenlink").onclick = function () {

    }
}