// Initialize database
const db = new SimpleDatabase();

// Team logos mapping
const teamLogos = {
    "Racing": "racing logo.png",
    "Dinamo Zagreb": "dynamo zagreb.png", 
    "Middlesbrough": "Middlesbrough.png",
    "Real Betis": "real betis.png",
    "Corinthians": "corinthians.png",
    "Rubin Kazan": "rubin kazan.png",
    "Le Havre": "le havre.png",
    "AS FAR": "as far.png",
    "LOSC Lille": "rubin kazan.png",
    "Queens Park Rangers": "queens park rangers.png",
    "CR Bernoussi": "cr bernoussi.png"
};

// Sample fixtures data
const fixturesData = [
    { gw: 1, date: "2024-08-17", opponent: "Racing", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 2, date: "2024-08-24", opponent: "Dinamo Zagreb", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 3, date: "2024-08-31", opponent: "Middlesbrough", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 4, date: "2024-09-14", opponent: "Real Betis", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 5, date: "2024-09-21", opponent: "Corinthians", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" }
];

// Sample players data
const playersData = [
    { name: "Haitam", team: "Olympique Ouezzane", totalPoints: 0, ranking: "TBD", image: "player 1.jpg" },
    { name: "Ahmed", team: "Olympique Ouezzane", totalPoints: 0, ranking: "TBD", image: "player 2.jpg" },
    { name: "Zakaria", team: "Olympique Ouezzane", totalPoints: 0, ranking: "TBD", image: "player 3.jpg" },
    { name: "Aymane", team: "Olympique Ouezzane", totalPoints: 0, ranking: "TBD", image: "player 4.jpg" }
];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting initialization...');
    
    // Simple fixture rendering
    const fixturesGrid = document.getElementById('fixturesGrid');
    if (fixturesGrid) {
        console.log('Rendering fixtures...');
        fixturesGrid.innerHTML = '';
        
        fixturesData.forEach(fixture => {
            const card = document.createElement('div');
            card.className = 'fixture-card';
            card.innerHTML = `
                <div class="fixture-header">
                    <span class="gameweek">GW ${fixture.gw}</span>
                    <span class="fixture-date">${fixture.date}</span>
                </div>
                <div class="teams">
                    <div class="team">
                        <img src="img/joo.png" alt="Olympique Ouezzane" class="team-logo">
                        <span class="team-name">Olympique Ouezzane</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <img src="img/${teamLogos[fixture.opponent] || 'joo.png'}" alt="${fixture.opponent}" class="team-logo">
                        <span class="team-name">${fixture.opponent}</span>
                    </div>
                </div>
                <div class="status upcoming">Upcoming</div>
            `;
            fixturesGrid.appendChild(card);
        });
        console.log('Fixtures rendered successfully');
    } else {
        console.error('fixturesGrid not found!');
    }
    
    // Simple player rendering
    const playersGrid = document.getElementById('playersGrid');
    if (playersGrid) {
        console.log('Rendering players...');
        playersGrid.innerHTML = '';
        
        playersData.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <img src="img/${player.image}" alt="${player.name}" class="player-image">
                <h3 class="player-name">${player.name}</h3>
                <p class="player-team">${player.team}</p>
                <div class="player-stats">
                    <div class="player-stat">
                        <span class="stat-value">${player.totalPoints}</span>
                        <span class="stat-name">Points</span>
                    </div>
                    <div class="player-stat">
                        <span class="stat-value">${player.ranking}</span>
                        <span class="stat-name">Rank</span>
                    </div>
                </div>
            `;
            playersGrid.appendChild(card);
        });
        console.log('Players rendered successfully');
    } else {
        console.error('playersGrid not found!');
    }
    
    // Update stats
    const totalPointsElement = document.getElementById('totalPoints');
    const matchesPlayedElement = document.getElementById('matchesPlayed');
    const teamWinsElement = document.getElementById('teamWins');
    const avgTeamScoreElement = document.getElementById('avgTeamScore');
    
    if (totalPointsElement) totalPointsElement.textContent = '0';
    if (matchesPlayedElement) matchesPlayedElement.textContent = '0';
    if (teamWinsElement) teamWinsElement.textContent = '0';
    if (avgTeamScoreElement) avgTeamScoreElement.textContent = '0';
    
    // Simple navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    console.log('Initialization complete!');
});

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short' 
    });
}
