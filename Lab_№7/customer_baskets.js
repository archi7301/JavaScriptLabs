function ShoppingCart(customerName) 
{
    this.customerName = customerName;
    this.currency = "BYN";
    this.items = [];
    this.discount = 0;
}

ShoppingCart.prototype.addItem = function (product, quantity) 
{
    if (!Number.isInteger(quantity) || quantity <= 0) 
    {
        console.log("Ошибка: количество должно быть положительным целым числом.");
        return;
    }

    if (product.isAvailable === false) 
    {
        console.log("Ошибка: товар недоступен.");
        return;
    }

    const existingItem = this.items.find(
        item => item.product.id === product.id
    );

    if (existingItem)
        existingItem.quantity += quantity

    else
    {
        this.items.push({
            product : product,
            quantity : quantity
        })
    }

};

ShoppingCart.prototype.removeItem = function (productId) 
{
    this.items = this.items.filter(
        item => item.product.id !== productId
    );
};

ShoppingCart.prototype.changeQuantity = function (productId, quantity) 
{
    if (!Number.isInteger(quantity) || quantity <= 0) 
    {
        console.log("Ошибка: количество должно быть положительным целым числом.");
        return;
    }

    const existingItem = this.items.find(
        item => item.product.id === productId
    );

    if (existingItem)
        existingItem.quantity = quantity;
};

ShoppingCart.prototype.setDiscount = function (percent) 
{
    if (
        typeof percent !== "number" ||
        !Number.isFinite(percent) ||
        percent < 0 || percent > 100
    ) 
    {
        console.log("Ошибка: скидка должна находиться в диапазоне от 0 до 100.");
        return;
    }

    this.discount = percent;
};

ShoppingCart.prototype.getTotalBeforeDiscount = function () 
{
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

ShoppingCart.prototype.getTotal = function () 
{
    const total = this.getTotalBeforeDiscount();
    return total * (1 - this.discount / 100);
};

ShoppingCart.prototype.getSummary = function () 
{
    return this.items.map(item => {
        return `${item.product.title} x ${item.quantity} = ${item.product.price * item.quantity} ${this.currency}`;
    });
};

const cart1 = new ShoppingCart("Artem");
const cart2 = new ShoppingCart("Alex");

cart1.addItem(laptop, 1);
cart1.addItem(mouse, 2);
cart1.addItem(mouse, 3);

cart2.addItem(keyboard, 1);
cart2.addItem(mouse, 1);

cart1.changeQuantity(1, 2);

cart1.setDiscount(10);
cart2.setDiscount(5);

console.log("Корзина 1:", cart1.getSummary());
console.log("Стоимость без скидки:", cart1.getTotalBeforeDiscount());
console.log("Стоимость со скидкой:", cart1.getTotal());

console.log("Корзина 2:", cart2.getSummary());
console.log("Стоимость без скидки:", cart2.getTotalBeforeDiscount());
console.log("Стоимость со скидкой:", cart2.getTotal());

cart1.removeItem(2);
console.log("Корзина 1 после удаления:", cart1.getSummary());

console.log("Товары в корзине 1:", cart1.items.length);
console.log("Товары в корзине 2:", cart2.items.length);