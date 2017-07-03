var stripe = Stripe("pk_test_v3BPFcAoI4QOU8kJ9sUZ8HQe");
var elements = stripe.elements();

var card = elements.create("card", {
    style: {
        base: {

        }
    }
});
card.mount("#card-element");

card.addEventListener("change", function(event) {
    var errorDiv = document.getElementById("card-errors");
    if (event.error) {
        errorDiv.textContent = event.error.message;
    } else {
        errorDiv.textContent = "";
    }
});



var form = document.getElementById("payment-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
        if (result.error) {
            var errorElement = document.getElementById("card-errors");
            errorElement.textContent = result.error.message;
        } else {
            stripeTokenHandler(result.token);
        }
    });
});


function stripeTokenHandler(token) {
    var form = document.getElementById("payment-form");
    var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token.id);
    form.appendChild(hiddenInput);

    form.submit();
}