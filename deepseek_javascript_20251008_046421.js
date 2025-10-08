// Save to Telegram cloud
Telegram.WebApp.CloudStorage.setItem('gameSave', JSON.stringify(gameState));

// Load from Telegram cloud
Telegram.WebApp.CloudStorage.getItem('gameSave', (error, value) => {
    if (!error && value) {
        gameState = JSON.parse(value);
    }
});