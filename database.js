// Simple Database using localStorage for storing match results
class SimpleDatabase {
    constructor() {
        this.storageKey = 'olympique_ouezzane_results';
        this.playersKey = 'olympique_ouezzane_players';
        this.initializeData();
    }

    // Initialize default data if nothing exists
    initializeData() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultResults = [];
            this.saveResults(defaultResults);
        }
        
        if (!localStorage.getItem(this.playersKey)) {
            const defaultPlayers = [
                { name: "Haitam", totalPoints: 0, ranking: "TBD" },
                { name: "Ahmed", totalPoints: 0, ranking: "TBD" },
                { name: "Zakaria", totalPoints: 0, ranking: "TBD" },
                { name: "Aymane", totalPoints: 0, ranking: "TBD" }
            ];
            this.savePlayers(defaultPlayers);
        }
    }

    // Save match results
    saveResults(results) {
        localStorage.setItem(this.storageKey, JSON.stringify(results));
    }

    // Get all match results
    getResults() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    // Add or update a match result
    updateMatchResult(gameweek, ourScore, opponentScore, haitamPoints, ahmedPoints, zakariaPoints, aymanePoints) {
        const results = this.getResults();
        const existingIndex = results.findIndex(r => r.gameweek === gameweek);
        
        const matchResult = {
            gameweek: gameweek,
            ourScore: ourScore,
            opponentScore: opponentScore,
            result: ourScore > opponentScore ? 'WIN' : ourScore < opponentScore ? 'LOSS' : 'DRAW',
            date: new Date().toISOString(),
            playerScores: {
                haitam: haitamPoints,
                ahmed: ahmedPoints,
                zakaria: zakariaPoints,
                aymane: aymanePoints
            }
        };

        if (existingIndex >= 0) {
            results[existingIndex] = matchResult;
        } else {
            results.push(matchResult);
        }

        this.saveResults(results);
        this.updatePlayerTotals();
        return matchResult;
    }

    // Update player total points and rankings
    updatePlayerTotals() {
        const results = this.getResults();
        const players = [
            { name: "Haitam", totalPoints: 0 },
            { name: "Ahmed", totalPoints: 0 },
            { name: "Zakaria", totalPoints: 0 },
            { name: "Aymane", totalPoints: 0 }
        ];

        // Calculate total points for each player
        results.forEach(result => {
            if (result.playerScores) {
                players[0].totalPoints += result.playerScores.haitam || 0;
                players[1].totalPoints += result.playerScores.ahmed || 0;
                players[2].totalPoints += result.playerScores.zakaria || 0;
                players[3].totalPoints += result.playerScores.aymane || 0;
            }
        });

        // Sort by points to determine rankings
        const sortedPlayers = [...players].sort((a, b) => b.totalPoints - a.totalPoints);
        
        // Assign rankings
        players.forEach(player => {
            const rank = sortedPlayers.findIndex(p => p.name === player.name) + 1;
            player.ranking = rank === 1 ? "1st" : rank === 2 ? "2nd" : rank === 3 ? "3rd" : "4th";
        });

        this.savePlayers(players);
    }

    // Save player data
    savePlayers(players) {
        localStorage.setItem(this.playersKey, JSON.stringify(players));
    }

    // Get player data
    getPlayers() {
        const data = localStorage.getItem(this.playersKey);
        return data ? JSON.parse(data) : [];
    }

    // Get team statistics
    getTeamStats() {
        const results = this.getResults();
        const players = this.getPlayers();
        
        const wins = results.filter(r => r.result === 'WIN').length;
        const draws = results.filter(r => r.result === 'DRAW').length;
        const losses = results.filter(r => r.result === 'LOSS').length;
        const totalTeamPoints = results.reduce((sum, r) => sum + r.ourScore, 0);
        const averageScore = results.length > 0 ? (totalTeamPoints / results.length).toFixed(1) : 0;
        const highestScore = results.length > 0 ? Math.max(...results.map(r => r.ourScore)) : 0;
        
        // Calculate total player points
        const totalPlayerPoints = players.reduce((sum, p) => sum + (p.totalPoints || 0), 0);
        const averagePlayerPoints = players.length > 0 ? Math.round(totalPlayerPoints / players.length) : 0;
        const winRate = results.length > 0 ? Math.round((wins / results.length) * 100) : 0;

        return {
            matchesPlayed: results.length,
            wins,
            draws,
            losses,
            totalPoints: totalTeamPoints,
            totalPlayerPoints,
            averageScore: parseFloat(averageScore),
            averagePlayerPoints,
            highestScore,
            winRate
        };
    }

    // Get monthly progress data
    getMonthlyProgress() {
        const results = this.getResults();
        const monthlyData = {};
        
        results.forEach(result => {
            const date = new Date(result.date);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { points: 0, matches: 0 };
            }
            
            monthlyData[monthKey].points += result.ourScore;
            monthlyData[monthKey].matches += 1;
        });
        
        return monthlyData;
    }

    // Get player form (last 5 matches)
    getPlayerForm(playerName) {
        const results = this.getResults().slice(-5);
        const playerKey = playerName.toLowerCase();
        
        return results.map(result => {
            const playerScore = result.playerScores ? result.playerScores[playerKey] || 0 : 0;
            return {
                gameweek: result.gameweek,
                points: playerScore,
                teamResult: result.result
            };
        });
    }

    // Get best performing player
    getBestPlayer() {
        const players = this.getPlayers();
        return players.reduce((best, current) => 
            (current.totalPoints || 0) > (best.totalPoints || 0) ? current : best,
            { totalPoints: 0 }
        );
    }

    // Get recent matches (last 5)
    getRecentMatches() {
        return this.getResults().slice(-5);
    }

    // Get player performance by gameweek
    getPlayerPerformanceByGameweek() {
        const results = this.getResults();
        const performanceData = {};
        
        results.forEach(result => {
            if (result.playerScores) {
                Object.keys(result.playerScores).forEach(playerKey => {
                    if (!performanceData[playerKey]) {
                        performanceData[playerKey] = [];
                    }
                    performanceData[playerKey].push({
                        gameweek: result.gameweek,
                        points: result.playerScores[playerKey],
                        result: result.result,
                        date: result.date
                    });
                });
            }
        });
        
        return performanceData;
    }

    // Get team performance trends
    getPerformanceTrends() {
        const results = this.getResults();
        const trends = {
            recentForm: [],
            monthlyAverage: {},
            streaks: { current: 0, longest: 0, type: null }
        };
        
        // Recent form (last 5 matches)
        trends.recentForm = results.slice(-5).map(r => r.result);
        
        // Calculate current streak
        let currentStreak = 0;
        let streakType = null;
        
        for (let i = results.length - 1; i >= 0; i--) {
            if (streakType === null) {
                streakType = results[i].result;
                currentStreak = 1;
            } else if (results[i].result === streakType) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        trends.streaks.current = currentStreak;
        trends.streaks.type = streakType;
        
        return trends;
    }

    // Get detailed season statistics
    getDetailedSeasonStats() {
        const results = this.getResults();
        const players = this.getPlayers();
        
        // Home vs Away performance (mock data - could be enhanced)
        const homeMatches = Math.floor(results.length / 2);
        const awayMatches = results.length - homeMatches;
        
        // Goals scored and conceded
        const totalGoalsFor = results.reduce((sum, r) => sum + (r.ourScore || 0), 0);
        const totalGoalsAgainst = results.reduce((sum, r) => sum + (r.opponentScore || 0), 0);
        
        // Clean sheets
        const cleanSheets = results.filter(r => (r.opponentScore || 0) === 0).length;
        
        return {
            ...this.getTeamStats(),
            homeMatches,
            awayMatches,
            totalGoalsFor,
            totalGoalsAgainst,
            goalDifference: totalGoalsFor - totalGoalsAgainst,
            cleanSheets,
            averageGoalsFor: results.length > 0 ? (totalGoalsFor / results.length).toFixed(1) : 0,
            averageGoalsAgainst: results.length > 0 ? (totalGoalsAgainst / results.length).toFixed(1) : 0
        };
    }

    // Delete a match result
    deleteMatchResult(gameweek) {
        const results = this.getResults();
        const filteredResults = results.filter(r => r.gameweek !== gameweek);
        this.saveResults(filteredResults);
        this.updatePlayerTotals();
    }

    // Clear all data
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.playersKey);
        this.initializeData();
    }

    // Export data as JSON
    exportData() {
        return {
            results: this.getResults(),
            players: this.getPlayers(),
            stats: this.getTeamStats()
        };
    }

    // Import data from JSON
    importData(data) {
        if (data.results) {
            this.saveResults(data.results);
        }
        if (data.players) {
            this.savePlayers(data.players);
        }
    }
}

