# 🎄 Advent Adventure

A festive Christmas advent calendar web application featuring daily jokes, interactive animations, and holiday cheer!

![Advent Adventure](./public/assets/images/xmasheroimage.png)

## ✨ Features

- 🎁 **24 Interactive Doors** - Click to reveal a daily Christmas joke
- ❄️ **Animated Snowfall** - 50 falling snowflakes create a winter wonderland
- 💡 **Twinkle Lights** - Colorful animated Christmas lights across the top
- 🎵 **Background Music** - Optional festive music toggle
- 📱 **Fully Responsive** - Works beautifully on desktop, tablet, and mobile
- 🔒 **Smart Date Locking** - Doors lock automatically for future dates in December
- 💾 **Progress Saving** - Remembers which doors you've opened
- ♿ **Accessible** - Full keyboard navigation and ARIA labels

## 🚀 Quick Start 

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DannyGilligan/hackathon-dec-2025.git
   cd hackathon-dec-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
hackathon-dec-2025/
├── public/
│   └── assets/
│       ├── audio/
│       │   └── festive.mp3          # Background music
│       ├── css/
│       │   └── styles.css           # Main styles with animations
│       ├── images/
│       │   └── xmasheroimage.png    # Hero background
│       └── javascript/
│           └── main.js              # Core application logic
├── src/                             # Vite source files (if applicable)
├── index.html                       # Main HTML file
├── package.json
├── vite.config.js                   # Vite configuration
└── README.md
```

## 🎮 How to Use

1. **Open a Door** - Click on any numbered door (1-24)
2. **Read the Joke** - Enjoy your daily Christmas joke in the modal
3. **Close Modal** - Click the close button, press Escape, or click outside
4. **Toggle Music** - Use the music button in the top-right corner
5. **Track Progress** - Opened doors turn green with a checkmark

### Keyboard Navigation
- `Tab` - Navigate between doors
- `Enter` or `Space` - Open selected door
- `Escape` - Close modal

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: CSS3 with Custom Properties
- **Storage**: localStorage API
- **Animations**: CSS Keyframes

## 🎨 Design Features

### Color Scheme
- Background: Dark blue (`#0b1b33`)
- Doors: Festive red gradient
- Opened Doors: Green gradient
- Day 25: Special gold styling
- Borders: Bright cyan/green accents

### Responsive Breakpoints
- **Desktop**: 12 columns (>980px)
- **Tablet**: 6 columns (521px - 980px)
- **Mobile**: 4 columns (<520px)

### Animations
- Falling snowflakes with horizontal drift
- Twinkling Christmas lights with glow effects
- Door hover and click effects
- Modal fade-in
- Loading states

## ♿ Accessibility

- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Support**: Full navigation without mouse
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Semantic HTML**: Proper role attributes and dialog structure

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 24 doors open correctly
- [ ] Jokes display in modal
- [ ] Modal closes with button, Escape, and outside click
- [ ] Future dates lock in December
- [ ] Progress saves and persists on reload
- [ ] Music toggle works
- [ ] Responsive on mobile (test 320px width)
- [ ] Keyboard navigation works
- [ ] No console errors

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📊 User Stories Implementation

### Must Have ✅
- [x] Open doors to reveal Christmas jokes (Amina)
- [x] Easy to understand interface (Luca)
- [x] Different joke each day (Yusuf)

### Should Have ✅
- [x] Mobile responsive design (Priya)
- [x] Festive Christmas design (Sofia)
- [x] Easy return to calendar (Anya)

### Could Have ✅
- [x] Click feedback and visual states (Hassan)
- [x] Good contrast and accessibility (Mateo)

## 🐛 Known Issues

- Music may require user interaction to start (browser autoplay policies)
- localStorage may not work in private browsing mode

## 🚀 Future Enhancements

- [ ] Social sharing functionality
- [ ] Multiple joke categories
- [ ] Countdown timer to next day
- [ ] Animation when door opens
- [ ] Sound effects for door clicks
- [ ] Admin panel for joke management
- [ ] Multi-language support

## 👥 Team

Created during the December 2025 Hackathon

## 📄 License

This project is for educational and hackathon purposes.

## 🎉 Acknowledgments

- Christmas jokes sourced from various public domain collections
- Background music: [Credit your music source]
- Snowflake and festive emoji: Unicode Consortium

---

**Merry Christmas! 🎅 Happy Coding! 💻**