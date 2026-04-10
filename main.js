document.addEventListener("DOMContentLoaded", () => {

  const reload = document.getElementById('title');
  const grid_count = document.getElementById('grid_count');
  const grid_count_input = document.getElementById('grid_count_input');
  const randomize = document.getElementById('randomize');
  const biase = document.getElementById('biase');
  const biase_input = document.getElementById('biase_input');
  const biase_reset = document.getElementById('biase_reset');
  const play = document.getElementById('play');
  const stop = document.getElementById('stop');

  reload.addEventListener("click", (e) => {
    window.location.reload();
  });

  grid_count.addEventListener("input", (e) => {
    initLifeState(inputDom({ n: e.target.value, b: biase.value }));
  });
  grid_count_input.addEventListener("input", (e) => {
    initLifeState(inputDom({ n: e.target.value, b: biase.value }));
  });
  randomize.addEventListener("click", (e) => {
    initLifeState(inputDom({ n: grid_count.value, b: biase.value }));
  });

  biase.addEventListener("input", (e) => {
    initLifeState(inputDom({ n: grid_count.value, b: e.target.value }));
  });
  biase_input.addEventListener("input", (e) => {
    initLifeState(inputDom({ n: grid_count.value, b: e.target.value }));
  });
  biase_reset.addEventListener("click", (e) => {
    initLifeState(inputDom({ n: grid_count.value, b: 0.25 }));
  });

  let intervalId = null;
  play.addEventListener("click", () => {

    // STOP
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      play.textContent = "Play";
      setControlsDisabled(false);
      return;
    }

    // PLAY
    setControlsDisabled(true);
    intervalId = setInterval(() => {
      nextLifeState();
    }, 80);

    play.textContent = "Stop";
  });

  function inputDom({ n, b }) {
    n = Math.max(3, Number(n));
    b = Math.max(0, Number(b));
    grid_count.value = n;
    grid_count_input.value = n;
    biase.value = b;
    biase_input.value = b;
    return { n, b };
  }

  function setControlsDisabled(state) {
    grid_count.disabled = state;
    grid_count_input.disabled = state;
    randomize.disabled = state;
    biase.disabled = state;
    biase_input.disabled = state;
    biase_reset.disabled = state;
  }

  initLifeState(inputDom({ n: grid_count.value, b: biase.value }));
})