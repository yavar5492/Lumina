import {loader} from "../common.js";

document.addEventListener("DOMContentLoaded", () => {


    loader.forEach((item) => {
        item.classList.add("item_load");
    });

    const observer = new IntersectionObserver((enteries) => {
        enteries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add("item_load_show");
            }
        });
    }, {
        threshold: 0.15
    });
    loader.forEach((item) => observer.observe(item));
});