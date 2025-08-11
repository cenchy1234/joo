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
    "LOSC Lille": "rubin kazan.png", // Using rubin kazan as placeholder for lille
    "Queens Park Rangers": "queens park rangers.png",
    "CR Bernoussi": "cr bernoussi.png"
};

// Sample FPL data for Olympique Ouezzane team
const teamData = {
    teamName: "Olympique Ouezzane",
    managerName: "Your Name",
    teamId: 123456,
    currentGameweek: 15,
    totalPoints: 0,
    overallRank: 0,
    averagePoints: 0,
    highestScore: 0,
    transfersMade: 0
};

// Sample fixtures data (GW 1-22) - All upcoming, no results yet
const fixturesData = [
    // Gameweek 1-11
    { gw: 1, date: "2024-08-17", opponent: "Racing", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 2, date: "2024-08-24", opponent: "Dinamo Zagreb", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 3, date: "2024-08-31", opponent: "Middlesbrough", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 4, date: "2024-09-14", opponent: "Real Betis", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 5, date: "2024-09-21", opponent: "Corinthians", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 6, date: "2024-09-28", opponent: "Rubin Kazan", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 7, date: "2024-10-05", opponent: "Le Havre", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 8, date: "2024-10-19", opponent: "AS FAR", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 9, date: "2024-10-26", opponent: "LOSC Lille", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 10, date: "2024-11-02", opponent: "Queens Park Rangers", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 11, date: "2024-11-09", opponent: "CR Bernoussi", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    // Gameweek 12-22 (repeating cycle starting with Racing)
    { gw: 12, date: "2024-11-23", opponent: "Racing", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 13, date: "2024-11-30", opponent: "Dinamo Zagreb", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 14, date: "2024-12-07", opponent: "Middlesbrough", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 15, date: "2024-12-14", opponent: "Real Betis", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 16, date: "2024-12-21", opponent: "Corinthians", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 17, date: "2024-12-26", opponent: "Rubin Kazan", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 18, date: "2024-12-29", opponent: "Le Havre", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 19, date: "2025-01-01", opponent: "AS FAR", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 20, date: "2025-01-14", opponent: "LOSC Lille", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 21, date: "2025-01-18", opponent: "Queens Park Rangers", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" },
    { gw: 22, date: "2025-01-25", opponent: "CR Bernoussi", ourScore: 0, opponentScore: 0, status: "upcoming", result: "" }
];

// Sample players data - 4 players only
const playersData = [
    {
        name: "Haitam",
        team: "Olympique Ouezzane",
        totalPoints: 0,
        ranking: "TBD",
        image: "player 1.jpg"
    },
    {
        name: "Ahmed", 
        team: "Olympique Ouezzane",
        totalPoints: 0,
        ranking: "TBD",
        image: "player 2.jpg"
    },
    {
        name: "Zakaria",
        team: "Olympique Ouezzane", 
        totalPoints: 0,
        ranking: "TBD",
        image: "player 3.jpg"
    },
    {
        name: "Aymane",
        team: "Olympique Ouezzane",
        totalPoints: 0,
        ranking: "TBD",
        image: "player 4.jpg"
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing website...');
    
    // DOM elements
    const fixturesGrid = document.getElementById('fixturesGrid');
    const playersGrid = document.getElementById('playersGrid');
    const resultsGrid = document.getElementById('resultsGrid');
    const totalPointsElement = document.getElementById('totalPoints');
    const matchesPlayedElement = document.getElementById('matchesPlayed');
    const teamWinsElement = document.getElementById('teamWins');
    const teamDrawsElement = document.getElementById('teamDraws');
    const teamLossesElement = document.getElementById('teamLosses');
    const avgTeamScoreElement = document.getElementById('avgTeamScore');
    const highestTeamScoreElement = document.getElementById('highestTeamScore');
    
    console.log('DOM elements found:', {
        fixturesGrid: !!fixturesGrid,
        playersGrid: !!playersGrid,
        totalPointsElement: !!totalPointsElement
    });
    
    // Make DOM elements global so functions can access them
    window.fixturesGrid = fixturesGrid;
    window.playersGrid = playersGrid;
    window.resultsGrid = resultsGrid;
    window.totalPointsElement = totalPointsElement;
    window.matchesPlayedElement = matchesPlayedElement;
    window.teamWinsElement = teamWinsElement;
    window.teamDrawsElement = teamDrawsElement;
    window.teamLossesElement = teamLossesElement;
    window.avgTeamScoreElement = avgTeamScoreElement;
    window.highestTeamScoreElement = highestTeamScoreElement;
    
    try {
        console.log('Loading data from database...');
        loadDataFromDatabase();
        
        console.log('Initializing team stats...');
        initializeTeamStats();
        
        console.log('Rendering fixtures...');
        renderFixtures(fixturesData);
        
        console.log('Rendering players...');
        renderPlayers(playersData);
        
        console.log('Rendering results...');
        renderResults();
        
        console.log('Initializing chart...');
        initializeChart();
        
        console.log('Initializing navigation...');
        initializeNavigation();
        
        console.log('Initializing animations...');
        initializeAnimations();
        
        console.log('Website initialization complete!');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Load data from database and update fixtures/players
function loadDataFromDatabase() {
    const dbResults = db.getResults();
    const dbPlayers = db.getPlayers();
    const dbStats = db.getTeamStats();
    
    // Update fixtures with database results
    dbResults.forEach(result => {
        const fixture = fixturesData.find(f => f.gw === result.gameweek);
        if (fixture) {
            fixture.ourScore = result.ourScore;
            fixture.opponentScore = result.opponentScore;
            fixture.status = 'completed';
            fixture.result = result.result;
        }
    });
    
    // Update players with database data
    if (dbPlayers.length > 0) {
        dbPlayers.forEach(dbPlayer => {
            const player = playersData.find(p => p.name === dbPlayer.name);
            if (player) {
                player.totalPoints = dbPlayer.totalPoints;
                player.ranking = dbPlayer.ranking;
            }
        });
    }
    
    // Update team data with database stats
    if (dbStats.matchesPlayed > 0) {
        teamData.totalPoints = dbStats.totalPoints;
        teamData.averagePoints = dbStats.averageScore;
        teamData.highestScore = dbStats.highestScore;
    }
}

// Calculate and display team statistics
function initializeTeamStats() {
    // Get stats from database
    const dbStats = db.getTeamStats();
    
    if (dbStats.matchesPlayed > 0) {
        // Use database stats
        updateStatsDisplay(dbStats);
    } else {
        // Use default stats if no matches played
        const defaultStats = {
            matchesPlayed: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            totalPoints: 0,
            averageScore: 0,
            highestScore: 0
        };
        updateStatsDisplay(defaultStats);
    }
}

// Update stats display elements
function updateStatsDisplay(stats) {
    if (window.totalPointsElement) window.totalPointsElement.textContent = stats.totalPoints;
    if (window.matchesPlayedElement) window.matchesPlayedElement.textContent = stats.matchesPlayed;
    if (window.teamWinsElement) window.teamWinsElement.textContent = stats.wins;
    if (window.teamDrawsElement) window.teamDrawsElement.textContent = stats.draws;
    if (window.teamLossesElement) window.teamLossesElement.textContent = stats.losses;
    if (window.avgTeamScoreElement) window.avgTeamScoreElement.textContent = stats.averageScore;
    if (window.highestTeamScoreElement) window.highestTeamScoreElement.textContent = stats.highestScore;
}

// Render fixtures
function renderFixtures(fixtures) {
    if (!window.fixturesGrid) return;
    
    window.fixturesGrid.innerHTML = '';
    
    fixtures.forEach(fixture => {
        const fixtureCard = createFixtureCard(fixture);
        window.fixturesGrid.appendChild(fixtureCard);
    });
}

// Create fixture card element
function createFixtureCard(fixture) {
    const card = document.createElement('div');
    card.className = `fixture-card ${fixture.status}`;
    
    const opponentLogo = teamLogos[fixture.opponent] || 'joo.png';
    const resultClass = fixture.status === 'completed' ? 
        (fixture.ourScore > fixture.opponentScore ? 'win' : 
         fixture.ourScore < fixture.opponentScore ? 'loss' : 'draw') : '';
    
    card.innerHTML = `
        <div class="fixture-header">
            <span class="gameweek">GW ${fixture.gw}</span>
            <span class="fixture-date">${formatDate(fixture.date)}</span>
        </div>
        <div class="teams">
            <div class="team">
                <img src="img/joo.png" alt="Olympique Ouezzane" class="team-logo">
                <span class="team-name">Olympique Ouezzane</span>
            </div>
            <div class="vs">VS</div>
            <div class="team">
                <img src="img/${opponentLogo}" alt="${fixture.opponent}" class="team-logo">
                <span class="team-name">${fixture.opponent}</span>
            </div>
        </div>
        ${fixture.status === 'completed' ? `
            <div class="score ${resultClass}">
                <span class="score-number">${fixture.ourScore}</span>
                <span class="score-separator">-</span>
                <span class="score-number">${fixture.opponentScore}</span>
            </div>
            <div class="status completed">${fixture.result}</div>
        ` : `
            <div class="status upcoming">Upcoming</div>
        `}
    `;
    return card;
}

// Render players
function renderPlayers(players) {
    if (!window.playersGrid) return;
    
    window.playersGrid.innerHTML = '';
    
    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        window.playersGrid.appendChild(playerCard);
    });
}

// Create player card element
function createPlayerCard(player) {
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
    return card;
}

// Render match results
function renderResults() {
    if (!resultsGrid) return;
    
    resultsGrid.innerHTML = '';
    const completedFixtures = fixturesData.filter(f => f.status === 'completed');
    
    if (completedFixtures.length === 0) {
        resultsGrid.innerHTML = '<p class="no-results">No matches completed yet</p>';
        return;
    }
    
    completedFixtures.forEach(fixture => {
        const resultCard = createResultCard(fixture);
        resultsGrid.appendChild(resultCard);
    });
}

// Create result card element
function createResultCard(fixture) {
    const card = document.createElement('div');
    const resultClass = fixture.ourScore > fixture.opponentScore ? 'win' : 
                       fixture.ourScore < fixture.opponentScore ? 'loss' : 'draw';
    
    card.className = `result-card ${resultClass}`;
    card.innerHTML = `
        <div class="result-header">
            <span class="gameweek-badge">GW ${fixture.gw}</span>
            <span class="result-type">${fixture.result}</span>
        </div>
        <div class="result-content">
            <div class="result-teams">Olympique Ouezzane vs ${fixture.opponent}</div>
            <div class="result-score">${fixture.ourScore} - ${fixture.opponentScore}</div>
            <div class="result-date">${formatDate(fixture.date)}</div>
        </div>
    `;
    return card;
}

function filterFixtures(type) {
    // Update active button
    document.querySelectorAll('.fixtures-filter .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    let filteredFixtures;
    switch(type) {
        case 'completed':
            filteredFixtures = fixturesData.filter(f => f.status === 'completed');
            break;
        case 'upcoming':
            filteredFixtures = fixturesData.filter(f => f.status === 'upcoming' || f.status === 'live');
            break;
        default:
            filteredFixtures = fixturesData;
    }
    
    renderFixtures(filteredFixtures);
}

// Initialize points progression chart
function initializeChart() {
    const ctx = document.getElementById('pointsChart').getContext('2d');
    const completedFixtures = fixturesData.filter(f => f.status === 'completed');
    
    if (completedFixtures.length === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('No match data available yet', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }
    
    const labels = completedFixtures.map(f => `GW ${f.gw}`);
    const ourScores = completedFixtures.map(f => f.ourScore);
    const opponentScores = completedFixtures.map(f => f.opponentScore);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Olympique Ouezzane',
                data: ourScores,
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#dc2626',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: 'Opponents',
                data: opponentScores,
                borderColor: '#1a4d3a',
                backgroundColor: 'rgba(26, 77, 58, 0.1)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#1a4d3a',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e2e8f0'
                    },
                    ticks: {
                        color: '#64748b'
                    }
                },
                x: {
                    grid: {
                        color: '#e2e8f0'
                    },
                    ticks: {
                        color: '#64748b'
                    }
                }
            }
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Initialize scroll animations
function initializeAnimations() {
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

    // Add fade-in class to elements
    document.querySelectorAll('.fixture-card, .player-card, .team-card, .stat-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short'
    });
}

// Function to update fixture results after each match
function updateFixtureResult(gameweek, ourScore, opponentScore) {
    const fixture = fixturesData.find(f => f.gw === gameweek);
    if (fixture) {
        fixture.ourScore = ourScore;
        fixture.opponentScore = opponentScore;
        fixture.status = 'completed';
        
        // Determine result
        if (ourScore > opponentScore) {
            fixture.result = 'WIN';
        } else if (ourScore < opponentScore) {
            fixture.result = 'LOSS';
        } else {
            fixture.result = 'DRAW';
        }
        
        // Update displays
        initializeTeamStats();
        renderFixtures(fixturesData);
        renderResults();
        initializeChart();
    }
}

// Example of how to update results (you can call this function after each match)
// updateFixtureResult(1, 65, 58); // GW1: Won 65-58
// updateFixtureResult(2, 72, 72); // GW2: Draw 72-72
// updateFixtureResult(3, 45, 63); // GW3: Lost 45-63

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Update live scores (simulated)
function updateLiveScores() {
    const liveFixtures = fixturesData.filter(f => f.status === 'live');
    liveFixtures.forEach(fixture => {
        // Simulate score updates
        if (Math.random() > 0.8) {
            fixture.score += Math.floor(Math.random() * 10) + 1;
        }
    });
    
    if (liveFixtures.length > 0) {
        renderFixtures(fixturesData);
    }
}

// Enhanced Navigation and Animations
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeAnimations() {
    // Intersection Observer for fade-in animations
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
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Number counting animation for stats
    const countStats = () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            if (finalValue > 0) {
                let currentValue = 0;
                const increment = finalValue / 30;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue);
                    }
                }, 50);
            }
        });
    };
    
    // Trigger counting when stats section is visible
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
}

// Enhanced chart initialization with animations
function initializeChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    const dbResults = db.getResults();
    const labels = dbResults.map(r => `GW ${r.gameweek}`);
    const scores = dbResults.map(r => r.ourScore);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.length > 0 ? labels : ['No data'],
            datasets: [{
                label: 'Team Score',
                data: scores.length > 0 ? scores : [0],
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#dc2626',
                pointBorderColor: '#1a4d3a',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9',
                        font: {
                            family: 'Inter',
                            size: 14
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(26, 77, 58, 0.2)'
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(26, 77, 58, 0.2)'
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Export data for potential future use
window.teamData = teamData;
window.fixturesData = fixturesData;
window.playersData = playersData;