// Initialize database
const db = new SimpleDatabase();

// Make database available globally
window.db = db;

// Database functions
class DatabaseManager {
    constructor() {
        this.isConnected = false;
        this.fixtures = [];
        this.players = [];
    }

    // Initialize database connection
    async connect() {
        try {
            // Initialize Firebase here
            this.isConnected = true;
            console.log('Database connected successfully');
            return true;
        } catch (error) {
            console.error('Database connection failed:', error);
            return false;
        }
    }

    // Add new fixture result
    async addFixtureResult(gameweek, opponent, ourScore, opponentScore, playerScores) {
        try {
            // Determine result
            let result = 'DRAW';
            if (ourScore > opponentScore) result = 'WIN';
            else if (ourScore < opponentScore) result = 'LOSS';

            const fixtureData = {
                gw: gameweek,
                opponent: opponent,
                ourScore: ourScore,
                opponentScore: opponentScore,
                result: result,
                status: 'completed',
                date: new Date().toISOString(),
                playerScores: playerScores, // Individual player scores
                timestamp: new Date()
            };

            // Add to Firestore
            // const docRef = await addDoc(collection(db, 'fixtures'), fixtureData);
            
            // For now, update local data
            this.updateLocalFixture(gameweek, fixtureData);
            
            console.log('Fixture result added successfully');
            return true;
        } catch (error) {
            console.error('Error adding fixture result:', error);
            return false;
        }
    }

