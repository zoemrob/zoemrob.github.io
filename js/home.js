"use strict";
const load = () => {
    const moreBtn = document.getElementById('js-more-bio-btn');
    const bio = document.getElementById('js-bio');
    const project = document.getElementById('js-bio-projects');
    const navButtons = document.getElementById('js-nav-buttons');
    //const aboutMe = document.getElementById('js-about-me');
    const contactSideBar = document.getElementById('js-contact-sidebar');
    const contactMain = document.getElementById('js-col-1-contact');
    const contactForm = document.getElementById('js-contact-form');
    const win = window.innerWidth;

    moreBtn.onclick = toggleBio;
    navButtons.onclick = navigate;
    document.onkeyup = navigate;

    visibleContent();

    //
    // if (win >= 1100) {
    //     project.classList.add('hidden');
    //     contactMain.classList.add('hidden');
    // } else {
    //     contactMain.classList.remove('hidden');
    //     contactMain.classList.add('offscreen');
    // }

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
    contactForm.onsubmit = contact;

    function contact(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = {};

        for(let field of formData.entries()) {
            let key = field[0],
                value = field[1];
            if (key === 'client-phone') {
                value = value.replace(/\D/g, '');
                if (value.length !== 10 && value.length !== 11) {
                    window.alert('Please enter a valid 10-11 digit phone number\.');
                    return false;
                }
            }
            data[key] = value;
        }

        console.log(data);
    }

    function visibleContent() {
        if (window.innerWidth >= 1100) {

            if (!project.classList.contains('displayed') && !contactMain.classList.contains('displayed')) {
                bio.classList.add('displayed');
            }

            if (!project.classList.contains('displayed')) {
                project.classList.add('hidden');
            }

            if (!contactMain.classList.contains('displayed')) {
                contactMain.classList.add('hidden');
            }

            if (contactMain.classList.contains('offscreen')) {
                contactMain.classList.remove('offscreen');
                contactMain.classList.add('hidden');
            }

        } else {

            contactMain.classList.remove('displayed');
            project.classList.remove('displayed');
            bio.classList.remove('displayed');

            if (bio.classList.contains('hidden')) {
                bio.classList.remove('hidden');
            }

            if (project.classList.contains('hidden')) {
                project.classList.remove('hidden');
            }

            contactMain.classList.remove('hidden');
            contactMain.classList.add('offscreen');
        }
    }

    (function() {

        window.addEventListener("resize", resizeThrottler, false);

        let resizeTimeout;
        function resizeThrottler() {
            // ignore resize events as long as an actualResizeHandler execution is in the queue
            if ( !resizeTimeout ) {
                resizeTimeout = setTimeout(function() {
                    resizeTimeout = null;
                    visibleContent();

                    // The visibleContent will execute at a rate of 15fps
                }, 66);
            }
        }
    }());
};
document.addEventListener('DOMContentLoaded', load);