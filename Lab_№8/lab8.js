"use strict";

// 1. Базовый класс медиаконтента
class MediaContent {
  // Приватный статический счётчик созданных объектов
  static #createdCount = 0;

  // Приватные свойства экземпляра
  #id;
  #title;
  #duration;
  #filePath;
  #isAvailable;

  constructor(title, duration, filePath, isAvailable = true) {
    // Проверка входных данных — в конструкторе
    if (typeof title !== "string" || title.trim() === "")
      throw new Error("Название не должно быть пустым");

    if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0)
      throw new Error("Продолжительность должна быть положительным числом");

    if (typeof filePath !== "string" || filePath.trim() === "")
      throw new Error("Путь к аудиофайлу не должен быть пустым");

    MediaContent.#createdCount++;
    this.#id = MediaContent.#createdCount; // уникальный идентификатор
    this.#title = title.trim();
    this.#duration = Math.round(duration);
    this.#filePath = filePath;
    this.#isAvailable = Boolean(isAvailable);
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get duration() {
    return this.#duration;
  }

  get filePath() {
    return this.#filePath;
  }

  // Продолжительность в формате 03:25
  get formattedDuration() {
    const minutes = Math.floor(this.#duration / 60);
    const seconds = this.#duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  get isAvailable() {
    return this.#isAvailable;
  }

  set isAvailable(value) {
    if (typeof value !== "boolean")
      throw new Error("isAvailable должен быть логическим значением");
    this.#isAvailable = value;
  }

  getInfo() {
    return `${this.#title}, ${this.formattedDuration}`;
  }

  static getCreatedCount() {
    return MediaContent.#createdCount;
  }
}

// 2. Классы композиций и подкастов
class Track extends MediaContent {
  #artist;
  #album;
  #genre;

  constructor(title, duration, filePath, artist, album, genre, isAvailable = true) {
    // Валидация собственных полей — до super(), чтобы неудачный объект не попал в счётчик
    if (typeof artist !== "string" || artist.trim() === "")
      throw new Error("Исполнитель не должен быть пустым");

    super(title, duration, filePath, isAvailable);
    this.#artist = artist.trim();
    this.#album = album;
    this.#genre = genre;
  }

  get artist() {
    return this.#artist;
  }

  get album() {
    return this.#album;
  }

  get genre() {
    return this.#genre;
  }

  // Переопределение: Композиция: Night Drive — Neon Lights, 03:25
  getInfo() {
    return `Композиция: ${this.title} — ${this.#artist}, ${this.formattedDuration}`;
  }
}

class PodcastEpisode extends MediaContent {
  #author;
  #podcastName;
  #episodeNumber;

  constructor(title, duration, filePath, author, podcastName, episodeNumber, isAvailable = true) {
    if (typeof author !== "string" || author.trim() === "")
      throw new Error("Автор не должен быть пустым");

    if (!Number.isInteger(episodeNumber) || episodeNumber <= 0)
      throw new Error("Номер выпуска должен быть положительным целым числом");

    super(title, duration, filePath, isAvailable);
    this.#author = author.trim();
    this.#podcastName = podcastName;
    this.#episodeNumber = episodeNumber;
  }

  get author() {
    return this.#author;
  }

  get podcastName() {
    return this.#podcastName;
  }

  get episodeNumber() {
    return this.#episodeNumber;
  }

  // Переопределение: Подкаст: Web Inside, выпуск 12 — Как работает браузер
  getInfo() {
    return `Подкаст: ${this.#podcastName}, выпуск ${this.#episodeNumber} — ${this.title}`;
  }
}

// 3. Класс плейлиста
class Playlist {
  static #createdCount = 0;

  #id;
  #name;
  #items = []; // приватный массив медиаматериалов

