  //////////////////////////////////////////
 ///////////////THEME TOGGLE///////////////
//////////////////////////////////////////
const theme = document.querySelector('.slide');
const body = document.querySelector('body');

theme.addEventListener('click', function() {
    if(body.classList.contains('theme-2')){
        body.classList.remove('theme-2');
        body.classList.add('theme-3');
    }else if(body.classList.contains('theme-3')) {
        body.classList.remove('theme-3');
    }else {
        body.classList.add('theme-2');
    }
})

  //////////////////////////////////////////
 /////////////calculator process///////////
//////////////////////////////////////////
const messages = document.querySelector('.msg-container');
const message1 = document.querySelector('.message-1-container');
const message2 = document.querySelector('.message-2-container');
const closemsg = document.querySelectorAll('.close');
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.num');
const opperators = document.querySelectorAll('.op');
const equal = document.querySelector('.equal');
const del = document.querySelector('.del');
const reset = document.querySelector('.reset');
var num1 = 0;
var num2 = 0;
var sign = '';
var newnum = false;

numbers.forEach(function(number) {
    number.addEventListener('click', function() {
        if(newnum){
            display.textContent = '';
            newnum = false;
        }

        let num = number.textContent ;
        
        if(display.textContent.length == 0) {
            if(number.textContent == '.') {
                num = '0.';
            }
        }
        num = display.textContent+num;
        if (num.length > 10) {
            display.style.transition = '0.3s ease-in';
            display.style.fontSize = 35+'%';
        }
        if(num.length > 15) {
            alertmessage(message1);
            num=display.textContent;
        }
        if(display.textContent.includes('.')){
            if(number.textContent == '.'){
                alertmessage(message2);
                num=display.textContent;
            }
        }
        
        display.textContent = num;
        
        
    })
})
opperators.forEach(function(opperator) {
    opperator.addEventListener('click', function() {
        newnum = true;
        if (num1 != 0) {
            num2 = parseFloat(display.textContent);
            display.textContent = calculator(num1, num2, sign);
            display.textContent = display.textContent.slice(0,15);
            num1 = parseFloat(display.textContent);
            screenRules();
        }else{
            num1 = parseFloat(display.textContent);
        }
        
        
        if (opperator.textContent =='+') {
            activeOpperator(opperator);
            sign = '+';
        }else if(opperator.textContent =='x') {
            activeOpperator(opperator);
            sign = '*';
        }else if(opperator.textContent =='-') {
            activeOpperator(opperator);
            sign = '-';
        }else if(opperator.textContent =='/') {
            activeOpperator(opperator);
            sign = '/';
        }
        
    })
})
equal.addEventListener('click', function() {
    
    num2 = parseFloat(display.textContent);
    display.textContent = calculator(num1, num2, sign);
    display.textContent = display.textContent.slice(0,15);
    screenRules();
})
del.addEventListener('click', function() {
    display.textContent = display.textContent.slice(0,-1);
    
})
reset.addEventListener('click', function() {
    display.textContent = '';
    sign='';
    num1=0;
    num2=0;
    opperators.forEach(element => {
        element.style.opacity=1;
        element.style.transform='scale(100%)';
    });
    
})

  //////////////////////////////////////////
 ////////////////functions/////////////////
//////////////////////////////////////////

function alertmessage(msg) {
    messages.style.display='block';
    msg.classList.add('show');
    closemsg.forEach(function(e) {
        e.addEventListener('click', function() {
            msg.classList.remove('show');
            setTimeout(function() {
                messages.style.display='none';
            }, 500);
        })
    })
    setTimeout(function() {
        msg.classList.remove('show');
    }, 7000);
    setTimeout(function() {
        messages.style.display='none';
    }, 7500);
}

function screenRules() {
    if (display.textContent.length > 10) {
        display.style.transition = '0.3s ease-in';
        display.style.fontSize = 35+'%';
    }
    if(display.textContent.length > 15) {
        alertmessage(message1);
        display.textContent="ERROR LENGHT";
    }
}

function activeOpperator(opp) {
    for (let i = 0; i < opperators.length; i++) {
        if(opperators[i].textContent != opp.textContent) {
            opperators[i].style.opacity=1;
            opperators[i].style.transform = 'scale(100%)';
        }
    }
    opp.style.opacity=0.7;
    opp.style.transform = 'scale(95%)';
}

function calculator(a, b, opp) {
    if (opp == '+') {
        return a+b;
    }else if (opp == '-') {
        return a-b;
    }else if (opp == '*') {
        return a*b;
    }else if (opp == '/') {
        return a/b;
    }
}