window.onload = function () {

    const orderDataUnique = {}

    // Update Local Storage
    updateLocalStorage = function () {
        localStorage.setItem("orderDataUnique", JSON.stringify(orderDataUnique))
        JSON.parse(localStorage.getItem("orderDataUnique"))
        // console.log(JSON.parse(localStorage.getItem("orderDataUnique")))
    }

    // Empty InputFields
    clearInputFields = function () {
        document.getElementById("gifteeName").value = null;
        document.getElementById("gifteeEmail").value = null;
    }

    // Update Cart Quantity
    updateCartQuantity = function () {
            let cartQuantityArray = document.getElementsByClassName("cartquantity");
            for (i=0; i < cartQuantityArray.length; i++) {
                let productTitle = '';

                // CartList Producttitle Targeting
                if (cartQuantityArray[i].parentElement.children[1].children[0] !== undefined) {
                    productTitle = cartQuantityArray[i].parentElement.children[1].children[0].innerText
                }

                if (orderDataUnique[productTitle] !== undefined) {
                    document.getElementsByClassName("cartquantity")[i].value = orderDataUnique[productTitle].length
                    $(".cartquantity")[i].focus();
                    const ke = new KeyboardEvent("keydown", {
                        bubbles: true, cancelable: true, keyCode: 13
                    });
                    document.body.dispatchEvent(ke);
                }
            }
    }

    // Update Checkout Quantity
    updateCheckoutQuantity = function () {
        let checkoutquantityArray = document.getElementsByClassName("checkoutquantity");
        for (i=0; i < checkoutquantityArray.length; i++) {
            let productTitle = '';


            // CartList Producttitle Targeting
            if (checkoutquantityArray[i].parentElement.firstElementChild !== undefined) {
                productTitle = checkoutquantityArray[i].parentElement.firstElementChild.innerText
            }

            if (orderDataUnique[productTitle] !== undefined) {
                document.getElementsByClassName("checkoutquantity")[i].value = orderDataUnique[productTitle].length
            }
        }
    }

    // Append Giftees at the right productOrder
    insertGifteeHTML = function (itemsInView) {
        setTimeout(() => {
            let i;
            for (i = 0; i < itemsInView.length; i++) {
                if (itemsInView[i].innerText !== '' && orderDataUnique[itemsInView[i].innerText] !== []) {
                    if (orderDataUnique[itemsInView[i].innerText] !== undefined) {
                        JSON.parse(localStorage.getItem("orderDataUnique"))[itemsInView[i].innerText].forEach((x) => {
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
            updateCartQuantity()
        }, 1000);
    }

    // Add orderDataUnique
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

            if (orderDataUnique[productTitle] === undefined) {
                orderDataUnique[productTitle] = [];
            }
            console.log(orderDataUnique);

            orderDataUnique[productTitle].push(singleOrder);
            document.getElementById("gifteeList").innerHTML = '';
            if (orderDataUnique[productTitle].length >= 1) {
                orderDataUnique[productTitle].forEach(function(x) {
                    list.insertAdjacentHTML('beforeend', `
                    <div style="display:flex;">
                        <p style="margin:4px;">${x.name} ${x.email}</p>
                    </div>
                    `)
                });
            }
            document.getElementById("quantity-4b15c280ea11e6a3b92d522c3eec69df").value = orderDataUnique[productTitle].length;
        }
        clearInputFields();
    }

    // Clearing the Data
    document.getElementById("clearList").onclick = function () {
        let productTitle = document.getElementsByClassName("size1-text")[0].innerText;
        let productQuantity = document.getElementById("quantity-4b15c280ea11e6a3b92d522c3eec69df");
        document.getElementById("gifteeList").innerHTML = '';
        orderDataUnique[productTitle] = [];
        productQuantity.value = orderDataUnique[productTitle].length;
        clearInputFields()
        updateLocalStorage(orderDataUnique)
    }

    // Add to Cart / Update
    document.getElementById("add-to-cart").onclick = function () {
        updateLocalStorage();
        updateCartQuantity();
        updateCheckoutQuantity();

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
        updateCheckoutQuantity();

        $('.cartGiftee').remove();


        let itemsInCartView = document.getElementsByClassName('w-commerce-commercecartproductname');
        insertGifteeHTML(itemsInCartView);

        let itemsInCheckoutView = document.getElementsByClassName('w-commerce-commerceboldtextblock');
        insertGifteeHTML(itemsInCheckoutView);
    }
}