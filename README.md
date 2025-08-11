# Olympique Ouezzane - Fantasy Premier League Team Website

A modern, responsive website showcasing the Olympique Ouezzane Fantasy Premier League team for the 2024/25 season.

## Features

### 🏆 Team Overview
- Team statistics and rankings
- Season performance metrics
- Current gameweek information

### 📅 Fixtures (GW 1-22)
- Complete fixture list for gameweeks 1-22
- Real-time score updates for live matches
- Filter options (All, Completed, Upcoming)
- Visual status indicators

### 👥 Player Squad
- Complete squad with 15 players
- Player statistics and information
- Filter by position (GK, DEF, MID, FWD)
- Price and form data

### 📊 Statistics & Analytics
- Points progression chart
- Team performance metrics
- Transfer history
- Overall ranking information

### 📱 Responsive Design
- Mobile-friendly interface
- Smooth animations and transitions
- Modern UI with gradient effects

## File Structure

```
JOO WEBSITE/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Chart.js**: Points progression visualization
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter)

## Current Squad

### Goalkeepers
- Alisson Becker (Liverpool) - £5.5m
- Robert Sánchez (Chelsea) - £4.5m

### Defenders  
- Trent Alexander-Arnold (Liverpool) - £7.0m
- Gabriel Magalhães (Arsenal) - £6.2m
- Pedro Porro (Tottenham) - £5.5m

### Midfielders
- Mohamed Salah (Liverpool) - £13.3m ⭐ (C)
- Cole Palmer (Chelsea) - £11.2m
- Bukayo Saka (Arsenal) - £10.3m
- Bruno Fernandes (Man Utd) - £8.4m
- James Maddison (Tottenham) - £7.8m

### Forwards
- Erling Haaland (Man City) - £15.1m
- Alexander Isak (Newcastle) - £8.7m

## How to Use

1. **Open the website**: Open `index.html` in any modern web browser
2. **Navigate sections**: Use the navigation menu or scroll through sections
3. **Filter content**: Use filter buttons to view specific fixtures or players
4. **View statistics**: Check the stats section for performance metrics

## Customization

### Adding New Fixtures
Edit the `fixturesData` array in `script.js`:

```javascript
{
    gw: 23,
    date: "2025-02-01", 
    opponent: "Arsenal vs Chelsea",
    score: 0,
    status: "upcoming",
    points: 0
}
```

### Adding New Players
Edit the `playersData` array in `script.js`:

```javascript
{
    name: "Player Name",
    team: "Team Name",
    position: "midfielder", // goalkeeper, defender, midfielder, forward
    price: 8.5,
    points: 95,
    selectedBy: 25.4,
    form: 5.2,
    goals: 5,
    assists: 3,
    cleanSheets: 2
}
```

### Updating Team Information
Modify the `teamData` object in `script.js`:

```javascript
const teamData = {
    teamName: "Your Team Name",
    managerName: "Your Name",
    teamId: 123456,
    // ... other properties
};
```

## Features in Detail

### Live Score Updates
- Simulated live score updates every 30 seconds
- Visual indicators for match status
- Real-time point calculations

### Responsive Navigation
- Mobile hamburger menu
- Smooth scroll navigation
- Active section highlighting

### Interactive Charts
- Points progression visualization
- Responsive chart design
- Hover effects and animations

### Filter System
- Multiple filter options for fixtures and players
- Smooth transitions between filtered views
- Active state management

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

- [ ] Connect to FPL API for real data
- [ ] Add player comparison tools
- [ ] Implement league mini-leagues
- [ ] Add transfer planning features
- [ ] Include more detailed statistics

## Performance

- Optimized images and assets
- Minimal external dependencies
- Efficient DOM manipulation
- Smooth animations at 60fps

## License

This project is for personal/educational use. Fantasy Premier League data and team names are property of the Premier League.

---

**Olympique Ouezzane FPL Team** - Season 2024/25
*Building a championship squad, one gameweek at a time.*
