function Product(id, title, price, category) 
{
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.isAvailable = true;
}

Product.prototype.getInfo = function ()
{
    return `ID: ${this.id}
Title: ${this.title}
Price: ${this.price}
Category: ${this.category}
Available: ${this.isAvailable}`;
};

Product.prototype.changePrice = function (newPrice) 
{
    if (typeof newPrice !== "number" || !Number.isFinite(newPrice) || newPrice <= 0) 
    {
        console.log("Ошибка: цена должна быть положительным числом.");
        return;
    }

    this.price = newPrice;
};

Product.prototype.applyDiscount = function (percent) 
{
    if (typeof percent !== "number" || !Number.isFinite(percent) || percent < 0 || percent > 100) 
    {
        console.log("Ошибка: скидка должна быть от 0 до 100%.");
        return;
    }

    this.price = this.price * (1 - percent / 100);
};

Product.prototype.disable = function () 
{
    this.isAvailable = false;
};

Product.prototype.enable = function () 
{
    this.isAvailable = true;
};


const laptop = new Product(1, "Laptop", 1500, "Electronics");
const phone = new Product(2, "Phone", 800, "Electronics");

console.log(laptop.getInfo());

laptop.changePrice(2000);
laptop.applyDiscount(20);

console.log("Новая цена ноутбука:", laptop.price); // 1600

laptop.disable();
console.log("Доступность ноутбука:", laptop.isAvailable); // false

phone.enable();
console.log("Доступность телефона:", phone.isAvailable); // true

laptop.changePrice(-500);
laptop.applyDiscount(150);

console.log("Цена ноутбука:", laptop.price); // 1600
console.log("Цена телефона:", phone.price);   // 800