  constructor(name) {
    if (typeof name !== "string" || name.trim() === "")
      throw new Error("Название плейлиста не должно быть пустым");

    Playlist.#createdCount++;
    this.#id = Playlist.#createdCount;
    this.#name = name.trim();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  addItem(item) {
    if (!(item instanceof MediaContent))
      throw new TypeError("В плейлист можно добавлять только экземпляры MediaContent");

    if (this.#items.includes(item))
      throw new Error(`Элемент «${item.title}» уже есть в плейлисте`);

    this.#items.push(item);
    return this;
  }

  removeItem(id) {
    const index = this.#items.findIndex((item) => item.id === id);
    if (index === -1)
      return false;

    this.#items.splice(index, 1);
    return true;
  }

  findItem(id) {
    return this.#items.find((item) => item.id === id) ?? null;
  }

  hasItem(id) {
    return this.#items.some((item) => item.id === id);
  }

  clear() {
    this.#items = [];
  }

  getTotalDuration() {
    return this.#items.reduce((sum, item) => sum + item.duration, 0);
  }

  // Копия массива — внешний код не может изменить внутреннее состояние
  get items() {
    return [...this.#items];
  }

  get itemsCount() {
    return this.#items.length;
  }
}

// 4. Класс проигрывателя
class Player {
  static STATUS = Object.freeze({
    STOPPED: "остановлен",
    PLAYING: "воспроизводится",
    PAUSED: "на паузе",
  });

  #queue = [];
  #currentIndex = -1;
  #volume = 50;
  #status = Player.STATUS.STOPPED;

  get currentItem() {
    return this.#queue[this.#currentIndex] ?? null;
  }

  get status() {
    return this.#status;
  }

  get volume() {
    return this.#volume;
  }

  set volume(value) {
    if (!Number.isInteger(value) || value < 0 || value > 100)
      throw new RangeError("Громкость должна быть целым числом от 0 до 100");

    this.#volume = value;
    console.log(`Громкость: ${value}`);
  }

  loadPlaylist(playlist) {
    if (!(playlist instanceof Playlist))
      throw new TypeError("Нужно передать экземпляр Playlist");

    if (playlist.itemsCount === 0)
      throw new Error("Плейлист пуст");

    this.#queue = playlist.items; // копия
    this.#currentIndex = 0;
    this.#status = Player.STATUS.STOPPED;
    console.log(`Загружен плейлист «${playlist.name}» (треков: ${this.#queue.length})`);
  }

  play() {
    const item = this.currentItem;
    if (!item) {
      console.log("Нечего воспроизводить: плейлист не загружен");
      return;
    }

    if (!item.isAvailable) {
      console.log(`Элемент недоступен: ${item.getInfo()}`);
      return;
    }

    this.#status = Player.STATUS.PLAYING;
    console.log(`Воспроизведение: ${item.getInfo()}`);
  }

  pause() {
    if (this.#status !== Player.STATUS.PLAYING) {
      console.log("Пауза невозможна: ничего не воспроизводится");
      return;
    }

    this.#status = Player.STATUS.PAUSED;
    console.log(`⏸ Пауза: ${this.currentItem.getInfo()}`);
  }

  next() {
    if (this.#queue.length === 0) {
      console.log("Список воспроизведения пуст");
      return;
    }

    if (this.#currentIndex >= this.#queue.length - 1) {
      console.log("Это последний элемент списка");
      return;
    }

    this.#currentIndex++;
    this.#afterSwitch("⏭ Следующий");
  }

  previous() {
    if (this.#queue.length === 0) {
      console.log("Список воспроизведения пуст");
      return;
    }

    if (this.#currentIndex <= 0) {
      console.log("Это первый элемент списка");
      return;
    }

    this.#currentIndex--;
    this.#afterSwitch("⏮ Предыдущий");
  }

  // Приватный метод: общая часть переключения элементов
  #afterSwitch(label) {
    console.log(`${label}: ${this.currentItem.getInfo()}`);
    // если плеер играл или стоял на паузе — продолжаем воспроизведение нового элемента
    if (this.#status !== Player.STATUS.STOPPED)
      this.play();
  }
}

// Демонстрация
function section(title) {
  console.log(`\n===== ${title} =====`);
}

// Создание объектов через new
section("Создание объектов");

const tracks = [
  new Track("Night Drive", 205, "audio/night-drive.mp3", "Neon Lights", "City Dreams", "Synthwave"),
  new Track("Ocean Eyes", 187, "audio/ocean-eyes.mp3", "Blue Horizon", "Deep Water", "Pop"),
  new Track("Iron Road", 243, "audio/iron-road.mp3", "Steel Wolves", "Highway", "Rock"),
  new Track("Quiet Morning", 156, "audio/quiet-morning.mp3", "Lena Gray", "Sunrise", "Acoustic"),
  new Track("Digital Rain", 221, "audio/digital-rain.mp3", "Neon Lights", "City Dreams", "Synthwave"),
  new Track("Last Train", 198, "audio/last-train.mp3", "Steel Wolves", "Highway", "Rock"),
];

const episodes = [
  new PodcastEpisode("Как работает браузер", 1845, "audio/web-12.mp3", "Иван Петров", "Web Inside", 12),
  new PodcastEpisode("Что такое event loop", 2130, "audio/web-13.mp3", "Иван Петров", "Web Inside", 13),
  new PodcastEpisode("ООП без страха", 1620, "audio/code-5.mp3", "Анна Смирнова", "Код и кофе", 5),
];

console.log(`Создано объектов MediaContent: ${MediaContent.getCreatedCount()}`);
console.log(`Названия трека и подкаста: «${tracks[0].title}», «${episodes[0].title}»`);
console.log(`Формат длительности: ${tracks[0].formattedDuration}, ${episodes[0].formattedDuration}`);

// Наследование, super() и instanceof
section("Наследование");
console.log("tracks[0] instanceof Track:", tracks[0] instanceof Track);
console.log("tracks[0] instanceof MediaContent:", tracks[0] instanceof MediaContent);
console.log("episodes[0] instanceof Track:", episodes[0] instanceof Track);
console.log("episodes[0] instanceof MediaContent:", episodes[0] instanceof MediaContent);

// Приватные свойства
section("Приватные свойства и геттеры/сеттеры");
console.log("Продолжительность через геттер:", tracks[0].duration, "с");
try {
  tracks[0].duration = 999; // у геттера нет сеттера → TypeError в strict mode
}
catch (e) {
  console.log("Изменить duration нельзя:", e.constructor.name);
}
console.log("Прямой доступ к #title невозможен, tracks[0]['#title'] =", tracks[0]["#title"]);

console.log("isAvailable до:", tracks[5].isAvailable);
tracks[5].isAvailable = false; // сеттер
console.log("isAvailable после:", tracks[5].isAvailable);
tracks[5].isAvailable = true;
try {
  tracks[5].isAvailable = "нет";
}
catch (e) {
  console.log("Сеттер isAvailable отклонил значение:", e.message);
}

// Проверка входных данных в конструкторе
section("Валидация данных");
try {
  new Track("", 100, "a.mp3", "Артист", "Альбом", "Жанр");
}
catch (e) {
  console.log("Ошибка:", e.message);
}

try {
  new Track("Test", -5, "a.mp3", "Артист", "Альбом", "Жанр");
}
catch (e) {
  console.log("Ошибка:", e.message);
}

try {
  new PodcastEpisode("Test", 100, "a.mp3", "Автор", "Подкаст", 0);
}
catch (e) {
  console.log("Ошибка:", e.message);
}
console.log(`Создано объектов MediaContent (неудачные не считаются): ${MediaContent.getCreatedCount()}`);

// Плейлисты
section("Плейлисты: добавление и удаление");
const rockAndSynth = new Playlist("Рок и синтвейв");
const education = new Playlist("Учёба");

rockAndSynth.addItem(tracks[0]).addItem(tracks[2]).addItem(tracks[4]).addItem(tracks[5]);
education.addItem(episodes[0]).addItem(episodes[1]).addItem(tracks[3]);

console.log(`«${rockAndSynth.name}»: элементов ${rockAndSynth.itemsCount}, ` +
  `общая длительность ${rockAndSynth.getTotalDuration()} с`);
console.log(`«${education.name}»: элементов ${education.itemsCount}, ` +
  `общая длительность ${education.getTotalDuration()} с`);

try {
  rockAndSynth.addItem(tracks[0]);
}
catch (e) {
  console.log("Повторное добавление:", e.message);
}

try {
  rockAndSynth.addItem({ title: "Не MediaContent" });
}
catch (e) {
  console.log("Добавление чужого объекта:", e.message);
}

console.log("hasItem(tracks[2].id):", rockAndSynth.hasItem(tracks[2].id));
console.log("findItem(tracks[2].id):", rockAndSynth.findItem(tracks[2].id).getInfo());
console.log("removeItem(tracks[2].id):", rockAndSynth.removeItem(tracks[2].id));
console.log("hasItem(tracks[2].id) после удаления:", rockAndSynth.hasItem(tracks[2].id));
console.log("removeItem(несуществующий id):", rockAndSynth.removeItem(9999));
console.log("Элементов после удаления:", rockAndSynth.itemsCount);

// items возвращает копию
const copy = rockAndSynth.items;
copy.length = 0;
console.log("После очистки копии в плейлисте всё ещё элементов:", rockAndSynth.itemsCount);

// clear()
const temp = new Playlist("Временный");
temp.addItem(tracks[1]).addItem(tracks[3]);
console.log(`«${temp.name}» до clear(): ${temp.itemsCount}`);
temp.clear();
console.log(`«${temp.name}» после clear(): ${temp.itemsCount}`);

// Проигрыватель
section("Проигрыватель");
const player = new Player();
console.log("Статус:", player.status, "| громкость:", player.volume);
player.play(); // плейлист не загружен

player.loadPlaylist(education);
console.log("Текущий элемент:", player.currentItem.getInfo());
player.play();
player.pause();
player.play();
player.next();
player.next();
player.next(); // последний элемент
player.previous();
player.pause();
player.previous(); // на паузе — переключаемся и продолжаем воспроизведение
player.previous(); // первый элемент
console.log("Статус:", player.status);

section("Громкость");
player.volume = 80;
player.volume = 0;
for (const bad of [101, -1, 50.5, "70"]) {
  try {
    player.volume = bad;
  }
  catch (e) {
    console.log(`volume = ${JSON.stringify(bad)} → ${e.constructor.name}: ${e.message}`);
  }
}
console.log("Итоговая громкость:", player.volume);

section("Недоступный элемент");
tracks[5].isAvailable = false;
player.loadPlaylist(rockAndSynth);
player.next();
player.next(); // дошли до недоступного Last Train
player.play();

// Полиморфизм
section("Полиморфизм");
const allContent = [...tracks, ...episodes];
for (const item of allContent) {
  console.log(item.getInfo()); // без проверки конкретного класса
}

section("Итого");
console.log(`Всего создано объектов MediaContent: ${MediaContent.getCreatedCount()}`);