//Kallar på alla variabler från domen
const searchButton = document.querySelector('.search');
let sizeNavigation = document.querySelector('.sizeNavigation');
let caruselInner = document.querySelector('.carousel-inner');
const animationDiv =  document.querySelector('#animationDiv');
animationDiv.style.display = 'none';

const chosenSizeText = document.querySelector('.chosenSize');
let chosenSize = 'm';
//Skapar animationen som ska pågå under sökningen
let loadingAnimation = anime({
    targets: '#animationDiv',
    translateY: [
        {value: 150, duration:500},
        {value: 0, duration:800}
    ],
    left: '240px',
    backgroundColor: '#FFF',
    borderRadius: ['0%', '50%'],
    easing: 'easeInOutQuad',
    loop: true,
});

//Bestämmer bilken storlek som ska väljas beroende på stavning på knapparna vid klick 
sizeNavigation.addEventListener('click', function(event){
    console.log(event);
    const eventTarget = event.target;
    console.log(eventTarget);
    if(eventTarget.tagName === 'BUTTON'){
        console.log(event.target.tagName);
        if(eventTarget.innerText === 'small'){
            chosenSize = 'm';
            chosenSizeText.innerText = 'Small';
        }
        else if(eventTarget.innerText === 'medium'){
            chosenSize = 'z';
            chosenSizeText.innerText = 'Medium';
        }
        else if(eventTarget.innerText === 'large'){
            chosenSize = 'b';
            chosenSizeText.innerText = 'Large';
        }
    }
});

//Vid tryck på sökknappen tas alla befintliga img taggar och carousel-items bort.
//Läser även av input value, hur många bilder som önskas visas och påbörjar animationen
searchButton.addEventListener('click', function(){
    const allCarouselItemElements = document.querySelectorAll('.carousel-item');
    const allImgElements = document.querySelectorAll('img');
    for(let i = 0; i<allImgElements.length; i++){
        const imgElement = allImgElements[i];
        const carouselItemElement = allCarouselItemElements[i];
        console.log('element', imgElement)
        imgElement.remove();
        carouselItemElement.remove();
    }
    const textInput = document.querySelector('input');
    const numberOfPicturesInput = document.querySelector('.numberOfPictures');
    searchPicture(textInput.value, numberOfPicturesInput.value, chosenSize);
    
    animationDiv.style.display = "inline-block";
});

function searchPicture(pictureWord, numberOfPictures){
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=584c5aa84ce28241f9ddb9e73fa780f1&text=${pictureWord}&format=json&nojsoncallback=1`;
    
    fetch(url).then(
        function(response){
            console.log(`Response: `, response);
            return response.json();
        }
    ).then(
        function(data){
            console.log(`Data: `, data);
            let availablePictures = data.photos.photo.length;
            if(numberOfPictures > availablePictures){
                numberOfPictures = availablePictures;
                alert(`Endast ${numberOfPictures} bilder tillgängliga`)
            }
            
            displayPictures(data, numberOfPictures);
        }
    ).catch(
        function(error){
            console.log(error);
            alert('Något gick fel, testa igen');
            animationDiv.style.display = "none";
        }
    )
}

function displayPictures(pictureArray, numberOfPictures){
    console.log('caruselItem', numberOfPictures);
    animationDiv.style.display = 'none';
    
    for(let i = 0; i<numberOfPictures; i++){
        let photo = pictureArray.photos.photo[i];
        let itemDiv = document.createElement('div');
        caruselInner.appendChild(itemDiv);
        let pic = document.createElement('img');
        if(i === 0){
            itemDiv.setAttribute('class', 'carousel-item active center-block');
        }
        else{
            itemDiv.setAttribute('class', 'carousel-item center-block');
        }

        itemDiv.appendChild(pic);

        pic.src=`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${chosenSize}.jpg`;
    };
};


