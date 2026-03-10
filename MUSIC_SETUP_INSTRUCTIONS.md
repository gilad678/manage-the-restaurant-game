# Background Music Setup Instructions

## What Has Been Implemented

All the features you requested have been successfully implemented:

### ✅ Completed Features:

1. **Level System (10 Levels)**
   - Players must serve 10 customers to advance to the next level
   - Level counter resets after each level completion
   - Current level displayed in status bar: "שלב: X/10"
   - Game ends after completing level 10

2. **Settings Menu**
   - Settings button (⚙️) in top-right corner
   - Pause/Resume functionality with icon toggle
   - Restart button to reset the game
   - Volume slider (0-100%) with real-time percentage display
   - All text translated to Hebrew/English/Arabic

3. **Game Completion Screen**
   - Trophy icon and "כל הכבוד! גמרת את המשחק!" message
   - "שחק מחדש" button (translated per language)
   - No auto-restart - manual restart only

4. **Background Music System**
   - Automatic playback when game starts
   - Continuous loop functionality
   - Volume control via settings menu
   - Starts at 100% volume by default
   - Music continues across level transitions

## 🎵 How to Add Your Background Music

The music system is ready, but you need to add the audio file:

### Step 1: Download the Music
1. Go to: https://youtu.be/0tBmhSFGTLk
2. Use a YouTube downloader tool to download the audio
   - Recommended tools: youtube-dl, yt-dlp, or online converters
   - Example command: `yt-dlp -x --audio-format mp3 "https://youtu.be/0tBmhSFGTLk"`

### Step 2: Convert to MP3 (if needed)
If the downloaded file isn't already MP3:
- Use a converter like FFmpeg: `ffmpeg -i input.webm output.mp3`
- Or use online tools like CloudConvert or FreeConvert

### Step 3: Add to Your Project
1. Create a `public` folder in your project root (if it doesn't exist)
2. Place the audio file as: `public/background-music.mp3`
3. The file path should be: `/tmp/cc-agent/53492464/project/public/background-music.mp3`

### Step 4: Verify
The audio hook is configured to load from `/background-music.mp3` which maps to the public folder.

## Technical Details

### Audio Hook (`src/hooks/useAudio.ts`)
- Manages audio playback, volume, and loop
- Audio element created on mount
- Volume range: 0-100 (converted to 0.0-1.0 internally)
- Continuous loop enabled

### Settings Integration
- Volume changes apply immediately
- Pause/Resume affects both game and music
- Settings button always visible during gameplay

### Game State
- Music starts when `gameState.gameStarted` becomes true
- Music continues until game over or manual pause
- Restart resets everything and restarts music

## Files Modified/Created

### New Files:
- `src/hooks/useAudio.ts` - Audio management
- `src/components/SettingsMenu.tsx` - Settings UI

### Modified Files:
- `src/App.tsx` - Integrated all new features
- `src/types/language.ts` - Added new translations
- `src/components/GameOverScreen.tsx` - Added completion screen
- `src/hooks/useGameState.ts` - Removed auto-restart on completion

## Testing Checklist

Once you add the music file, test:
- [ ] Music starts when game begins
- [ ] Music loops continuously
- [ ] Volume slider changes music volume
- [ ] Pause button stops music
- [ ] Resume button restarts music
- [ ] Music continues when advancing levels
- [ ] Settings menu opens/closes properly
- [ ] Level counter shows correctly (X/10)
- [ ] Completion screen appears at level 10
- [ ] Play Again button restarts properly

## Troubleshooting

**Music doesn't play:**
1. Check browser console for errors
2. Verify file exists at `public/background-music.mp3`
3. Some browsers block autoplay - user interaction may be needed first

**Volume doesn't change:**
- Ensure audio file loaded successfully
- Check browser audio permissions

**Game doesn't pause:**
- Verify state management in React DevTools
- Check that timers are being managed correctly

---

All features are implemented and ready to use once you add the music file!