    // Update player stats
    async updatePlayerStats(playerId, stats) {
        try {
            const playerData = {
                totalPoints: stats.totalPoints,
                ranking: stats.ranking,
                lastUpdated: new Date()
            };

            // Update in Firestore
            // await updateDoc(doc(db, 'players', playerId), playerData);
            
            console.log('Player stats updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating player stats:', error);
            return false;
        }
    }

    // Listen for real-time updates
    subscribeToUpdates() {
        // Real-time listener for fixtures
        // const q = query(collection(db, 'fixtures'), orderBy('gw'));
        // onSnapshot(q, (querySnapshot) => {
        //     const fixtures = [];
        //     querySnapshot.forEach((doc) => {
        //         fixtures.push({ id: doc.id, ...doc.data() });
        //     });
        //     this.handleFixtureUpdates(fixtures);
        // });
    }

    // Handle fixture updates from database
    handleFixtureUpdates(fixtures) {
        // Update local fixturesData
        fixtures.forEach(fixture => {
            const index = fixturesData.findIndex(f => f.gw === fixture.gw);
            if (index !== -1) {
                fixturesData[index] = {
                    ...fixturesData[index],
                    ...fixture
                };
            }
        });

        // Refresh UI
        initializeTeamStats();
        renderFixtures(fixturesData);
        renderResults();
        initializeChart();
    }

    // Update local fixture data (fallback)
    updateLocalFixture(gameweek, data) {
        const fixture = fixturesData.find(f => f.gw === gameweek);
        if (fixture) {
            Object.assign(fixture, data);
        }
    }

    // Batch update multiple fixtures
    async batchUpdateFixtures(fixtures) {
        try {
            for (const fixture of fixtures) {
                await this.addFixtureResult(
                    fixture.gw,
                    fixture.opponent,
                    fixture.ourScore,
                    fixture.opponentScore,
                    fixture.playerScores
                );
            }
            return true;
        } catch (error) {
            console.error('Batch update failed:', error);
            return false;
        }
    }

    // Get team statistics
    async getTeamStats() {
        try {
            // Fetch from database or calculate from fixtures
            const completedFixtures = fixturesData.filter(f => f.status === 'completed');
            
            return {
                matchesPlayed: completedFixtures.length,
                wins: completedFixtures.filter(f => f.ourScore > f.opponentScore).length,
                draws: completedFixtures.filter(f => f.ourScore === f.opponentScore).length,
                losses: completedFixtures.filter(f => f.ourScore < f.opponentScore).length,
                totalPoints: completedFixtures.reduce((sum, f) => sum + f.ourScore, 0),
                averageScore: completedFixtures.length > 0 ? 
                    (completedFixtures.reduce((sum, f) => sum + f.ourScore, 0) / completedFixtures.length).toFixed(1) : 0,
                highestScore: completedFixtures.length > 0 ? 
                    Math.max(...completedFixtures.map(f => f.ourScore)) : 0
            };
        } catch (error) {
            console.error('Error getting team stats:', error);
            return null;
        }
    }
}

// Create database instance
const dbManager = new DatabaseManager();

