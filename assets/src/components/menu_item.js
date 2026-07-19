import { menuBox } from "../common.js";
import { setupSearch } from "./searchBox.js";

// تابع برای نمایش محصولات
function renderMenuItems(items) {
    // پاک کردن محتوای قبلی
    menuBox.innerHTML = '';
    
    if (items.length === 0) {
        menuBox.innerHTML = `
            <div class="response">
                <p>Nothing was found.</p>
            </div>`;
        return;
    }
    
    items.forEach(element => {
        const itemHandler = `
            <div class="menu_item">
                <div class="image_menu_item">
                    <img src="${element.image}" alt="${element.alt}">
                </div>
                <div class="texts_menu_item">
                    <h3>${element.title}</h3>
                    <p>${element.description}</p>
                    <span>$${element.price}</span>
                </div>
            </div>
        `;
        menuBox.insertAdjacentHTML("beforeend", itemHandler);
    });
}

// دریافت داده‌ها
fetch("../assets/data/data.json")
.then(response => response.json())
.then(data => {
    const { dataItem } = data;
    const allData = dataItem;
    
    // نمایش اولیه همه محصولات
    renderMenuItems(allData);
    
    // راه‌اندازی سرچ
    setupSearch(allData, renderMenuItems);
})
.catch(error => {
    console.error('Error retrieving data:', error);
    menuBox.innerHTML = '<p class="error">Error loading products</p>';
});