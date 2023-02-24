/*Menu dropdown*/
const hamburger = document.querySelector('.hamburger-menu');
hamburger.onclick = function () {
    let navBar = document.querySelector('.nav-menu');
    navBar.classList.toggle('active');
}

/*Countdown*/
const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minsEl = document.querySelector('#mins');
const secondsEl = document.querySelector('#seconds');

const newYears = '1 Jan 2024';

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minsEl.innerHTML = mins;
    secondsEl.innerHTML = seconds;
}

countdown();

setInterval(countdown, 1000);

/*
let textTag = document.querySelector('.content-box h3');
let text = textTag.innerText;
let div = document.querySelector('.box');

let splittedText = text.split('');
textTag.innerHTML = '';


for(let i = 0; i < splittedText.length; i++){
    if(splittedText[i] == " "){
        splittedText[i] = "&nbsp";
    }

    textTag.innerHTML += `<span>${splittedText[i]}</span>`;
}

let k = 0;
let interval = setInterval(() =>{
    let spans = textTag.querySelectorAll('span');
    let singleSpan = spans[k];
    
    
    singleSpan.className = 'fadeMove';
    k++;

    if(k === spans.length){
        clearInterval(interval);
    }
}, 70);*/



let borderLine = document.querySelector('.border-line');
let animationWidth = 0;

window.onscroll = () => {

    if (this.oldScroll > this.scrollY) {
        animationWidth -= 2.2;
    } else {
        animationWidth += 2.2;
    }

    if (animationWidth >= 100) {
        animationWidth = 100;
    } if (animationWidth <= 0) {
        animationWidth = 0;
    }

    borderLine.style.width = animationWidth + '%';
    this.oldScroll = this.scrollY;


    let sectionAnimation = document.querySelector('.third-page .images');
    let sectionPosition = sectionAnimation.getBoundingClientRect().top;
    let screenPosition = window.innerHeight;

    let leftImg = document.querySelector('.slideFromLeft');
    let rightImg = document.querySelector('.slideFromRight');

    if (sectionPosition < screenPosition) {
        leftImg.classList.add('animated');
        rightImg.classList.add('animated');
    }
}


/*!!!*/
let box = document.querySelectorAll('.box');

for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseenter', function () {
        (this.querySelectorAll('.icon')[0]).style.display = 'none';
        (this.querySelectorAll('#message')[0]).style.display = 'block';
    });

    box[i].addEventListener('mouseleave', function () {
        (this.querySelectorAll('.icon')[0]).style.display = 'block';
        (this.querySelectorAll('#message')[0]).style.display = 'none';
    });
}


/*Validacija forme*/
let inputs = document.querySelectorAll('input');
let errors = {
    "name_surname": [],
    "email": []
};

inputs.forEach((element) => {
    element.addEventListener('change', e => {
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

        if (inputValue.length > 4) {
            errors[inputName] = [];

            switch (inputName) {
                case "name_surname":
                    let validation = inputValue.trim();
                    validation = validation.split(" ");
                    if (validation.length < 2) {
                        errors[inputName].push('Moras napisati ime i prezime!');
                    }
                    break;

                case "email":
                    if (!validateEmail(inputValue)) {
                        errors[inputName].push('Neispravna Email adresa');
                    }
                    break;
            }
        } else {
            errors[inputName] = ['Polje ne moze da ima manje od 5 karaktera'];
        }
        populateErrors(errors);
    });
});

const populateErrors = ((errors) => {
    for (let elem of document.querySelectorAll('ul')) {
        elem.remove();
    }

    for (let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`);
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement);

        errors[key].forEach(error => {
            let li = document.createElement('li');
            li.innerText = error;

            errorsElement.appendChild(li);
        });
    }
});

const validateEmail = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

