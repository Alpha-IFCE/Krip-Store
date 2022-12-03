const btnFrete = document.querySelector('#calcular-frete-btn');
const cepInput = document.querySelector('#cep-input')

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

btnFrete.addEventListener('click', async () => {
    const cep = cepInput.value;

    if (cep === "") {
        return;
    }

    if (cep.length !== 8) {
        return;
    }

    btnFrete.disabled = true;
    const { frete, response } = await getFrete(cep);

    if (response.status === 200) {
        // document.querySelector('.valor-frete').classList.remove('d-none')
        // document.querySelector('.valor-frete span span').innerHTML = frete.valor;
        alert("O valor do frete é R$" + frete.valor)
    } else {
        alert("Ocorreu algum erro ao calcular o frete")
    }

    btnFrete.disabled = false;
})