# Competitor News Summarizer

A React Native (Expo) mobile app that displays AI-summarized news about U.S. Bank and talech POS top competitors.

## Features

- **Banking News Tab**: News about Chase, Bank of America, Wells Fargo, Citibank, and PNC Bank
- **POS News Tab**: News about Square, Toast, Clover, Lightspeed, and Shopify POS
- AI-powered article summaries using GPT-3.5-turbo
- Pull-to-refresh functionality
- Clean, minimal UI design

## Setup

### Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS/Android)

### Installation

1. Navigate to the project directory:
   ```bash
   cd CompetitorNewsApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API keys in `src/config/competitors.js`:
   ```javascript
   export const API_CONFIG = {
     NEWS_API_KEY: 'your_newsapi_key_here',
     OPENAI_API_KEY: 'your_openai_key_here',
   };
   ```

### Getting API Keys

1. **NewsAPI.org**: Sign up at https://newsapi.org to get a free API key (100 requests/day)
2. **OpenAI**: Get an API key from https://platform.openai.com/api-keys

### Running the App

```bash
npx expo start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS).

## Project Structure

```
CompetitorNewsApp/
├── App.js                    # Entry point with navigation
├── app.json                  # Expo config
├── package.json
├── src/
│   ├── screens/
│   │   ├── BankingNewsScreen.js
│   │   └── POSNewsScreen.js
│   ├── components/
│   │   ├── NewsCard.js
│   │   └── LoadingSpinner.js
│   ├── services/
│   │   ├── newsApi.js        # NewsAPI.org integration
│   │   └── openai.js         # OpenAI summarization
│   └── config/
│       └── competitors.js    # Competitor lists & API config
```

## Notes

- The free tier of NewsAPI has a limit of 100 requests per day
- OpenAI API calls are rate-limited to 1 per 500ms to avoid rate limiting
- Articles are limited to 10 per category to minimize API usage
