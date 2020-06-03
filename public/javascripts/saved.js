window.onload = function () {

    const orderDataUnique = {}

    // Update Local Storage
    updateLocalStorage = function (orderDataUnique) {
        localStorage.setItem("orderDataUnique", JSON.stringify(orderDataUnique))
        JSON.parse(localStorage.getItem("orderDataUnique"))
        console.log(JSON.parse(localStorage.getItem("orderDataUnique")))
    }

    // Empty InputFields
    clearInputFields = function () {
        document.getElementById("gifteeName").value = null;
        document.getElementById("gifteeEmail").value = null;
    }

    // Update Cart Quantity
    updateCartQuantity = function () {
        setTimeout(function(){
            let cartQuantityArray = document.getElementsByClassName("cartquantity");

            console.log(document.getElementsByClassName("cartquantity")[0].value)

            for (i=0; i < cartQuantityArray.length; i++) {
                let productTitle = cartQuantityArray[i].parentElement.firstElementChild.innerText
    
                // if (orderDataUnique[productTitle] !== undefined) {
                    document.getElementsByClassName("cartquantity")[i].value = orderDataUnique[productTitle].length
                // }
            }
            updateLocalStorage(orderDataUnique)
        },3000);
    }

    // Append Giftees at the right productOrder
    insertGifteeHTML = function (itemsInView) {
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
        updateLocalStorage(orderDataUnique);

        debugger
        updateCartQuantity();

        $('.cartGiftee').remove();

        let itemsInCartView = document.getElementsByClassName('w-commerce-commercecartproductname');
        insertGifteeHTML(itemsInCartView);

        let itemsInCheckoutView = document.getElementsByClassName('w-commerce-commerceboldtextblock');
        insertGifteeHTML(itemsInCheckoutView);
    }

    // Continue to Checkout button
    document.getElementById("continueToCheckout").onclick = function () {
        updateLocalStorage(orderDataUnique);
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