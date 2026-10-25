const categories = new Set();

function addCategory(category) 
{
    categories.add(category);
}

function removeCategory(category) 
{
    categories.delete(category);
}

function hasCategory(category) 
{
    return categories.has(category);
}

function getCategoriesCount() 
{
    return categories.size;
}

function getCategories() 
{
    return Array.from(categories).sort();
}


addCategory("Концерты");
addCategory("Спорт");
addCategory("Выставки");
addCategory("Концерты");

console.log(getCategoriesCount()); 
console.log(hasCategory("Спорт")); 

removeCategory("Спорт");

console.log(hasCategory("Спорт")); 
console.log(getCategories()); 