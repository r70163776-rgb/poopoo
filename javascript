// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 10, 5);
scene.add(directionalLight);

// Player setup
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 0.5;
scene.add(player);

// Ground
const groundGeometry = new THREE.PlaneGeometry(30, 200);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

camera.position.z = 5;
camera.position.y = 3;
camera.lookAt(player.position);

// Game variables
let obstacles = [];
let score = 0;
let gameOver = false;
let gameSpeed = 0.1;
let scoreElement = document.getElementById('score');
let gameOverScreen = document.getElementById('game-over');
let finalScoreElement = document.getElementById('final-score');
let restartButton = document.getElementById('restart-button');

// Obstacle Spawner
function spawnObstacle() {
    const obstacleGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White color
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    
    obstacle.position.x = (Math.random() - 0.5) * 10;
    obstacle.position.y = 0.75;
    obstacle.position.z = -50;
    
    obstacles.push(obstacle);
    scene.add(obstacle);
}

// Player Controls
document.addEventListener('keydown', (event) => {
    if (gameOver) return;
    
    if (event.key === 'a' || event.key === 'ArrowLeft') {
        if (player.position.x > -5) player.position.x -= 0.5;
    }
    if (event.key === 'd' || event.key === 'ArrowRight') {
        if (player.position.x < 5) player.position.x += 0.5;
    }
});

// Restart Game
restartButton.addEventListener('click', () => {
    location.reload(); // Simple way to restart
});

// Game Loop
function animate() {
    if (gameOver) return;

    requestAnimationFrame(animate);

    // Move obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.position.z += gameSpeed;

        // Collision detection
        const playerBox = new THREE.Box3().setFromObject(player);
        const obstacleBox = new THREE.Box3().setFromObject(obstacle);
        
        if (playerBox.intersectsBox(obstacleBox)) {
            gameOver = true;
            finalScoreElement.innerText = score;
            gameOverScreen.style.display = 'block';
        }
        
        // Remove old obstacles
        if (obstacle.position.z > 5) {
            scene.remove(obstacle);
            obstacles.splice(index, 1);
            score++;
            scoreElement.innerText = score;
            // Increase speed with score
            if (score % 10 === 0) {
                gameSpeed += 0.01;
            }
        }
    });

    renderer.render(scene, camera);
}

// Start game
setInterval(spawnObstacle, 1500); // Spawn a new obstacle every 1.5 seconds
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
