// Select necessary elements
const mixArea = document.getElementById('mixArea');
const modelLips = document.getElementById('lipsOverlay');
const saveButton = document.getElementById('saveColor');
const resetButton = document.getElementById('resetMix');
const savedColorsContainer = document.getElementById('savedColors');

let mixedColor = "white"; // Default starting color

// Make colors draggable
document.querySelectorAll('.color').forEach(colorDiv => {
    colorDiv.setAttribute("draggable", "true"); // Enable dragging
    colorDiv.addEventListener('dragstart', event => {
        event.dataTransfer.setData('color', colorDiv.dataset.color);
    });
});

// Allow colors to be dropped into the mix area
mixArea.addEventListener('dragover', event => event.preventDefault());

mixArea.addEventListener('drop', event => {
    event.preventDefault();
    const droppedColor = event.dataTransfer.getData('color');
    mixedColor = mixColors(mixedColor, droppedColor);
    mixArea.style.backgroundColor = mixedColor;
});

// Apply mixed color to model's lips
mixArea.addEventListener('click', () => {
    modelLips.style.backgroundColor = mixedColor;
});

// Save color to collection
saveButton.addEventListener('click', () => {
    const savedColorDiv = document.createElement('div');
    savedColorDiv.style.backgroundColor = mixedColor;
    savedColorDiv.classList.add("saved-color");
    savedColorsContainer.appendChild(savedColorDiv);
});

// Reset the mix area and lips color
resetButton.addEventListener('click', () => {
    mixedColor = "white";
    mixArea.style.backgroundColor = "white";
    modelLips.style.backgroundColor = "transparent";
});

// Function to mix two colors (simple RGB blending)
function mixColors(color1, color2) {
    const colors = {
        red: [255, 0, 0], pink: [255, 192, 203], coral: [255, 127, 80], plum: [221, 160, 221],
        orange: [255, 165, 0], brown: [165, 42, 42], fuchsia: [255, 0, 255], gold: [255, 215, 0],
        navy: [0, 0, 128], teal: [0, 128, 128]
    };

    const c1 = colors[color1] || [255, 255, 255]; // Default to white
    const c2 = colors[color2] || [255, 255, 255];

    const mixed = [
        Math.round((c1[0] + c2[0]) / 2),
        Math.round((c1[1] + c2[1]) / 2),
        Math.round((c1[2] + c2[2]) / 2)
    ];

    return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
}
