import { createGrid } from './grid.js';
    import { Game } from './game.js';

    const gameContainer = document.getElementById('game-container');
    const grid = createGrid(gameContainer);
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const pauseButton = document.getElementById('pause-button');

    // Initialiser le jeu
    const tetrisGame = new Game(grid, scoreElement, levelElement);

    // Ajouter des écouteurs d'événements pour les déplacements et la rotation
    document.addEventListener('keydown', (event) => {
      if (!tetrisGame.isPaused) {
        switch (event.key) {
          case 'ArrowLeft':
            tetrisGame.moveLeft();
            break;
          case 'ArrowRight':
            tetrisGame.moveRight();
            break;
          case 'ArrowDown':
            tetrisGame.moveDown();
            break;
          case 'ArrowUp':
            tetrisGame.rotate();
            break;
        }
      }
    });

    // Ajouter un écouteur d'événements pour le bouton de pause/redémarrage
    pauseButton.addEventListener('click', () => {
      tetrisGame.togglePause();
      if (tetrisGame.isPaused) {
        pauseButton.textContent = 'Redémarrage';
      } else {
        pauseButton.textContent = 'Pause';
      }
    });
