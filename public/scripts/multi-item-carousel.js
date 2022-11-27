window.addEventListener('load', () => {
    makeCarousel({carouselElementId: "section-4-carousel", minPerSlide: 4})
    makeCarousel({carouselElementId: "section-7-carousel", minPerSlide: 2})
})

const makeCarousel = ({carouselElementId, minPerSlide}) => {
    // const carouselElement = document.querySelector(`#${carouselElementId}`)
    const carouselItems = document.querySelectorAll(`#${carouselElementId} .carousel-item`)

    createIndicators({carouselElementId, carouselItems})

    if(minPerSlide > 1) {
        adaptCarousel({carouselItems, minPerSlide})
    }

    new bootstrap.Carousel(document.querySelector(`#${carouselElementId}`), {
        keyboard: false,
        interval: 20000,
        touch: true
    })
}

const adaptCarousel = ({carouselItems, minPerSlide}) => {
    carouselItems.forEach(element => {
        let nextElement = element.nextElementSibling
        for (i = 1; i < minPerSlide; i++) {
            if (!nextElement) {
                // wrap carousel by using first child
                nextElement = carouselItems[0]
            }
            let cloneChild = nextElement.cloneNode(true)
            element.appendChild(cloneChild.children[0])
            nextElement = nextElement.nextElementSibling
        }
    })
}

const createIndicators = ({carouselElementId, carouselItems}) => {
    carouselItems.forEach((_, index) => {
        /* 
            <button type="button" data-bs-target="#section-4-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        */
        const indicator = createIndicator(index)
        indicator.dataset.bsTarget = "#" + carouselElementId
    
        document.querySelector(`#${carouselElementId} .carousel-indicators`).appendChild(indicator)
    })
}

const createIndicator = index => {
    const indicator = document.createElement('button');
    indicator.dataset.bsSlideTo = index.toString();
    if(index === 0) {
        indicator.className = "active";
        indicator.ariaCurrent = true;
    }
    indicator.ariaLabel = `Slide ${index + 1}`;

    return indicator;
}