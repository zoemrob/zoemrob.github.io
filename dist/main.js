"use strict";const load=()=>{const e=document.getElementById("js-more-bio-btn"),t=document.getElementById("js-bio"),s=document.getElementById("js-bio-projects"),d=document.getElementById("js-nav-buttons"),i=(document.getElementById("js-contact-sidebar"),document.getElementById("js-col-1-contact")),n=window.innerWidth;function o(e){if("Enter"===e.key||e instanceof MouseEvent){const d=document.activeElement,n=document.querySelector("section.displayed"),o=n.getAttribute("id");if("LI"===d.nodeName){switch(d.getAttribute("id")){case"js-about-me":if(o===t.getAttribute("id"))return void e.stopPropagation();n.classList.remove("displayed"),n.classList.add("hidden"),t.classList.remove("hidden"),t.classList.add("displayed");break;case"js-projects":if(o===s.getAttribute("id"))return void e.stopPropagation();n.classList.remove("displayed"),n.classList.add("hidden"),s.classList.remove("hidden"),s.classList.add("displayed");break;case"js-contact":if(o===i.getAttribute("id"))return void e.stopPropagation();n.classList.remove("displayed"),n.classList.add("hidden"),i.classList.remove("hidden"),i.classList.add("displayed")}}}}e.onclick=function(e){const t=document.getElementById("js-bio-wrapper"),s=document.getElementById("js-col-1");t.classList.contains("hidden")?(e.target.innerText="Hide",t.style.height="425px",t.style.overflowY="scroll",s.style.height="unset"):(e.target.innerText="More...",t.style.height="0",s.style.height="");t.classList.toggle("hidden"),t.classList.toggle("displayed"),e.target.classList.toggle("displayed")},d.onclick=o,document.onkeyup=o,n>=1100?(s.classList.add("hidden"),i.classList.add("hidden")):i.classList.add("offscreen")};document.addEventListener("DOMContentLoaded",load);