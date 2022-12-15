const btnFrete = document.querySelector('#calcular-frete-btn');
const cepInput = document.querySelector('#cep-input');
const quantidadeSpan = document.querySelector('#quantidade span');
const freteSpan = document.querySelector('#valor-frete span');
const totalSpan = document.querySelector('#valor-total span')
const unidadeSpan = document.querySelector('#valor-unidade span');

const getFrete = async (cep) => {
    const response = await fetch("http://localhost:8080/calcular-frete", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ cep })
    });
    const data = await response.json();
    return { frete: data[0], response };
}

cepInput.addEventListener('keypress', event => {

    // Permite apenas números
    const theEvent = event || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) { theEvent.preventDefault(); };
        return;
    };

    if (cepInput.value.length > 4) {
        cepInput.value = [cepInput.value.toString().slice(0, 5), "-", cepInput.value.slice(6)].join('');
    };
});

cepInput.addEventListener('keydown', event => {
    // console.log(event)

    if (event.key === 'Backspace') {
        if (cepInput.value[cepInput.value.length - 2] === "-") {
            cepInput.value = cepInput.value.replace('-', '');
        };

        if (event.ctrlKey) {
            cepInput.value = "";
        };
    };
});

btnFrete.addEventListener('click', async () => {
    const cep = cepInput.value.replace('-', '');

    if (cep === "") {
        return;
    }

    if (cep.length < 8) {
        return;
    }

    btnFrete.disabled = true;
    const { frete, response } = await getFrete(cep);

    if (response.status === 200) {
        // document.querySelector('.valor-frete').classList.remove('d-none')
        // document.querySelector('.valor-frete span span').innerHTML = frete.valor;
        freteSpan.innerHTML = "R$" + frete.valor;
        calcularTotal();
    } else {
        alert("Ocorreu algum erro ao calcular o frete")
    }

    btnFrete.disabled = false;
});

const input = document.querySelector('input#produto-amount')
document.querySelector('#plus-btn').addEventListener('click', () => {
    input.value = parseInt(input.value) + 1;
    document.querySelector('#quantidade span').innerHTML = input.value;
    calcularTotal();
});
document.querySelector('#sub-btn').addEventListener('click', () => {
    parseInt(input.value) !== 1 && input.value--;
    document.querySelector('#quantidade span').innerHTML = input.value;
    calcularTotal();
});

const calcularTotal = () => {
    const unidade = parseFloat(unidadeSpan.innerHTML.trim().slice(2));
    const quantidade = parseInt(quantidadeSpan.innerHTML.trim());
    const frete = parseFloat(freteSpan.innerHTML.trim().slice(2));

    console.log(frete)
    const total = isNaN(frete) ? (unidade * quantidade) : (unidade * quantidade) + frete;

    totalSpan.innerHTML = ("R$" + total.toFixed(2)).replace('.', ',');
};