const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'DICVxEVzNoirw5xeKY4zyQBuskMd5uLXytoVaonJG-Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Helper Function
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Check if all images were loader
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Create Elements For links and photos, Add to DOM
displayPhotos = () =>{
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo)=>{
        // Create <a></a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from unsplash API
getPhotos = async () =>{
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos()
    } catch (error) {
        alert('server error')
    }
}

// Check to see if scrolling near botton of page
window.addEventListener('scroll', () =>{
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000) && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();