import { menuBox } from "../common.js";
fetch("../assets/data/data.json")
.then(response => response.json())
.then(
    data => {
        const { dataItem } = data;
        dataItem.forEach(element => {
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
        menuBox.insertAdjacentHTML("beforeend", itemHandler)
        });
    }
)