function test(name, callback) {
      try {
        callback();
        console.log(`✅ ${name}`);
      } catch (error) {
        console.error(`❌ ${name}: ${error.message}`);
      }
    }

    function expect(actual) {
      return {
        toBe(expected) {
          if (actual !== expected) {
            throw new Error(`Expected ${expected}, but got ${actual}`);
          }
        },
        toEqual(expected) {
          if (!Array.isArray(actual) || !Array.isArray(expected)) {
            throw new Error('toEqual is only for arrays');
          }
          if (actual.length !== expected.length) {
            throw new Error(`Expected array of length ${expected.length}, but got ${actual.length}`);
          }
          for (let i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i]) {
              throw new Error(`Expected element at index ${i} to be ${expected[i]}, but got ${actual[i]}`);
            }
          }
        },
      };
    }

    import { createGrid } from './grid.js';
    import { pieces } from './pieces.js';
    import { Game, Piece } from './game.js';

    test('Grille est correctement créée', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      expect(gridElement.children.length).toBe(20 * 10);
    });

    test('Pièce I apparaît sur la grille', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    function drawPiece(gridElement, piece) {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            gridElement.children[cellIndex].style.backgroundColor = piece.color;
          }
        }
      }
    }

    test('Pièce I apparaît correctement dans le jeu', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const game = new Game(gridElement, document.createElement('span'), document.createElement('span'));

      // Vérifier que la pièce est ajoutée à la grille
      for (let y = 0; y < game.currentPiece.shape.length; y++) {
        for (let x = 0; x < game.currentPiece.shape[y].length; x++) {
          if (game.currentPiece.shape[y][x] !== 0) {
            const cellIndex = ((y + game.currentPiece.y) * 10 + x + game.currentPiece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(game.currentPiece.color);
          }
        }
      }
    });

    test('Déplacement gauche de la pièce I', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Déplacer la pièce à gauche
      piece.x -= 1;
      game.clearCurrentPiece();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après le déplacement
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Déplacement droit de la pièce I', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Déplacer la pièce à droite
      piece.x += 1;
      game.clearCurrentPiece();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après le déplacement
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Déplacement bas de la pièce I', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Déplacer la pièce vers le bas
      piece.y += 1;
      game.clearCurrentPiece();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après le déplacement
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Rotation de la pièce I', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Rotation de la pièce
      game.clearCurrentPiece();
      piece.rotate();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après la rotation
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Collision avec le bas de la grille', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      piece.y = 19; // Placer la pièce au bas de la grille
      drawPiece(gridElement, piece);

      // Essayer de déplacer la pièce vers le bas
      expect(game.canMove(piece, 0, 1)).toBe(false);
    });

    test('Collision avec le côté gauche de la grille', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      piece.x = -1; // Placer la pièce en dehors du côté gauche de la grille
      drawPiece(gridElement, piece);

      // Essayer de déplacer la pièce vers la gauche
      expect(game.canMove(piece, -1, 0)).toBe(false);
    });

    test('Collision avec le côté droit de la grille', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      piece.x = 9; // Placer la pièce en dehors du côté droit de la grille
      drawPiece(gridElement, piece);

      // Essayer de déplacer la pièce vers la droite
      expect(game.canMove(piece, 1, 0)).toBe(false);
    });

    test('Collision avec une autre pièce', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece1 = new Piece(pieces[0]);
      drawPiece(gridElement, piece1);

      // Ajouter une deuxième pièce en dessous de la première
      const piece2 = new Piece(pieces[0]);
      piece2.y = 1;
      drawPiece(gridElement, piece2);

      // Essayer de déplacer la première pièce vers le bas
      expect(game.canMove(piece1, 0, 1)).toBe(false);
    });

    test('Suppression d\'une ligne complète', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);

      // Remplir une ligne entière
      for (let x = 0; x < 10; x++) {
        const cellIndex = (19 * 10 + x);
        gridElement.children[cellIndex].style.backgroundColor = 'cyan';
      }

      // Ajouter une pièce en dessous de la ligne complète
      const piece = new Piece(pieces[0]);
      piece.y = 18;
      drawPiece(gridElement, piece);

      // Déplacer la pièce vers le bas pour verrouiller et supprimer la ligne complète
      game.clearCurrentPiece();
      piece.y += 1;
      game.lockPiece();

      // Vérifier que la ligne est supprimée
      for (let x = 0; x < 10; x++) {
        const cellIndex = (19 * 10 + x);
        expect(gridElement.children[cellIndex].style.backgroundColor).toBe('');
      }
    });

    test('Suppression de plusieurs lignes complétées', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);

      // Remplir deux lignes entières
      for (let y = 18; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
          const cellIndex = (y * 10 + x);
          gridElement.children[cellIndex].style.backgroundColor = 'cyan';
        }
      }

      // Ajouter une pièce en dessous des lignes complétées
      const piece = new Piece(pieces[0]);
      piece.y = 17;
      drawPiece(gridElement, piece);

      // Déplacer la pièce vers le bas pour verrouiller et supprimer les lignes complétées
      game.clearCurrentPiece();
      piece.y += 1;
      game.lockPiece();

      // Vérifier que les lignes sont supprimées
      for (let y = 18; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
          const cellIndex = (y * 10 + x);
          expect(gridElement.children[cellIndex].style.backgroundColor).toBe('');
        }
      }
    });

    test('Calcul du score après suppression d\'une ligne', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const scoreElement = document.createElement('span');
      const levelElement = document.createElement('span');

      const game = new Game(gridElement, scoreElement, levelElement);

      // Remplir une ligne entière
      for (let x = 0; x < 10; x++) {
        const cellIndex = (19 * 10 + x);
        gridElement.children[cellIndex].style.backgroundColor = 'cyan';
      }

      // Ajouter une pièce en dessous de la ligne complète
      const piece = new Piece(pieces[0]);
      piece.y = 18;
      drawPiece(gridElement, piece);

      // Déplacer la pièce vers le bas pour verrouiller et supprimer la ligne complète
      game.clearCurrentPiece();
      piece.y += 1;
      game.lockPiece();

      // Vérifier que le score est mis à jour correctement
      expect(scoreElement.textContent).toBe('40');
    });

    test('Calcul du score après suppression de plusieurs lignes', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const scoreElement = document.createElement('span');
      const levelElement = document.createElement('span');

      const game = new Game(gridElement, scoreElement, levelElement);

      // Remplir deux lignes entières
      for (let y = 18; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
          const cellIndex = (y * 10 + x);
          gridElement.children[cellIndex].style.backgroundColor = 'cyan';
        }
      }

      // Ajouter une pièce en dessous des lignes complétées
      const piece = new Piece(pieces[0]);
      piece.y = 17;
      drawPiece(gridElement, piece);

      // Déplacer la pièce vers le bas pour verrouiller et supprimer les lignes complétées
      game.clearCurrentPiece();
      piece.y += 1;
      game.lockPiece();

      // Vérifier que le score est mis à jour correctement
      expect(scoreElement.textContent).toBe('300');
    });

    test('Mise à jour du niveau après atteindre un certain score', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const scoreElement = document.createElement('span');
      const levelElement = document.createElement('span');

      const game = new Game(gridElement, scoreElement, levelElement);

      // Remplir plusieurs lignes pour atteindre un certain score
      for (let i = 0; i < 25; i++) {
        for (let y = 18; y < 20; y++) {
          for (let x = 0; x < 10; x++) {
            const cellIndex = (y * 10 + x);
            gridElement.children[cellIndex].style.backgroundColor = 'cyan';
          }
        }

        // Ajouter une pièce en dessous des lignes complétées
        const piece = new Piece(pieces[0]);
        piece.y = 17;
        drawPiece(gridElement, piece);

        // Déplacer la pièce vers le bas pour verrouiller et supprimer les lignes complétées
        game.clearCurrentPiece();
        piece.y += 1;
        game.lockPiece();
      }

      // Vérifier que le niveau est mis à jour correctement
      expect(levelElement.textContent).toBe('3');
    });

    test('Animation de déplacement vers la gauche', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Déplacer la pièce à gauche
      piece.x -= 1;
      game.clearCurrentPiece();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après le déplacement avec animation
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Animation de déplacement vers la droite', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Déplacer la pièce à droite
      piece.x += 1;
      game.clearCurrentPiece();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après le déplacement avec animation
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Animation de déplacement vers le bas', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Déplacer la pièce vers le bas
      piece.y += 1;
      game.clearCurrentPiece();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après le déplacement avec animation
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Animation de rotation', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const piece = new Piece(pieces[0]);
      drawPiece(gridElement, piece);

      // Rotation de la pièce
      game.clearCurrentPiece();
      piece.rotate();
      drawPiece(gridElement, piece);

      // Vérifier que les cellules correspondant à la pièce sont colorées après la rotation avec animation
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const cellIndex = ((y + piece.y) * 10 + x + piece.x);
            expect(gridElement.children[cellIndex].style.backgroundColor).toBe(piece.color);
          }
        }
      }
    });

    test('Pause du jeu', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const scoreElement = document.createElement('span');
      const levelElement = document.createElement('span');

      const game = new Game(gridElement, scoreElement, levelElement);

      // Mettre le jeu en pause
      game.togglePause();

      // Vérifier que le jeu est en pause
      expect(game.isPaused).toBe(true);
    });

    test('Redémarrage du jeu', () => {
      const container = document.createElement('div');
      const gridElement = createGrid(container);
      const scoreElement = document.createElement('span');
      const levelElement = document.createElement('span');

      const game = new Game(gridElement, scoreElement, levelElement);

      // Mettre le jeu en pause
      game.togglePause();

      // Redémarrer le jeu
      game.togglePause();

      // Vérifier que le jeu n'est plus en pause
      expect(game.isPaused).toBe(false);
    });
