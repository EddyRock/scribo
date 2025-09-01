# Scribo

Scribo is a fast, offline‑first notes app with a clean three‑pane layout inspired by Apple Notes. Organize notes by folders, pin important ones, and browse grouped by date. Enjoy a minimal light theme with subtle shadows, rounded corners, and a crisp sans‑serif font. The editor supports rich text, images, and hashtags. Works fully offline via IndexedDB and PWA caching.

---

## Features

- **3‑pane layout**
  - **Left:** Folders with note counts and “+ New Folder”
  - **Middle:** Note list with title, time, preview, thumbnails, pinned on top, grouped by date
  - **Right:** Full note viewer/editor with rich text, images, and hashtags
- **Modern minimal UI:** Soft neutral background, rounded corners, subtle shadows, hover states.
- **Offline‑first:** IndexedDB (Dexie.js) for data, PWA shell caching.

---

## Tech Stack

- **React + TypeScript + Vite**
- **Styling:** Tailwind CSS
- **State:** Redux Toolkit
- **Editor:** TipTap
- **Storage:** Dexie (IndexedDB)
- **PWA:** vite-plugin-pwa
- **Icons:** mui-icons

---

## Offline‑first

- Data is stored locally in IndexedDB via Dexie.
- The app shell is cached by a Service Worker (vite-plugin-pwa) for full offline use.
- All CRUD flows operate without network access.

---

## License

MIT

---

## Contributing

Fork, create a feature branch, commit with clear messages, open a PR.

Please include brief before/after screenshots or a short clip for UI changes.

---

Happy note‑taking—now with fewer distractions and more delightful details.
