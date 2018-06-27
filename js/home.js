"use strict";
const load = () => {
    const moreBtn = document.getElementById('js-more-bio-btn');

    moreBtn.onclick = toggleBio;

    function toggleBio(e) {
        const bioWrapper = document.getElementById('js-bio-wrapper');
        if (bioWrapper.classList.contains('hidden')) {
            e.target.innerText = 'Hide';
            bioWrapper.style.height = '450px';
        } else {
            e.target.innerText = 'More...';
            bioWrapper.style.height = '0';
        }
        bioWrapper.classList.toggle('hidden');
        bioWrapper.classList.toggle('displayed');
        e.target.classList.toggle('displayed');
    }
};
document.addEventListener('DOMContentLoaded', load);