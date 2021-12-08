const KEY = `584c5aa84ce28241f9ddb9e73fa780f1`;
const searchButton = document.querySelector('.searchButton');

sizeNavigation.addEventListener('click', function(event){
    const eventTarget = event.target;

});

searchButton.addEventListener('click', function(){
    removeAllImg();
    message('söker...');
    const input = document.querySelector('.searchWord');
    const numberOfPicture = document.querySelector('.numberOfPicture');
    const pictureSize = document.querySelector('.size');
    searchPicture(input.value, numberOfPicture.value, pictureSize)
});

function searchPicture(){
    
}

function message(mess){
    const flexWrapper = document.querySelector('photoGallery');
    const messege = document.querySelector('.messege');
    messege.innerText = mess;
}

function removeAllImg(){
    const allImg = document.querySelectorAll('.photoGallery img');
    for(let i = 0; i<allImg.length; i++){
        allImg[i].remove();
    }
};