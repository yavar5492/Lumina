import { searchBox , inputSearch , search_box } from "../common.js";

inputSearch.addEventListener('focus', e => {
    search_box.classList.add("search_box_fucos")
})
inputSearch.addEventListener("blur" , e =>{
    search_box.classList.remove("search_box_fucos")
})
// تابع فیلتر کردن محصولات بر اساس متن جستجو
function filterMenuItems(searchTerm, allData) {
    if (!searchTerm || searchTerm.trim() === '') {
        return allData;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    return allData.filter(item => {
        // جستجو در عنوان و توضیحات
        return item.title.toLowerCase().includes(lowerCaseSearch) ||
               item.description.toLowerCase().includes(lowerCaseSearch);
    });
}

// تابع راه‌اندازی سرچ
export function setupSearch(allData, renderFunction) {
    // اضافه کردن event listener برای سرچ باکس
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        const filteredData = filterMenuItems(searchTerm, allData);
        renderFunction(filteredData);
    });
    
    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });
}