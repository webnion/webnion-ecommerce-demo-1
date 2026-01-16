const gridSection = document.getElementById('productsGrid');
const listSection = document.getElementById('productsList');

const gridBtn = document.getElementById('gridBtn');
const listBtn =  document.getElementById('listBtn');



function showGrid() {
  gridSection.classList.remove('hidden');
  listSection.classList.add('hidden');

  // active grid
  gridBtn.classList.add('text-primary');
  gridBtn.classList.remove('text-slate-400');

  // inactive list
  listBtn.classList.remove('text-primary');
  listBtn.classList.add('text-slate-400');
}

function showList() {
  gridSection.classList.add('hidden');
  listSection.classList.remove('hidden');

  // active list
  listBtn.classList.add('text-primary');
  listBtn.classList.remove('text-slate-400');

  // inactive grid
  gridBtn.classList.remove('text-primary');
  gridBtn.classList.add('text-slate-400');
}



  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const rangeFill = document.getElementById("rangeFill");
  const minLabel = document.getElementById("minLabel");
  const maxLabel = document.getElementById("maxLabel");

  // Match your existing colors (bg-primary + border-white / dark:border-slate-900)
  // We set these as CSS variables once; your Tailwind colors stay the same visually.
  // If your primary color is different, replace only the hex values below.
  document.documentElement.style.setProperty("--thumb-bg", getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary") || "#4f46e5"); // fallback if no css var
  // Border stays white in light mode; in dark you already use dark:border-slate-900
  // We'll keep white; dark mode still looks correct due to your background
  document.documentElement.style.setProperty("--thumb-border", "#ffffff");

  const min = Number(minRange.min);
  const max = Number(minRange.max);

  function percent(val) {
    return ((val - min) / (max - min)) * 100;
  }

  function update() {
    let minVal = Number(minRange.value);
    let maxVal = Number(maxRange.value);

    // Prevent crossing
    if (minVal > maxVal) {
      const temp = minVal;
      minVal = maxVal;
      maxVal = temp;
    }

    minRange.value = minVal;
    maxRange.value = maxVal;

    const left = percent(minVal);
    const right = 100 - percent(maxVal);

    rangeFill.style.left = left + "%";
    rangeFill.style.right = right + "%";

    minLabel.textContent = `Min Price: $${minVal}`;
    maxLabel.textContent = `Max Price: $${maxVal}`;
  }

  minRange.addEventListener("input", update);
  maxRange.addEventListener("input", update);

  // Init
  update();