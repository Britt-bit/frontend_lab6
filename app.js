// Primus live
primus = Primus.connect("http://localhost:3000/", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if(json.action === "updated counter") {
        refreshData(json.data);
        console.log(json.data);
    }
})





document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    let country = document.getElementById("country").value;
    let amount = document.querySelector(".amount").value;
    console.log(country);
    console.log(amount);

    fetch(`http://localhost:3000/updateStats/`+country, {
        method: "put",
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "amount": amount
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            refreshData(json)

            primus.write({
                "action": "updated counter",
                "data": json
            })
        }
    })

});


let refreshData = (json) => {
    let Belgium = document.querySelector(".Belgium");
    let Netherland = document.querySelector(".Netherland");
    let France = document.querySelector(".France");
    Belgium.textContent = json.country.Belgium;
    Netherland.textContent = json.country.Netherland;
    France.textContent = json.country.France;

}