// Admin functions for updating data
class AdminPanel {
    constructor(dbManager) {
        this.db = dbManager;
    }

    // Create admin interface
    createAdminInterface() {
        const adminHTML = `
            <div id="admin-panel" style="position: fixed; top: 10px; right: 10px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); z-index: 1000; display: none;">
                <h3>Admin Panel</h3>
                <div>
                    <label>Gameweek:</label>
                    <select id="admin-gw">
                        ${Array.from({length: 22}, (_, i) => `<option value="${i+1}">GW ${i+1}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label>Our Score:</label>
                    <input type="number" id="admin-our-score" placeholder="0">
                </div>
                <div>
                    <label>Opponent Score:</label>
                    <input type="number" id="admin-opp-score" placeholder="0">
                </div>
                <div>
                    <h4>Player Scores:</h4>
                    <input type="number" id="player-1-score" placeholder="Haitam Score">
                    <input type="number" id="player-2-score" placeholder="Ahmed Score">
                    <input type="number" id="player-3-score" placeholder="Zakaria Score">
                    <input type="number" id="player-4-score" placeholder="Aymane Score">
                </div>
                <button onclick="adminPanel.submitResult()" style="background: #dc2626; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px;">Update Result</button>
                <button onclick="adminPanel.togglePanel()" style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px;">Close</button>
            </div>
            <button id="admin-toggle" onclick="adminPanel.togglePanel()" style="position: fixed; top: 10px; right: 10px; background: #1a4d3a; color: white; border: none; padding: 10px 15px; border-radius: 5px; z-index: 999;">Admin</button>
        `;

        document.body.insertAdjacentHTML('beforeend', adminHTML);
    }

    // Toggle admin panel
    togglePanel() {
        const panel = document.getElementById('admin-panel');
        const toggle = document.getElementById('admin-toggle');
        
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            toggle.style.display = 'none';
        } else {
            panel.style.display = 'none';
            toggle.style.display = 'block';
        }
    }

    // Submit result
    async submitResult() {
        const gw = parseInt(document.getElementById('admin-gw').value);
        const ourScore = parseInt(document.getElementById('admin-our-score').value);
        const oppScore = parseInt(document.getElementById('admin-opp-score').value);
        
        const playerScores = {
            haitam: parseInt(document.getElementById('player-1-score').value) || 0,
            ahmed: parseInt(document.getElementById('player-2-score').value) || 0,
            zakaria: parseInt(document.getElementById('player-3-score').value) || 0,
            aymane: parseInt(document.getElementById('player-4-score').value) || 0
        };

        // Validate total
        const totalPlayerScore = Object.values(playerScores).reduce((sum, score) => sum + score, 0);
        if (totalPlayerScore !== ourScore) {
            alert(`Warning: Individual player scores (${totalPlayerScore}) don't match team total (${ourScore})`);
        }

        // Get opponent name
        const fixture = fixturesData.find(f => f.gw === gw);
        if (!fixture) {
            alert('Invalid gameweek');
            return;
        }

        try {
            await this.db.addFixtureResult(gw, fixture.opponent, ourScore, oppScore, playerScores);
            
            // Update local data immediately
            updateFixtureResult(gw, ourScore, oppScore);
            
            // Update player stats
            this.updatePlayerTotals(playerScores);
            
            alert('Result updated successfully!');
            this.clearForm();
            
        } catch (error) {
            alert('Error updating result: ' + error.message);
        }
    }

    // Update player total points
    updatePlayerTotals(newScores) {
        playersData[0].totalPoints += newScores.haitam;
        playersData[1].totalPoints += newScores.ahmed;
        playersData[2].totalPoints += newScores.zakaria;
        playersData[3].totalPoints += newScores.aymane;
        
        // Re-render players
        renderPlayers(playersData);
    }

    // Clear form
    clearForm() {
        document.getElementById('admin-our-score').value = '';
        document.getElementById('admin-opp-score').value = '';
        document.getElementById('player-1-score').value = '';
        document.getElementById('player-2-score').value = '';
        document.getElementById('player-3-score').value = '';
        document.getElementById('player-4-score').value = '';
    }
}

// Initialize admin panel
const adminPanel = new AdminPanel(dbManager);

// Initialize database when page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Connect to database
    await dbManager.connect();
    
    // Subscribe to real-time updates
    dbManager.subscribeToUpdates();
    
    // Create admin interface
    adminPanel.createAdminInterface();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DatabaseManager, AdminPanel };
}
