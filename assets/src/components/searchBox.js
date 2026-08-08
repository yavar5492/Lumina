import { searchBox, inputSearch, search_box } from "../common.js";

if (searchBox && inputSearch && search_box) {
    inputSearch.addEventListener('focus', e => {
        search_box.classList.add("search_box_fucos");
    });

    inputSearch.addEventListener("blur", e => {
        search_box.classList.remove("search_box_fucos");
    });
}

function setupSearch(applyFilters) {
    if (!searchBox) return;
    
    searchBox.addEventListener('input', function(e) {
        applyFilters(e.target.value);
    });
    
    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });
}

export { setupSearch };