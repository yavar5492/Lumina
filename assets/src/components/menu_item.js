import { menuBox } from "../common.js";
import { setupSearch } from "./searchBox.js";

let allData = [];
let currentCategory = 'food';

function filterByCategory(data) {
    if (currentCategory === 'all') return data;
    return data.filter(item => item.category === currentCategory);
}

function renderMenuItems(items) {
    if (!menuBox) return;
    
    menuBox.innerHTML = '';
    
    if (!items || items.length === 0) {
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
                    <img 
                        src="${element.image}" 
                        alt="${element.alt}"
                        onerror="this.onerror=null; this.src='../assets/icon/itemsfood.png'"
                    >
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

function applyFilters(searchTerm = '') {
    if (!menuBox) return;
    
    let filtered = filterByCategory(allData);
    
    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(item =>
            item.title?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term)
        );
    }
    
    renderMenuItems(filtered);
}

if (menuBox) {
    fetch("../assets/data/data.json")
    .then(response => response.json())
    .then(data => {
        allData = data.dataItem || [];
        applyFilters();
        setupSearch(applyFilters);
    })
    .catch(error => {
        console.error('Error retrieving data:', error);
        menuBox.innerHTML = '<p class="error">Error loading products</p>';
    });

    document.querySelectorAll('.category_box button').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category || this.textContent.trim().toLowerCase();
            currentCategory = category;
            
            const searchBox = document.getElementById('search_box');
            const searchTerm = searchBox ? searchBox.value : '';
            applyFilters(searchTerm);
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const activeBtn = document.querySelector('.category_box button.active');
        if (activeBtn) {
            currentCategory = activeBtn.dataset.category || activeBtn.textContent.trim().toLowerCase();
            applyFilters();
        }
    });
}