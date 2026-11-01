
function Product(id, title, price, category) 
{
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.isAvailable = true;
}

// Возвращает информацию о товаре
Product.prototype.getInfo = function () 
{
    return `ID: ${this.id}
Title: ${this.title}
Price: ${this.price}
Category: ${this.category}
Available: ${this.isAvailable}`;
};

// Изменяет стоимость товара
Product.prototype.changePrice = function (newPrice) 
{
    if (typeof newPrice !== "number" || !Number.isFinite(newPrice) || newPrice <= 0) 
    {
        console.log("Ошибка: цена должна быть положительным числом.");
        return;
    }

    this.price = newPrice;
};

// Применяет скидку
Product.prototype.applyDiscount = function (percent) 
{
    if (typeof percent !== "number" || !Number.isFinite(percent) || percent < 0 || percent > 100) 
    {
        console.log("Ошибка: скидка должна быть от 0 до 100%.");
        return;
    }

    this.price = this.price * (1 - percent / 100);
};

// Делает товар недоступным
Product.prototype.disable = function () 
{
    this.isAvailable = false;
};

// Делает товар доступным
Product.prototype.enable = function () 
{
    this.isAvailable = true;
};


// Создание товаров
const laptop = new Product(1, "Laptop", 1500, "Electronics");
const phone = new Product(2, "Phone", 800, "Electronics");

// Проверка методов
console.log(laptop.getInfo());

laptop.changePrice(2000);
laptop.applyDiscount(20);

console.log("Новая цена ноутбука:", laptop.price); // 1600

laptop.disable();
console.log("Доступность ноутбука:", laptop.isAvailable); // false

phone.enable();
console.log("Доступность телефона:", phone.isAvailable); // true

// Проверка некорректных значений
laptop.changePrice(-500);
laptop.applyDiscount(150);

// Проверка независимости объектов
console.log("Цена ноутбука:", laptop.price); // 1600
console.log("Цена телефона:", phone.price);   // 800
