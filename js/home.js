"use strict";
const load = () => {
    const moreBtn = document.getElementById('js-more-bio-btn');
    const bio = document.getElementById('js-bio');
    const project = document.getElementById('js-bio-projects');
    const navButtons = document.getElementById('js-nav-buttons');
    //const aboutMe = document.getElementById('js-about-me');
    const contactSideBar = document.getElementById('js-contact-sidebar');
    const contactMain = document.getElementById('js-col-1-contact');
    const win = window.innerWidth;

    moreBtn.onclick = toggleBio;
    navButtons.onclick = navigate;
    document.onkeyup = navigate;

    if (win >= 1100) {
        project.classList.add('hidden');
        contactMain.classList.add('hidden');
    } else {
        contactMain.classList.remove('hidden');
        contactMain.classList.add('offscreen');
    }

    function toggleBio(e) {
        const bioWrapper = document.getElementById('js-bio-wrapper');
        const bioCol = document.getElementById('js-col-1');
        if (bioWrapper.classList.contains('hidden')) {
            e.target.innerText = 'Hide';
            bioWrapper.style.height = '425px';
            bioWrapper.style.overflowY = 'scroll';
            bioCol.style.height = 'unset';
        } else {
            e.target.innerText = 'More...';
            bioWrapper.style.height = '0';
            bioCol.style.height = '';
        }
        bioWrapper.classList.toggle('hidden');
        bioWrapper.classList.toggle('displayed');
        e.target.classList.toggle('displayed');
    }

    function navigate(e) {
        if (e.key === "Enter" || e instanceof MouseEvent) {

            const focused = document.activeElement;
            const currentDisplayed = document.querySelector('section.displayed');
            const currentId = currentDisplayed.getAttribute('id');

            if (focused.nodeName === 'LI') {
                const id = focused.getAttribute('id');
                switch (id) {
                    case 'js-about-me':
                        if (currentId === bio.getAttribute('id')) {
                            e.stopPropagation();
                            return;
                        }
                        currentDisplayed.classList.remove('displayed');
                        currentDisplayed.classList.add('hidden');
                        bio.classList.remove('hidden');
                        bio.classList.add('displayed');
                        break;
                    case 'js-projects':
                        if (currentId === project.getAttribute('id')) {
                            e.stopPropagation();
                            return;
                        }
                        currentDisplayed.classList.remove('displayed');
                        currentDisplayed.classList.add('hidden');
                        project.classList.remove('hidden');
                        project.classList.add('displayed');
                        break;
                    case 'js-contact':
                        if (currentId === contactMain.getAttribute('id')) {
                            e.stopPropagation();
                            return;
                        }
                        currentDisplayed.classList.remove('displayed');
                        currentDisplayed.classList.add('hidden');
                        contactMain.classList.remove('hidden');
                        contactMain.classList.add('displayed');
                        break;
                }
            }
        }
    }
    //
    //
    // aboutMeNav.onclick = (e) => {
    //     if (e.target.nodeName === 'LI') {
    //         // TODO implement eventListener on whole nav-bar, check if LI, if it is, get id
    //     }
    //
    //     const bio = document.getElementById('js-bio'),
    //         pic = document.getElementById('js-bio-pic'),
    //         skills = document.getElementById('js-bio-skills'),
    //         bioElems = [bio, pic, skills];
    //
    //
    // };



};
document.addEventListener('DOMContentLoaded', load);