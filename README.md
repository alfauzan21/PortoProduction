# Porto Production - Netflix-Style Modal Implementation

## 📦 File yang Tersedia

1. **script.js** - JavaScript lengkap dengan modal Netflix-style
2. **style.css** - CSS untuk modal overlay (partial - perlu dilengkapi dengan CSS asli Anda)
3. **modal-example.html** - Contoh implementasi HTML

---

## ✨ Fitur Modal

### 🎬 Netflix-Style Modal Features:

- **Dark Theme** - Background hitam (#181818) seperti Netflix
- **Smooth Animations** - Transisi halus saat buka/tutup modal
- **Video Player Controls** - Play, pause, mute, fullscreen, progress bar
- **Logo Overlay** - Logo muncul sebelum video diputar
- **Auto-hide Controls** - Kontrol video hilang otomatis setelah 3 detik
- **Keyboard Shortcuts** - Kontrol penuh dari keyboard
- **Responsive Design** - Tampil sempurna di mobile dan desktop

---

## 🎹 Keyboard Shortcuts

| Key           | Action             |
| ------------- | ------------------ |
| `Space` / `K` | Play / Pause video |
| `M`           | Mute / Unmute      |
| `F`           | Fullscreen toggle  |
| `ESC`         | Close modal        |
| `←`           | Rewind 10 seconds  |
| `→`           | Forward 10 seconds |

---

## 🚀 Cara Implementasi

### 1. Copy File JavaScript

Ganti file `js/script.js` Anda dengan file `script.js` yang baru.

### 2. Update HTML Modal

Pastikan HTML modal Anda memiliki struktur seperti ini:

```html
<div class="modal-overlay" id="docModal">
  <div class="modal-container">
    <button class="modal-close" onclick="closeDocModal()">
      <i class="fas fa-times"></i>
    </button>

    <div class="modal-video-section">
      <div class="modal-video-wrapper">
        <video id="modalVideo">
          <source src="assets/video/video-porto.mp4" type="video/mp4" />
        </video>

        <!-- Video Overlay -->
        <div class="modal-video-overlay" id="modalVideoOverlay">
          <div class="modal-video-play-btn">
            <img
              src="assets/img/Logo Porto.png"
              alt="Play Video"
              class="modal-play-logo"
            />
          </div>
        </div>

        <!-- Video Controls -->
        <div class="modal-video-controls-wrapper" id="modalVideoControls">
          <button class="modal-control-btn" id="modalToggleBtn">
            <i class="fas fa-play"></i>
          </button>
          <div class="modal-progress-bar" id="modalProgressBar">
            <div class="modal-progress-filled" id="modalProgressFilled"></div>
          </div>
          <button class="modal-control-btn" id="modalMuteBtn">
            <i class="fas fa-volume-mute"></i>
          </button>
          <button class="modal-control-btn" id="modalFullscreenBtn">
            <i class="fas fa-expand"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="modal-info-section">
      <h2 class="modal-title" id="modalTitle">Title</h2>
      <p class="modal-synopsis-text" id="modalSynopsis">Synopsis</p>
      <div class="modal-details">
        <p><strong>Director:</strong> <span id="modalDirector"></span></p>
        <p><strong>Writers:</strong> <span id="modalWriters"></span></p>
        <p><strong>Location:</strong> <span id="modalLocation"></span></p>
      </div>
      <div class="modal-buttons">
        <button class="modal-btn modal-btn-primary">
          <i class="fas fa-play"></i> Play
        </button>
        <button class="modal-btn modal-btn-secondary">
          <i class="fas fa-info-circle"></i> More Info
        </button>
      </div>
    </div>
  </div>
</div>
```

### 3. Update CSS

Tambahkan CSS dari file `style.css` ke dalam file CSS Anda. Fokus pada bagian:

- `.modal-overlay` - Overlay background
- `.modal-container` - Container modal
- `.modal-video-*` - Semua style video player
- `.modal-info-section` - Info section di bawah video

### 4. Pastikan ID Elements Ada

Pastikan semua elemen memiliki ID yang benar:

- `docModal` - Modal overlay
- `modalVideo` - Video element
- `modalVideoOverlay` - Video overlay
- `modalVideoControls` - Video controls wrapper
- `modalToggleBtn` - Play/pause button
- `modalMuteBtn` - Mute button
- `modalFullscreenBtn` - Fullscreen button
- `modalProgressBar` - Progress bar
- `modalProgressFilled` - Progress filled
- `modalTitle`, `modalSynopsis`, `modalDirector`, `modalWriters`, `modalLocation` - Info fields

---

## 🎨 Kustomisasi

### Warna Modal

Edit variabel CSS di bagian modal:

```css
.modal-container {
  background: #181818; /* Netflix dark theme */
}

.modal-progress-filled {
  background: #e50914; /* Netflix red */
}
```

### Ukuran Modal

```css
.modal-container {
  max-width: 850px; /* Ubah sesuai kebutuhan */
}
```

### Durasi Auto-hide Controls

Edit di JavaScript:

```javascript
function autoHideControls() {
  controlsTimeout = setTimeout(() => {
    modalVideoControls.classList.remove("active");
  }, 3000); // 3000ms = 3 detik
}
```

---

## 🐛 Troubleshooting

### Modal tidak muncul saat klik card

**Solusi:** Pastikan setiap `.doc-card` memiliki atribut `data-doc` yang sesuai dengan key di `docData`:

```html
<div class="doc-card" data-doc="corporate"></div>
```

### Video tidak bisa play

**Solusi:**

1. Pastikan path video benar di `docData`
2. Cek console untuk error
3. Pastikan format video didukung browser (MP4 recommended)

### Controls tidak muncul

**Solusi:** Pastikan semua ID element controls ada:

- `modalVideoControls`
- `modalToggleBtn`
- `modalMuteBtn`
- `modalFullscreenBtn`

### Progress bar tidak update

**Solusi:** Pastikan ada elemen:

```html
<div class="modal-progress-bar" id="modalProgressBar">
  <div class="modal-progress-filled" id="modalProgressFilled"></div>
</div>
```

---

## 📝 Console Messages

Script akan menampilkan pesan di console untuk debugging:

- `🎬 Porto Production - Loading...` - Script loading
- `✅ Modal video initialized` - Video player ready
- `▶️ Video playing` - Video mulai play
- `⏸️ Video paused` - Video di-pause
- `🔇 Muted / 🔊 Unmuted` - Status audio
- `⛶ Fullscreen ON/OFF` - Status fullscreen
- `❌ Closing modal` - Modal ditutup

---

## 🎯 Tips Penggunaan

1. **Testing Modal:**

   - Buka console browser (F12)
   - Klik documentation card
   - Perhatikan console messages untuk debugging

2. **Keyboard Shortcuts:**

   - Gunakan `Space` untuk play/pause cepat
   - Gunakan `←` `→` untuk navigate video
   - Gunakan `F` untuk fullscreen
   - Gunakan `ESC` untuk close modal

3. **Performance:**
   - Video akan di-reset saat modal ditutup
   - Controls otomatis hide untuk UX lebih baik
   - Smooth animations untuk pengalaman premium

---

## 📞 Support

Jika ada pertanyaan atau issue:

1. Check console untuk error messages
2. Pastikan semua ID element ada
3. Cek path file video dan logo
4. Pastikan Font Awesome loaded untuk icons

---

## 📄 License

Copyright © 2025 Porto Production. All rights reserved.

---

**Version:** 2.0  
**Last Update:** January 2025  
**Style:** Netflix-Inspired Modal Design
