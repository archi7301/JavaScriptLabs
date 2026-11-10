const interfaceSettings = {
    _theme: "light",
    _fontSize: 16,
    _language: "ru",

    get theme() 
    {
        return this._theme;
    },

    set theme(value) 
    {
        if (value === "light" || value === "dark")
            this._theme = value;
        else
            console.log("Ошибка: тема должна быть light или dark.");
    },

    get fontSize() 
    {
        return this._fontSize;
    },

    set fontSize(value) 
    {
        if (typeof value === "number" && Number.isFinite(value) && value >= 12 && value <= 32)
            this._fontSize = value;
        else
            console.log("Ошибка: размер шрифта должен быть от 12 до 32.");
    },

    get language() 
    {
        return this._language;
    },

    set language(value) 
    {
        if (value === "ru" || value === "en" || value === "be")
            this._language = value; 
        else
            console.log("Ошибка: неподдерживаемый язык.");
    },

    get cssClasses() 
    {
        return [
            `theme-${this._theme}`,
            `font-size-${this._fontSize}`,
            `language-${this._language}`
        ];
    },

    get summary() {
        return `Theme: ${this._theme}
Font size: ${this._fontSize}px
Language: ${this._language}`;
    },

    reset() 
    {
        this.theme = "light";
        this.fontSize = 16;
        this.language = "ru";
    }
};


console.log(interfaceSettings.theme);
console.log(interfaceSettings.fontSize);
console.log(interfaceSettings.language);

console.log(interfaceSettings.cssClasses);
console.log(interfaceSettings.summary);

interfaceSettings.theme = "dark";
interfaceSettings.fontSize = 20;
interfaceSettings.language = "en";

console.log(interfaceSettings.summary);

interfaceSettings.theme = "blue";
interfaceSettings.fontSize = 50;
interfaceSettings.language = "de";

console.log(interfaceSettings.summary);

interfaceSettings.reset();

console.log(interfaceSettings.summary);