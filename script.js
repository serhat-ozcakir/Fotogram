// Get references to DOM elements
const dialogRef = document.getElementById("myDialog");
const dialogImg = document.getElementById("dialogImg");
const Counter = document.getElementById("Counter");
const imgTitle = document.getElementById("imgtitle");
const next = document.getElementById("next");
const back = document.getElementById("back");

let imagesData = [];
let currentIndex = 0;

// Open dialog functions
function openDialog() {
    dialogRef.classList.add("opened");
    dialogRef.showModal();
    document.addEventListener("keydown", handleKeyDown);
}

// Close dialog with animation
function closeDialog() {
   dialogRef.classList.remove("opened");
    setTimeout(() => dialogRef.close(), 300); 
       document.addEventListener("keydown", handleKeyDown);
}

// Update dialog content based on current index
function updateDialog() {
    const selectedImage = imagesData[currentIndex];
    dialogImg.src = selectedImage.url;
    dialogImg.alt = selectedImage.name;
    imgTitle.textContent = selectedImage.name;
    Counter.textContent = `${currentIndex + 1} / ${imagesData.length}`;
}

// Fetch image data from JSON file and populate the gallery
function myFunction() {
    fetch("./image.json")
        .then(response => response.json())
        .then(response => {
            imagesData = response;
            const imageContainer = document.getElementById("image-div");
            imageContainer.innerHTML = "";

            for (let i = 0; i < response.length; i++) {
                const element = response[i];
                console.log(element);
                imageContainer.innerHTML += `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 box">
                    <img src="${element.url}" alt="${element.name}"  class="image" data-index="${i}">
                </div>
                `;
            }
            const images = document.querySelectorAll("#image-div img");
            images.forEach(img => {
                img.addEventListener("click", (event) => {
                    currentIndex = Number(event.target.getAttribute("data-index"));
                    updateDialog();
                    openDialog();
                });
            });
        })
        .catch(error => console.error("Veri okunurken hata:", error));
}

// Next button just change index once per click
next.addEventListener("click", (event) => {
    event.preventDefault();
    currentIndex++;
    if (currentIndex >= imagesData.length) {
        currentIndex = 0;
    }
    updateDialog();
});

// Back button functionality
back.addEventListener("click", (event) => {
    event.preventDefault();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imagesData.length - 1;
    }
    updateDialog();
});
myFunction();

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
        if(currentIndex >= imagesData.length) {
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