let resultado = document.querySelector("#resultado");
let btn = document.querySelector(".btn")
let change = "";


function valorMoneda() {
    let select = document.getElementById("tipoCambio");
    change = select.options[select.selectedIndex].value;
}

//API
btn.addEventListener("click", async function getValorPeso() {

    let pesos = document.querySelector("#pesos").value;
    let getChart = "";

    if (pesos === "") {
        alert("Ingrese un valor")
    } else if (isNaN(pesos)) {
        alert("Debe ingresar valores numericos")
    } else {
        try {
            const res = await fetch(`https://mindicador.cl/api/${change}`);
            const data = await res.json()
            if (change === "dolar") {
                let conversion = ((pesos) / (data.serie[0].valor)).toFixed(2);
                resultado.innerHTML = "USD " + conversion;
                getChart = data.serie.splice(0, 10);
                jsChart(getChart);
            } else if (change === "euro") {
                let conversion = ((pesos) / (data.serie[0].valor)).toFixed(2);
                resultado.innerHTML = "EUR " + conversion;
                getChart = data.serie.splice(0, 10);
                jsChart(getChart);
            } else {
                alert("Por favor selecciona una moneda")
            }
        } catch (e) {
            alert("Algo salio mal al cargar la página, reitenta")
        }
    }
}
);

function jsChart(getChart) {

    let grafica = document.querySelector("#grafica")
    let xValue = [];
    let yValue = [];
    for (let i = 0; i < getChart.length; i++) {
        yValue.push(getChart[i].fecha.substring(0, 10));
        xValue.push(getChart[i].valor);
    }
    grafica.style.backgroundColor = "#57575779";

    new Chart("myChart", {
        type: "line",
        data: {
            labels: yValue.reverse(),
            datasets: [{
                fill: false,
                pointRadius: 1,
                borderColor: "#008CBA",
                data: xValue.reverse()
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Valor de los último 10 días",
                fontSize: 16
            }
        }
    }
    );
}

