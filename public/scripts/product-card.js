document.querySelectorAll('.stars-box').forEach(starBox => {
    const rate = parseFloat(starBox.dataset.rate);
    const stars = starBox.children;

    if (rate === 0) {
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.replace('bi-star-fill', 'bi-star');
        }
    } else if (rate > 0 && rate < 1) {
        for (let i = 0; i < stars.length; i++) {
            if (i === 0) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-half');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate === 1) {
        for (let i = 0; i < stars.length; i++) {
            if (i === 0) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate > 1 && rate < 2) {
        for (let i = 0; i < stars.length; i++) {
            if (i === 0) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else if (i === 1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-half');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate === 2) {
        for (let i = 0; i < stars.length; i++) {
            if ([0, 1].indexOf(i) > -1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate > 2 && rate < 3) {
        for (let i = 0; i < stars.length; i++) {
            if ([0, 1].indexOf(i) > -1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else if (i === 2) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-half');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate === 3) {
        for (let i = 0; i < stars.length; i++) {
            if ([0, 1, 2].indexOf(i) > -1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate > 3 && rate < 4) {
        for (let i = 0; i < stars.length; i++) {
            if ([0, 1, 2].indexOf(i) > -1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else if (i === 3) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-half');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate === 4) {
        for (let i = 0; i < stars.length; i++) {
            if ([0, 1, 2, 3].indexOf(i) > -1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else if (rate > 4 && rate < 5) {
        for (let i = 0; i < stars.length; i++) {
            if ([0, 1, 2, 3].indexOf(i) > -1) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
            } else if (i === 4) {
                stars[i].classList.replace('bi-star-fill', 'bi-star-half');
            } else {
                stars[i].classList.replace('bi-star-fill', 'bi-star');
            }
        }
    } else {
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.replace('bi-star-fill', 'bi-star-fill');
        }
    }
});