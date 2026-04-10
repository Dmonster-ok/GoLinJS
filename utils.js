let LIFE = [];
function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

function initLifeState({ n, b }) {
  LIFE = [];
  for (let x = 0; x < n; x++) {
    LIFE[x] = []
    for (let y = 0; y < n; y++) {
      const isAlive = Math.random() < b;
      LIFE[x][y] = isAlive;
    }
  }
  renderer(n, LIFE);
  countNbors(0, 0);
}

function countNbors(xpos, ypos) {
  let alive_nbors = 0;
  const n = LIFE.length;
  for (let x = xpos - 1; x <= xpos + 1; x++) {
    for (let y = ypos - 1; y <= ypos + 1; y++) {
      if (x == xpos && y == ypos) {
        continue;
      }

      if (x >= 0 && x < n && y >= 0 && y < n) {
        if (LIFE[x][y]) {
          ++alive_nbors;
        }
      }
    }
  }

  return alive_nbors;
}

function nextLifeState() {
  let nextLIFE = [];
  const n = LIFE.length;
  for (let x = 0; x < n; x++) {
    nextLIFE[x] = [];
    for (let y = 0; y < n; y++) {
      let nbors = countNbors(x, y);
      if (LIFE[x][y]) {
        if (nbors < 2 || nbors > 3) {
          changeState(x, y, false);
          nextLIFE[x][y] = false;
        } else {
          changeState(x, y, true);
          nextLIFE[x][y] = true;
        }
      } else {
        if (nbors == 3) {
          changeState(x, y, true);
          nextLIFE[x][y] = true;
        } else {
          changeState(x, y, false);
          nextLIFE[x][y] = false;
        }
      }
    }
  }
  LIFE = nextLIFE;
}

function changeState(x, y, s) {
  const cell = document.getElementById(`C-${x}-${y}`);

  cell.classList.toggle("alive", s);
  cell.classList.toggle("dead", !s);
}

function renderer(n, state) {

  const grid = document.getElementById('grid');

  grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;

  const gap = mapRange(n, 3, 100, 8, 2);
  const width = mapRange(n, 3, 100, 70, 85);
  grid.style.gap = `${gap}px`;
  grid.style.width = `${width}%`;

  let cells = "";
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      let cls = state[x][y] ? 'alive' : 'dead';
      cells += `<div id="C-${x}-${y}" class="cell ${cls}"></div>`;
    }
  }
  grid.innerHTML = cells;
}