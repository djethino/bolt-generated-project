import { pieces } from './pieces.js';

    export class Game {
      constructor(gridElement) {
        this.grid = gridElement;
        this.currentPiece = null;
        this.init();
      }

      init() {
        this.spawnPiece();
      }

      spawnPiece() {
        const randomIndex = Math.floor(Math.random() * pieces.length);
        this.currentPiece = new Piece(pieces[randomIndex]);
        if (!this.canMove(this.currentPiece, 0, 0)) {
          // Game over
          alert('Game Over!');
          return;
        }
        this.drawCurrentPiece();
      }

      drawCurrentPiece() {
        if (!this.currentPiece) return;

        for (let y = 0; y < this.currentPiece.shape.length; y++) {
          for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
            if (this.currentPiece.shape[y][x] !== 0) {
              const cellIndex = ((y + this.currentPiece.y) * 10 + x + this.currentPiece.x);
              this.grid.children[cellIndex].style.backgroundColor = this.currentPiece.color;
            }
          }
        }
      }

      moveLeft() {
        if (this.canMove(this.currentPiece, -1, 0)) {
          this.clearCurrentPiece();
          this.currentPiece.x -= 1;
          this.drawCurrentPiece();
        }
      }

      moveRight() {
        if (this.canMove(this.currentPiece, 1, 0)) {
          this.clearCurrentPiece();
          this.currentPiece.x += 1;
          this.drawCurrentPiece();
        }
      }

      moveDown() {
        if (this.canMove(this.currentPiece, 0, 1)) {
          this.clearCurrentPiece();
          this.currentPiece.y += 1;
          this.drawCurrentPiece();
        } else {
          // Piece is at the bottom or collides with another piece
          this.lockPiece();
          this.spawnPiece(); // Spawn a new piece
        }
      }

      rotate() {
        if (this.canRotate(this.currentPiece)) {
          this.clearCurrentPiece();
          this.currentPiece.rotate();
          this.drawCurrentPiece();
        }
      }

      clearCurrentPiece() {
        if (!this.currentPiece) return;

        for (let y = 0; y < this.currentPiece.shape.length; y++) {
          for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
            if (this.currentPiece.shape[y][x] !== 0) {
              const cellIndex = ((y + this.currentPiece.y) * 10 + x + this.currentPiece.x);
              this.grid.children[cellIndex].style.backgroundColor = '';
            }
          }
        }
      }

      canMove(piece, offsetX, offsetY) {
        for (let y = 0; y < piece.shape.length; y++) {
          for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] !== 0) {
              const newX = x + piece.x + offsetX;
              const newY = y + piece.y + offsetY;

              // Check boundaries
              if (newX < 0 || newX >= 10 || newY >= 20) {
                return false;
              }

              // Check collision with other pieces
              const cellIndex = (newY * 10 + newX);
              if (this.grid.children[cellIndex].style.backgroundColor !== '') {
                return false;
              }
            }
          }
        }
        return true;
      }

      canRotate(piece) {
        const newShape = this.rotateMatrix(piece.shape);

        for (let y = 0; y < newShape.length; y++) {
          for (let x = 0; x < newShape[y].length; x++) {
            if (newShape[y][x] !== 0) {
              const newX = x + piece.x;
              const newY = y + piece.y;

              // Check boundaries
              if (newX < 0 || newX >= 10 || newY >= 20) {
                return false;
              }

              // Check collision with other pieces
              const cellIndex = (newY * 10 + newX);
              if (this.grid.children[cellIndex].style.backgroundColor !== '') {
                return false;
              }
            }
          }
        }
        return true;
      }

      rotateMatrix(matrix) {
        const N = matrix.length;
        const result = Array.from({ length: N }, () => Array(N).fill(0));

        for (let y = 0; y < N; y++) {
          for (let x = 0; x < N; x++) {
            result[x][N - 1 - y] = matrix[y][x];
          }
        }

        return result;
      }

      lockPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
          for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
            if (this.currentPiece.shape[y][x] !== 0) {
              const cellIndex = ((y + this.currentPiece.y) * 10 + x + this.currentPiece.x);
              this.grid.children[cellIndex].style.backgroundColor = this.currentPiece.color;
            }
          }
        }

        // Clear completed lines
        this.clearCompletedLines();
      }

      clearCompletedLines() {
        for (let y = 19; y >= 0; y--) {
          let isComplete = true;

          for (let x = 0; x < 10; x++) {
            const cellIndex = (y * 10 + x);
            if (this.grid.children[cellIndex].style.backgroundColor === '') {
              isComplete = false;
              break;
            }
          }

          if (isComplete) {
            // Remove the line
            for (let x = 0; x < 10; x++) {
              const cellIndex = (y * 10 + x);
              this.grid.children[cellIndex].style.backgroundColor = '';
            }

            // Move all lines above down by one
            for (let y2 = y - 1; y2 >= 0; y2--) {
              for (let x = 0; x < 10; x++) {
                const cellIndexAbove = (y2 * 10 + x);
                const cellIndexBelow = ((y2 + 1) * 10 + x);
                this.grid.children[cellIndexBelow].style.backgroundColor = this.grid.children[cellIndexAbove].style.backgroundColor;
              }
            }

            // Increment y to check the same line again
            y++;
          }
        }
      }
    }

    class Piece {
      constructor(data) {
        this.shape = data.shape;
        this.color = data.color;
        this.x = Math.floor((10 - this.shape[0].length) / 2); // Centrer la pièce horizontalement
        this.y = 0; // Commencer en haut de la grille
      }

      rotate() {
        this.shape = this.rotateMatrix(this.shape);
      }

      rotateMatrix(matrix) {
        const N = matrix.length;
        const result = Array.from({ length: N }, () => Array(N).fill(0));

        for (let y = 0; y < N; y++) {
          for (let x = 0; x < N; x++) {
            result[x][N - 1 - y] = matrix[y][x];
          }
        }

        return result;
      }
    }
