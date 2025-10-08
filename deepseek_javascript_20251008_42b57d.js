// Share scores with bot
Telegram.WebApp.sendData(JSON.stringify({
    type: 'highScore',
    score: gameState.coins
}));