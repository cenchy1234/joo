# Firebase Setup Guide for Olympique Ouezzane FPL Website

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name: "olympique-ouezzane-fpl"
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Setup Firestore Database

1. In Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select location closest to you
5. Click "Done"

## Step 3: Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) 
4. Register app name: "olympique-ouezzane-web"
5. Copy the configuration object

## Step 4: Update Your Website

Replace the firebaseConfig in `database.js` with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "olympique-ouezzane-fpl.firebaseapp.com",
    projectId: "olympique-ouezzane-fpl",
    storageBucket: "olympique-ouezzane-fpl.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-actual-app-id"
};
```

## Step 5: Add Firebase SDK

Add these script tags to your `index.html` BEFORE the database.js script:

```html
<!-- Firebase SDK -->
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
  
  // Your config here
  const firebaseConfig = {
    // ... your config
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // Make available globally
  window.firebaseApp = app;
  window.firebaseDb = db;
</script>
```

## Step 6: Database Structure

### Fixtures Collection
```javascript
{
  gw: 1,
  opponent: "Racing",
  ourScore: 65,
  opponentScore: 58,
  result: "WIN",
  status: "completed",
  date: "2024-08-17",
  playerScores: {
    haitam: 18,
    ahmed: 15,
    zakaria: 16,
    aymane: 16
  },
  timestamp: "2024-08-17T15:30:00Z"
}
```

### Players Collection
```javascript
{
  id: "haitam",
  name: "Haitam",
  totalPoints: 156,
  ranking: "2nd",
  image: "player 1.jpg",
  lastUpdated: "2024-08-17T15:30:00Z"
}
```

## Step 7: Security Rules

Go to Firestore Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to admin (you can add authentication later)
    match /fixtures/{document} {
      allow write: if true; // Change this to require authentication
    }
    
    match /players/{document} {
      allow write: if true; // Change this to require authentication
    }
  }
}
```

## Step 8: Admin Interface Usage

1. Open your website
2. Click "Admin" button (top-right corner)
3. Enter gameweek results:
   - Select gameweek
   - Enter team scores
   - Enter individual player scores
   - Click "Update Result"

## Step 9: Real-time Updates

Once connected to Firebase:
- Results update instantly across all devices
- No need to refresh the page
- All visitors see updates immediately

## Alternative: Simple JSON Database

If Firebase seems too complex, you can use a simple JSON file:

### Create `data.json`:
```json
{
  "fixtures": [
    {
      "gw": 1,
      "opponent": "Racing",
      "ourScore": 0,
      "opponentScore": 0,
      "status": "upcoming"
    }
  ],
  "players": [
    {
      "name": "Haitam",
      "totalPoints": 0,
      "ranking": "TBD"
    }
  ]
}
```

### Update script.js to load from JSON:
```javascript
// Load data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    fixturesData = data.fixtures;
    playersData = data.players;
    // Initialize UI
  });
```

This gives you a simple file-based database that you can update manually.

## Recommendation

Start with the **Admin Interface** (already implemented) for immediate use, then add Firebase later for real-time features.

The admin panel lets you:
1. Click "Admin" button
2. Enter match results
3. Update player scores
4. See instant updates

This works immediately without any database setup!
