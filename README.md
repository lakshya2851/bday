# Happy Birthday Uma ❤️ — Personal Interactive Love Story Web App

A handcrafted, story-driven personal birthday web experience built with Vite, React, Tailwind CSS, GSAP, and Lenis smooth scroll.

---

## 1. Adding Photos

All photos for the polaroid scrapbook gallery and surprise reel are stored in `public/images/` and configured in `src/data/photos.js`.

1. Place your photo files (`.png`, `.jpg`, `.webp`, or `.svg`) in the `public/images/` directory.
2. Open `src/data/photos.js` (look for the `✏️ EDIT HERE` header).
3. Replace the `url` paths and captions:
   ```javascript
   export const photoMemories = [
     {
       id: 1,
       url: "/images/your-photo-1.jpg",
       caption: "That unforgettable smile ❤️",
       rotation: "-5deg",
       alt: "Uma smiling"
     },
     // ...
   ];
   ```

---

## 2. Editing the Birthday Message and Letter

1. Open `src/data/letter.js` (look for the `✏️ EDIT HERE` header).
2. Edit the `secretLetterContent` object:
   ```javascript
   export const secretLetterContent = {
     recipient: "Uma",
     message: "Your custom personal message here...",
     signOff: "With all my love,",
     sender: "Yours Always ❤️"
   };
   ```

---

## 3. Editing Memories, Timeline, and Reasons

1. **Timeline Milestones**: Open `src/data/memories.js` (look for the `✏️ EDIT HERE` header) and modify the `storyMilestones` array to update the story tags, titles, and descriptions.
2. **20 Little Reasons**: Open `src/data/reasons.js` (look for the `✏️ EDIT HERE` header) and edit or add cards to the `reasonsList` array.
3. **Things I Love Cards**: Open `src/data/loveCards.js` (look for the `✏️ EDIT HERE` header) to edit the 7 interactive flip card titles and hidden notes.

---

## 4. Adding Music

1. Add your audio file named `soundtrack.mp3` to the `public/music/` directory.
2. If using a different filename or format, open `src/data/config.js` (look for the `✏️ EDIT HERE` header) and update `siteConfig.music.path`:
   ```javascript
   music: {
     path: "/music/your-audio-file.mp3",
     title: "Play our little soundtrack",
     defaultVolume: 0.25,
   }
   ```
*(Note: Music never autoplays. Audio starts only when the user taps the wax seal envelope or the floating soundtrack button).*

---

## 5. Adding Friends' Messages and Videos

1. Open `src/data/friends.js` (look for the `✏️ EDIT HERE` header).
2. Add or edit entries in the `friendsWishes` array:
   ```javascript
   export const friendsWishes = [
     {
       id: 1,
       name: "Friend Name 🌸",
       message: "Happy Birthday Uma! Wishing you a fantastic year ahead!",
       photoUrl: "/images/friend-photo.jpg",
       videoUrl: "https://www.youtube.com/embed/your-video-id"
     },
   ];
   ```
*(Note: If the `friendsWishes` array is left empty `[]`, the friends' wishes section will automatically hide).*

---

## 6. Other Personal Content

1. Open `src/data/config.js` (look for the `✏️ EDIT HERE` header).
2. Update general metadata such as name, birthdate, tagline, or feature flags:
   ```javascript
   export const siteConfig = {
     name: "Uma",
     birthdate: {
       day: 14,
       month: 10,
       year: 2003,
     },
     tagline: "Today is all about you.",
     // ...
   };
   ```

---

## 7. Running Locally

1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:5173` (or the port shown in terminal).
4. To test the Birthday Celebration Mode with confetti and fireworks, visit:
   `http://localhost:5173/?preview=birthday`

---

## 8. Deploying to Vercel

### Option A: GitHub Import (Zero Config)
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
3. Import your GitHub repository.
4. Leave framework preset as **Vite** and build settings default (`npm run build`).
5. Click **"Deploy"**.

### Option B: Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Run deployment command in the project directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy directly.
