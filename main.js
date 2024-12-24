import { createGrid } from './grid.js';
    import { Game } from './game.js';

    const gameContainer = document.getElementById('game-container');
    const grid = createGrid(gameContainer);

    // Initialiser le jeu
    const tetrisGame = new Game(grid);

    // Ajouter des écouteurs d'événements pour les déplacements et la rotation
    document.addEventListener('keydown', (event) => {
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
    });
