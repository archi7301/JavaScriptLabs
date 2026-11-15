"use strict";

const tracks = [
  new Track("Night Drive", 205, "audio/night-drive.mp3", "Neon Lights", "City Dreams", "Synthwave"),
  new Track("Ocean Eyes", 187, "audio/ocean-eyes.mp3", "Blue Horizon", "Deep Water", "Pop"),
  new Track("Iron Road", 243, "audio/iron-road.mp3", "Steel Wolves", "Highway", "Rock"),
  new Track("Quiet Morning", 156, "audio/quiet-morning.mp3", "Lena Gray", "Sunrise", "Acoustic"),
  new Track("Digital Rain", 221, "audio/digital-rain.mp3", "Neon Lights", "City Dreams", "Synthwave"),
  // Пустой альбом нужен для демонстрации соответствующего состояния.
  new Track("Last Train", 198, "audio/last-train.mp3", "Steel Wolves", "", "Rock"),
];
const playlist = new Playlist("Мой плейлист");
playlist.addItem(tracks[0]).addItem(tracks[2]).addItem(tracks[4]);

const catalogElement = document.querySelector("#catalog");
const catalogCount = document.querySelector("#catalog-count");
const playlistElement = document.querySelector("#playlist");
const playlistSummary = document.querySelector("#playlist-summary");

// Вспомогательная функция: текст всегда передаётся через textContent.
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createButton(text, action, trackId) {
  const button = createElement("button", "", text);
  button.type = "button";
  button.dataset.action = action;
  button.dataset.trackId = String(trackId);
  // обработчики событий пока не обязательны.
  button.disabled = true;
  return button;
}

function createTrackCard(track) {
  const card = createElement("article", "track-card");
  card.dataset.trackId = String(track.id);

  // В исходном Track нет поля обложки, поэтому используется заглушка.
  // Если передан объект с coverUrl, отобразится картинка с обработкой ошибки.
  const cover = createElement("div", "cover");
  const placeholder = createElement("span", "cover-placeholder", "♪");
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", "Обложка отсутствует");
  cover.append(placeholder);
  if (typeof track.coverUrl === "string" && track.coverUrl.trim()) {
    const image = document.createElement("img");
    image.alt = `Обложка композиции «${track.title}»`;
    image.addEventListener("error", () => image.remove(), { once: true });
    image.src = track.coverUrl;
    cover.append(image);
  }

  const title = createElement("h3", "track-title", track.title);
  const artist = createElement("p", "artist", track.artist);
  const album = typeof track.album === "string" && track.album.trim()
    ? track.album : "Альбом не указан";
  const albumElement = createElement("p", "metadata", album);
  const details = createElement("div", "track-details");
  details.append(
    createElement("span", "genre", track.genre || "Жанр не указан"),
    createElement("span", "duration", track.formattedDuration),
  );
  const actions = createElement("div", "actions");
  actions.append(
    createButton("Воспроизвести", "play", track.id),
    createButton("Добавить в плейлист", "add", track.id),
  );
  card.append(cover, title, artist, albumElement, details, actions);
  return card;
}

function renderCatalog(tracks) {
  // Удаляем старые узлы: повторный вызов не дублирует карточки.
  catalogElement.replaceChildren();
  catalogCount.textContent = `Композиций: ${tracks.length}`;
  const fragment = document.createDocumentFragment();
  if (tracks.length === 0) {
    fragment.append(createElement("p", "empty-state", "В каталоге пока нет композиций"));
  } 
  else {
    for (const track of tracks) fragment.append(createTrackCard(track));
  }
  catalogElement.append(fragment);
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function renderPlaylist(playlist) {
  playlistElement.replaceChildren();
  playlistElement.dataset.playlistId = String(playlist.id);
  playlistSummary.textContent = `Композиций: ${playlist.itemsCount} · Общая продолжительность: ${formatDuration(playlist.getTotalDuration())}`;
  const fragment = document.createDocumentFragment();
  // items возвращает копию массива. Здесь мы только читаем данные.
  const items = playlist.items;
  if (items.length === 0) {
    fragment.append(createElement("li", "empty-state", "В плейлисте пока нет композиций"));
  } 
  else {
    items.forEach((item, index) => {
      const row = createElement("li", "playlist-item");
      row.dataset.trackId = String(item.id);
      const description = createElement("div", "playlist-description");
      description.append(
        createElement("strong", "", item.title),
        createElement("span", "hint", item instanceof Track ? item.artist : item.author),
      );
      row.append(
        createElement("span", "track-number", String(index + 1)),
        description,
        createElement("span", "duration", item.formattedDuration),
        createButton("Удалить", "remove", item.id),
      );
      fragment.append(row);
    });
  }
  playlistElement.append(fragment);
}

renderCatalog(tracks);
renderPlaylist(playlist);