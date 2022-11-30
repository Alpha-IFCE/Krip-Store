const cards = document.querySelectorAll('.product-card');
const searchBar = document.querySelector('#search-bar');
const categories = document.querySelectorAll('input[name="category"]');
const minPrice = document.querySelector('#price-range-min');
const maxPrice = document.querySelector('#price-range-max');
const minRate = document.querySelector('#rate-range-min');
const maxRate = document.querySelector('#rate-range-max');
const promotion = document.querySelector('#need-promotion');

const query = {
    search: "",
    category: "all",
    minPrice: 0.0,
    maxPrice: 150,
    minRate: 0.0,
    maxRate: 5.0,
    needPromotion: false
}

categories.forEach(category => {
    if(window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1) !== 'produtos') {
        if(category.value === window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1, -1)) {
            category.checked = true;
            query.category = category.value;
        } else {
            category.disabled = true
        }
    } else {
        if(category.value === 'all') {
            category.checked = true
        }
    }

    category.addEventListener('change', () => {
        query.category = category.value;
        filterCards()
    })
});

const changeInput = (event) => {
    if(event.target.id !== "search-bar") {
        document.querySelector(`label[for=${event.target.id}] span`).innerHTML = event.target.value;
    }

    if(event.type === 'change') {
        changeQuery[event.target.id]();
        filterCards();
    }
}

promotion.addEventListener('change', () => {
    query.needPromotion = promotion.checked;
    console.log(query)
    filterCards()
})

const filterCards = () => {
    let filteredCards = []
    cards.forEach(card => {
        const produto = JSON.parse(card.dataset.produto);

        let promotionMatch = true;

        if(query.needPromotion === true) {
            if(produto.promotion !== ""){
                promotionMatch = true;
            } else {
                promotionMatch = false;
            }
        } else {
            promotionMatch = true;
        }
        
        const priceMatch = produto.promotion ?
        parseFloat(produto.promotion.slice(2)) >= query.minPrice && parseFloat(produto.promotion.slice(2)) <= query.maxPrice : 
        parseFloat(produto.price.slice(2)) >= query.minPrice && parseFloat(produto.price.slice(2)) <= query.maxPrice;

        let categoryMatch = true;

        if(query.category !== 'all') {
            if(produto.category === query.category){
                categoryMatch = true;
            } else {
                categoryMatch = false;
            }
        } else {
            categoryMatch = true;
        }

        const rateMatch = produto.rate >= query.minRate && produto.rate <= query.maxRate;

        const searchMatch = produto.name.toLowerCase().indexOf(query.search.toLowerCase()) > -1

        if(priceMatch && categoryMatch && rateMatch && promotionMatch && searchMatch) {
            filteredCards.push(card)
        }

    })
    displayFilteredCards(filteredCards);
}

const displayFilteredCards = (filteredCards) => {
    cards.forEach(card => {
        // console.log(card.parentNode)
        if(filteredCards.indexOf(card) > -1){
            card.parentNode.parentNode.classList.add('d-inline-block');
            card.parentNode.parentNode.classList.remove('d-none');
        } else {
            card.parentNode.parentNode.classList.add('d-none');
            card.parentNode.parentNode.classList.remove('d-inline-block');
        }
    })
}

const changeQuery = {
    "price-range-min": () => query.minPrice = parseFloat(minPrice.value),
    "price-range-max": () => query.maxPrice = parseFloat(maxPrice.value),
    "rate-range-min": () => query.minRate = parseFloat(minRate.value),
    "rate-range-max": () => query.maxRate = parseFloat(maxRate.value),
    "search-bar": () => query.search = searchBar.value,
    "category-camisa": () => query.category = 'camisa',
    "category-calca": () => query.category = 'calca',
    "category-moleton": () => query.category = 'moleton',
}