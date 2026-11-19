
"use strict";

class MediaContent {
  // Счётчик для ID
  static #createdCount = 0;

  #id;
  #title;
  #duration;
  #filePath;
  #isAvailable;

  constructor(title, duration, filePath, isAvailable = true) {

    if (typeof title !== "string" || title.trim() === "")
      throw new Error("Название не должно быть пустым");

    if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0)
      throw new Error("Продолжительность должна быть положительным числом");

    if (typeof filePath !== "string" || filePath.trim() === "")
      throw new Error("Путь к аудиофайлу не должен быть пустым");

    MediaContent.#createdCount++;
    this.#id = MediaContent.#createdCount;
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

  // Длительность в формате мм:сс
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

class Track extends MediaContent {
  #artist;
  #album;
  #genre;

  constructor(title, duration, filePath, artist, album, genre, isAvailable = true) {
    // Сначала проверяем исполнителя, потом создаём объект
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

  getInfo() {
    return `Подкаст: ${this.#podcastName}, выпуск ${this.#episodeNumber} — ${this.title}`;
  }
}

// Плейлист
class Playlist {
  static #createdCount = 0;

  #id;
  #name;
  #items = [];

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
    const item = this.#items.find((item) => item.id === id);
    return item === undefined ? null : item;
  }

  hasItem(id) {
    return this.#items.some((item) => item.id === id);
  }

  clear() {
    this.#items = [];
  }

  getTotalDuration() {
    let total = 0;
    for (const item of this.#items) {
      total += item.duration;
    }
    return total;
  }

  // Возвращаем копию списка
  get items() {
    return [...this.#items];
  }

  get itemsCount() {
    return this.#items.length;
  }
}

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
    if (this.#currentIndex === -1) {
      return null;
    }
    return this.#queue[this.#currentIndex] || null;
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
    console.log(`Пауза: ${this.currentItem.getInfo()}`);
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
    this.#afterSwitch("Следующий");
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
    this.#afterSwitch("Предыдущий");
  }

  #afterSwitch(label) {
    console.log(`${label}: ${this.currentItem.getInfo()}`);
    // После переключения запускаем следующий элемент, если плеер был активен
    if (this.#status !== Player.STATUS.STOPPED)
      this.play();
  }
}

function section(title) {
  console.log(`\n===== ${title} =====`);
}

section("Создание объектов");

const tracks = [
  new Track("MARCHING", 205, "audio/marching.mp3", "Yeat", "2093", "Dark Rage"),
  new Track("Money Dance", 187, "audio/money-dance.mp3", "Thaiboy Digital", "Paradise", "Dance Hip-Hop"),
  new Track("ALL RED", 243, "audio/all-red.mp3", "Playboi Carti", "Whole Lotta Red", "Rage"),
  new Track("Espresso", 156, "audio/espresso.mp3", "Sabrina Carpenter", "Man's Best Friend", "Pop"),
  new Track("2sday", 221, "audio/2sday.mp3", "Che", "Empty Clip", "Rage"),
  new Track("With You", 198, "audio/with-you.mp3", "Linkin Park", "Hybrid Theory", "Punk Rock"),
];

const episodes = [
  new PodcastEpisode("Как работает браузер", 1845, "audio/web-12.mp3", "Иван Петров", "Web Inside", 12),
  new PodcastEpisode("Что такое event loop", 2130, "audio/web-13.mp3", "Иван Петров", "Web Inside", 13),
  new PodcastEpisode("ООП без страха", 1620, "audio/code-5.mp3", "Анна Смирнова", "Код и кофе", 5),
];

console.log(`Создано объектов MediaContent: ${MediaContent.getCreatedCount()}`);
console.log(`Названия трека и подкаста: «${tracks[0].title}», «${episodes[0].title}»`);
console.log(`Формат длительности: ${tracks[0].formattedDuration}, ${episodes[0].formattedDuration}`);

// Проверка наследования
section("Наследование");
console.log("tracks[0] instanceof Track:", tracks[0] instanceof Track);
console.log("tracks[0] instanceof MediaContent:", tracks[0] instanceof MediaContent);
console.log("episodes[0] instanceof Track:", episodes[0] instanceof Track);
console.log("episodes[0] instanceof MediaContent:", episodes[0] instanceof MediaContent);

// Геттеры и сеттеры
section("Приватные свойства и геттеры/сеттеры");
console.log("Продолжительность через геттер:", tracks[0].duration, "с");
try {
  tracks[0].duration = 999;
}
catch (e) {
  console.log("Изменить duration нельзя:", e.constructor.name);
}
console.log("Прямой доступ к #title невозможен, tracks[0]['#title'] =", tracks[0]["#title"]);

console.log("isAvailable до:", tracks[5].isAvailable);
tracks[5].isAvailable = false;
console.log("isAvailable после:", tracks[5].isAvailable);
tracks[5].isAvailable = true;
try {
  tracks[5].isAvailable = "нет";
}
catch (e) {
  console.log("Сеттер isAvailable отклонил значение:", e.message);
}

// Неверные значения
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

// Работа с плейлистами
section("Плейлисты: добавление и удаление");
const rockAndSynth = new Playlist("Рок и синтвейв");
const education = new Playlist("Учёба");

rockAndSynth.addItem(tracks[0]);
rockAndSynth.addItem(tracks[2]);
rockAndSynth.addItem(tracks[4]);
rockAndSynth.addItem(tracks[5]);
education.addItem(episodes[0]);
education.addItem(episodes[1]);
education.addItem(tracks[3]);

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

// Проверяем, что исходный массив не изменился
const copy = rockAndSynth.items;
copy.length = 0;
console.log("После очистки копии в плейлисте всё ещё элементов:", rockAndSynth.itemsCount);

// Очистка плейлиста
const temp = new Playlist("Временный");
temp.addItem(tracks[1]);
temp.addItem(tracks[3]);
console.log(`«${temp.name}» до clear(): ${temp.itemsCount}`);
temp.clear();
console.log(`«${temp.name}» после clear(): ${temp.itemsCount}`);

// Работа с плеером
section("Проигрыватель");
const player = new Player();
console.log("Статус:", player.status, "| громкость:", player.volume);
player.play();

player.loadPlaylist(education);
console.log("Текущий элемент:", player.currentItem.getInfo());
player.play();
player.pause();
player.play();
player.next();
player.next();
player.next();
player.previous();
player.pause();
player.previous();
player.previous();
console.log("Статус:", player.status);

section("Громкость");
player.volume = 80;
player.volume = 0;
for (const value of [101, -1, 50.5, "70"]) {
  try {
    player.volume = value;
  }
  catch (e) {
    console.log(`volume = ${JSON.stringify(value)} → ${e.constructor.name}: ${e.message}`);
  }
}
console.log("Итоговая громкость:", player.volume);

section("Недоступный элемент");
tracks[5].isAvailable = false;
player.loadPlaylist(rockAndSynth);
player.next();
player.next();
player.play();

// Вызов getInfo() для разных типов контента
section("Полиморфизм");
const allContent = tracks.concat(episodes);
for (const item of allContent) {
  console.log(item.getInfo());
}

section("Итого");
console.log(`Всего создано объектов MediaContent: ${MediaContent.getCreatedCount()}`);
