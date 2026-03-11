# Draw to Speak 🎨💬

AI-powered communication app for people with aphasia. Draw pictures, and AI guesses what you mean!

## Features

- ✏️ **Draw to Communicate** - Draw simple pictures to express words
- 🤖 **AI Recognition** - Claude Vision interprets your drawings
- 🔊 **Text-to-Speech** - Tap words to speak them aloud
- 💬 **Quick Phrases** - Common phrases like "Yes", "No", "Help"
- 📍 **Location Boards** - Context-specific phrases for Hospital, Home, Restaurant, Store
- 🖼️ **Save Pictures** - Build a library of your drawings for quick access
- 📶 **Offline Mode** - Works as a traditional whiteboard when offline

## How It Works

- **Online**: Draw a picture → AI guesses words → Tap to speak
- **Offline**: Draw a picture → Type the word → Save for later use

## Deploy to Vercel (Free)

### Step 1: Get an Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to API Keys → Create new key
4. Copy the key (starts with `sk-ant-`)

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Install Vercel CLI: `npm i -g vercel`
3. In this folder, run: `vercel`
4. Follow the prompts to deploy
5. When asked about environment variables, add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key from Step 1

### Step 3: Set Environment Variable (if not done in Step 2)
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add: `ANTHROPIC_API_KEY` = your key
4. Redeploy

### Step 4: Done!
Your app is live at `https://your-project.vercel.app`

## Install as App (PWA)

### On iPhone/iPad:
1. Open your Vercel URL in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

### On Android:
1. Open your Vercel URL in Chrome
2. Tap the menu (3 dots)
3. Tap "Add to Home Screen" or "Install App"

## Local Development

```bash
npm install
vercel dev
```

Then open http://localhost:3000

## Files

```
draw-to-speak-app/
├── index.html      # Main app (single HTML file)
├── api/
│   └── guess.js    # Serverless function for AI
├── manifest.json   # PWA manifest
├── package.json    # Dependencies
├── vercel.json     # Vercel config
└── README.md       # This file
```

## Cost

- **Vercel**: Free tier is plenty for personal use
- **Anthropic API**: ~$0.003 per drawing guess (very cheap)
  - 1000 guesses ≈ $3

## Made with 💜 by Coach Chris
