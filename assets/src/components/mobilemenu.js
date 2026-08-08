import {btnMenuMobile, MenuMobile, AllBG, btnMenuMobileClose, closelink} from "../common.js";

btnMenuMobile.addEventListener("click", e =>{
    MenuMobile.classList.add("menu_mobile_show");
    AllBG.classList.add("allbg_show");
    setTimeout(() => {
        AllBG.classList.add("allbg_show_tr");
    }, 100);
})
const closeElements = [btnMenuMobileClose, AllBG, closelink];

closeElements.forEach(element => {
    if (element) {
        element.addEventListener("click", function() {
            MenuMobile.classList.remove("menu_mobile_show");
            AllBG.classList.remove("allbg_show_tr");
            setTimeout(() => {
                AllBG.classList.remove("allbg_show");
            }, 100);
        });
    }
});