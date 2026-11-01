
function DeliveryTariff(title, basePrice, pricePerKilogram, maxWeight) 
{
    this.title = title;
    this.basePrice = basePrice;
    this.pricePerKilogram = pricePerKilogram;
    this.maxWeight = maxWeight;
}

// Проверяет, возможна ли доставка с указанным весом
DeliveryTariff.prototype.canDeliver = function (weight) 
{
    return (
        typeof weight === "number" &&
        Number.isFinite(weight) &&
        weight > 0 &&
        weight <= this.maxWeight
    );
};

// Рассчитывает стоимость доставки
DeliveryTariff.prototype.calculate = function (weight) 
{
    if (!this.canDeliver(weight))
        return null;

    return this.basePrice + this.pricePerKilogram * weight;
};

// Возвращает информацию о доставке
DeliveryTariff.prototype.getInfo = function (weight) 
{
    if (!this.canDeliver(weight))
        return `Доставка "${this.title}" невозможна. Недопустимый вес или превышен лимит (${this.maxWeight} кг).`;

    const price = this.calculate(weight);

    return `Тариф: ${this.title}
Вес: ${weight} кг
Стоимость: ${price} BYN`;
};


// Создание тарифов
const standard = new DeliveryTariff("Standard", 5, 2, 20);
const express = new DeliveryTariff("Express", 10, 4, 15);
const premium = new DeliveryTariff("Premium", 15, 3, 50);

// Проверка тарифов
console.log(standard.getInfo(10));
console.log(express.getInfo(5));
console.log(premium.getInfo(30));

// Проверка допустимости веса
console.log(standard.canDeliver(10)); // true
console.log(standard.canDeliver(25)); // false

// Проверка расчёта стоимости
console.log(standard.calculate(10)); // 25
console.log(standard.calculate(25)); // null

// Проверка некорректного веса
console.log(standard.calculate(-5));       // null
console.log(standard.calculate("10"));     // null
console.log(standard.calculate(Infinity)); // null