window.addEventListener('load', function () {
    var image = document.getElementById("image");
    var images = ["borrelplank.png", "uitsmijter.png", "ijs.png", "cocktail.png", "kind.png", "wereldbol.png"]
    var index = 0;

    function nextImage() {
        if (++index >= images.length) index = 0;
        image.src = "img/"+images[index];
    }

    setInterval(nextImage, 2000);
});
