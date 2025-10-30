// Image data array
const imagesData = [
    { "id": 1, "name": "Der freche Flügelfreund", "url": "./img/bird-7233900_1280.jpg" },
    { "id": 2, "name": "Sakura im Frühlingstraum", "url": "./img/cherry-blossoms-7766587_1280.jpg" },
    { "id": 3, "name": "Horizont der Sehnsucht", "url": "./img/landscape-8722691_1280.jpg" },
    { "id": 4, "name": "Fluss der Ruhe", "url": "./img/river-7212351_1280.jpg" },
    { "id": 5, "name": "Grünes Geheimnis", "url": "./img/forest-3369950_1280.jpg" },
    { "id": 6, "name": "Wald des Morgenlichts", "url": "./img/forest-7406241_1280.jpg" },
    { "id": 7, "name": "Das Salzgebirge", "url": "./img/salt-moutain-2767408_1280.jpg" },
    { "id": 8, "name": "Wüste aus Feuer", "url": "./img/arizona-5032415_1280.jpg" },
    { "id": 9, "name": "Pfad ins Unbekannte", "url": "./img/pathway-2289978_1280.jpg" },
    { "id": 10, "name": "Sonnenglanz im Wald", "url": "./img/sunlight-3130638_1280.jpg" },
    { "id": 11, "name": "Abendrotpoesie", "url": "./img/sunset-4086848_1280.jpg" },
    { "id": 12, "name": "Wintergasse", "url": "./img/montestrutto-190471_1280.jpg" },
    { "id": 13, "name": "Träume über den Wolken", "url": "./img/airplane-1807486_1280.jpg" },
    { "id": 14, "name": "Wiesenglück", "url": "./img/grass-6545509_1280.jpg" },
    { "id": 15, "name": "Weiße Weite", "url": "./img/salt-3344508_1280.jpg" },
    { "id": 16, "name": "Die schläfrige Schafparade", "url": "./img/sheep-9401445_1280.webp" },
    { "id": 17, "name": "Winterzauberland", "url": "./img/winter-8612635_1280.jpg" },
    { "id": 18, "name": "Himmelsspiegel", "url": "./img/qinghai-2825151_1280.jpg" }
]

// Get references to DOM elements
const dialogRef = document.getElementById("myDialog");
const dialogImg = document.getElementById("dialogImg");
const Counter = document.getElementById("Counter");
const imgTitle = document.getElementById("imgtitle");
const next = document.getElementById("next");
const back = document.getElementById("back");

// Current index of the displayed image
let currentIndex = 0;

// Function to generate image grid
function myFunction() {
    const imageContainer = document.getElementById("image-div");
    imagesData.forEach((element, i) => {
        imageContainer.innerHTML += `
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 box">
      <img src="${element.url}" alt="${element.name}" class="image" data-index="${i}">
    </div>
  `;
    });
    const images = document.querySelectorAll("#image-div img");
    images.forEach(img => {
        img.addEventListener("click", (event) => {
            currentIndex = Number(event.target.getAttribute("data-index"));
            updateDialog();
            openDialog();
        });
    });
}
myFunction();

// Open dialog functions
function openDialog() {
    dialogRef.classList.add("opened");
    dialogRef.showModal();
    document.addEventListener("keydown", handleKeyDown);
}

// Close dialog with animation
function closeDialog() {
    dialogRef.classList.remove("opened");
    dialogRef.close();
}

// Update dialog content based on current index
function updateDialog() {
    const selectedImage = imagesData[currentIndex];
    dialogImg.src = selectedImage.url;
    dialogImg.alt = selectedImage.name;
    imgTitle.textContent = selectedImage.name;
    Counter.textContent = `${currentIndex + 1} / ${imagesData.length}`;
}

// Next button functionality
next.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= imagesData.length) {
        currentIndex = 0;
    }
    updateDialog();
});

// Back button functionality
back.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imagesData.length - 1;
    }
    updateDialog();
});

// Close dialog when clicking outside the image
dialogRef.addEventListener("click", (event) => {
    if (event.target === dialogRef) {
        closeDialog();
    }
});

// Keyboard navigation for dialog
function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
        currentIndex++;
        if (currentIndex >= imagesData.length) {
            currentIndex = 0;
        }
        updateDialog();
    } else if (event.key === "ArrowLeft") {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = imagesData.length - 1;
        }
        updateDialog();
    } else if (event.key === "Escape") {
        closeDialog();
    }
}
