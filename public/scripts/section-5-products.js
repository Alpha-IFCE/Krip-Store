const productsGrid = document.querySelector('#section-5-products')


/*
<div class="card">
    <img src="./images/empty.svg" alt="" class="card-img-top">
    <div class="card-body">
        <span id="card-rate">
            <i class="bi bi-star-fill card-rate-star"></i>
            <i class="bi bi-star-fill card-rate-star"></i>
            <i class="bi bi-star-fill card-rate-star"></i>
            <i class="bi bi-star-fill card-rate-star"></i>
            <i class="bi bi-star-half card-rate-star"></i>
        </span>
        <h5 class="card-title my-3">Pastel Long Sleeve</h5>
        <p class="card-text">
            <span class="text-decoration-line-through text-muted fs-6 me-3">R$220</span>
            <span class="font-lato fw-bold text-dark fs-6">RS140</span>
        </p>
    </div>
</div>
*/

const createProductCard = () => {
    const productCard = document.createElement("div");
    productCard.className = "card"

    const productCardImage = createProductCardImage();
    const productCardBody = createProductCardBody();

    productCard.appendChild(productCardImage);
    productCard.appendChild(productCardBody);

    return productCard;
}

const createProductCardImage = () => {
    const productCardImage = document.createElement('img');
    productCardImage.src = "./images/empty.svg";
    productCardImage.className = "card-img-top";

    return productCardImage;
}

const createProductCardBody = () => {
    const productCardBody = document.createElement('div');
    productCardBody.className = "card-body";

    const productCardRate = createProductCardRate();
    const productCardText = createProductCardText();

    productCardBody.appendChild(productCardRate);
    productCardBody.appendChild(productCardText);
    return productCardBody;
}

const createProductCardRate = () => {
    const productCardRate = document.createElement('span');
    for(i = 0; i < 5; i++){
        const star = document.createElement('i')
        if(i < 4) {
            star.className = "bi bi-star-full card-rate-star";
        } else {
            star.className = "bi bi-star-half card-rate-star";
        }
        productCardRate.appendChild(star);
    }

    return productCardRate;
}

const createProductCardTitle = () => {
    const productCardTitle = document.createElement('h5')
    productCardTitle.className = "card-title"
    productCardTitle.innerHTML = "Pastel Long Sleeve"
}

const createProductCardText = () => {
    const productCardText = document.createElement('p');
    productCardText.className = "card-text"
    const text1 = document.createElement('span');
    text1.className = "text-decoration-line-through text-muted fs-6 me-3";
    text1.innerHTML = "R$ 220";
    const text2 = document.createElement('span');
    text2.className = "font-lato fw-bold text-dark fs-6";
    text2.innerHTML = "R$ 140";

    productCardText.appendChild(text1);
    productCardText.appendChild(text2);

    return productCardText;
}
