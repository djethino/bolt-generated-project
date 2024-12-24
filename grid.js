export function createGrid(container) {
      const gridElement = document.createElement('div');
      gridElement.style.display = 'grid';
      gridElement.style.gridTemplateColumns = 'repeat(10, 30px)';
      gridElement.style.gridTemplateRows = 'repeat(20, 30px)';

      for (let i = 0; i < 20 * 10; i++) {
        const cell = document.createElement('div');
        cell.style.width = '30px';
        cell.style.height = '30px';
        cell.style.border = '1px solid #ccc';
        gridElement.appendChild(cell);
      }

      container.appendChild(gridElement);
      return gridElement;
    }
