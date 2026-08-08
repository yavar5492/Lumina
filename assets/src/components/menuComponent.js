
import { menuBox, searchBox, foodBtn, beverageBtn, categoryBtns } from "../common.js";

class MenuComponent {
    constructor() {
        this.allData = [];
        this.currentCategory = 'food';
        this.currentSearchTerm = '';
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const res = await fetch("../assets/data/data.json");
            const data = await res.json();
            this.allData = data.dataItem || [];
            this.applyFilters();
        } catch (e) {
            console.error(e);
        }
    }

    setupEventListeners() {
        foodBtn?.addEventListener('click', () => {
            this.currentCategory = 'food';
            this.updateActiveButton('categoryFood');
            this.applyFilters();
        });

        beverageBtn?.addEventListener('click', () => {
            this.currentCategory = 'beverage';
            this.updateActiveButton('categoryBeverage');
            this.applyFilters();
        });

        searchBox?.addEventListener('input', (e) => {
            this.currentSearchTerm = e.target.value;
            this.applyFilters();
        });
    }

    filterByCategory(data) {
        return data.filter(item => item.category === this.currentCategory);
    }

    filterBySearch(data) {
        if (!this.currentSearchTerm?.trim()) return data;
        const term = this.currentSearchTerm.toLowerCase().trim();
        return data.filter(item =>
            item.title?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term)
        );
    }

    applyFilters() {
        let filtered = this.filterByCategory(this.allData);
        filtered = this.filterBySearch(filtered);
        this.renderItems(filtered);
    }

    openMessages(itemTitle) {
        const phone = '09033608463';
        const text = `Hello, I would like to order ${itemTitle}`;
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
            window.location.href = `sms:${phone}?body=${encodeURIComponent(text)}`;
        } else {
            window.open(
                `https://messages.google.com/web/conversations/new?to=${phone}&text=${encodeURIComponent(text)}`,
                '_blank'
            );
        }
    }

    renderItems(items) {
        if (!menuBox) return;
        menuBox.innerHTML = '';
        if (!items?.length) {
            menuBox.innerHTML = `<div class="response"><p>Nothing found.</p></div>`;
            return;
        }
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu_item';
            div.style.cursor = 'pointer';
            div.innerHTML = `
                <div class="image_menu_item">
                    <img 
                        loading="lazy"
                        src="${item.image || ''}" 
                        alt="${item.alt || ''}"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='../assets/image/oneror.png'"
                    >
                </div>
                <div class="texts_menu_item">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span>$${item.price}</span>
                </div>
            `;
            div.addEventListener('click', () => this.openMessages(item.title));
            menuBox.appendChild(div);
        });
    }

    updateActiveButton(activeId) {
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === activeId) btn.classList.add('active');
        });
    }
}

export default MenuComponent;