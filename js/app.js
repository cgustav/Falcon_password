(function () {
    /* Generic Var n Objects */

    /*form variable container */
    var app = document.getElementById('app');

    /*number of characters input container */
    var inputCharacters = document.getElementById('character-number');

    /*Password gen settings with the following objetic */

    var configuration = {
        character: parseInt(inputCharacters.value),
        symbols: true,
        numbers: true,
        capLetters: true,
        lowCases: true
    }
    //console.log(configuration.character);

    /*this object contain charset required to generate the password */
    /*Character sorted by category (object property) */

    var characters = {
        symbols: '! @ # $ % & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        numbers: '0 1 2 3 4 5 6 7 8 9',
        capLetters: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowCases: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    /*Events! */

    /* This event prevents application do a submit to send data and refresh the web page*/
    app.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    //plus one event
    app.elements.namedItem('btn-plus-one').addEventListener('click', function () {
        configuration.character++;
        inputCharacters.value = configuration.character;
        //console.log(configuration.character);
    });

    //minus one event
    app.elements.namedItem('btn-minus-one').addEventListener('click', function () {
        if (configuration.character > 1) {
            configuration.character--;
            inputCharacters.value = configuration.character;
        }
        //console.log(configuration.character);
    });
    
    //enable/disble symbols event
    app.elements.namedItem('btn-symbol').addEventListener('click',function() {
        btnToggle(this);
        configuration.symbols = !configuration.symbols;
        //console.log('Symbols setted to '+configuration.symbols);
    });

    //enable/disble capital letters event
    app.elements.namedItem('btn-capital-letter').addEventListener('click', function () {
        btnToggle(this);
        configuration.capLetters = !configuration.capLetters;
        //console.log('Capital Letters setted to ' + configuration.capLetters);
    });

    //enable/disble numbers event
    app.elements.namedItem('btn-number').addEventListener('click', function () {
        btnToggle(this);
        configuration.numbers = !configuration.numbers;
        //console.log('Numbers setted to ' + configuration.numbers);
    });
    
    //generate password event (listener)
    app.elements.namedItem('btn-generate').addEventListener('click',function() {
        generatePassword();
    });

    app.elements.namedItem('input-password').addEventListener('click',function() {
        passwordCopy(this);
    });
    /*Functions! */
    
    function btnToggle(elementx) {
        elementx.classList.toggle('false');
        elementx.childNodes[1].classList.toggle('fa-check');
        elementx.childNodes[1].classList.toggle('fa-times');
    }

    function generatePassword(){
        var finalChar = '';
        var password = '';

        for(property in configuration){
            if (configuration[property] == true) {
               finalChar += characters[property] + ' ';
               
            }
        }
        //to cut the final spaceboard
        finalChar = finalChar.trim();
        //to split it on an array
        finalChar = finalChar.split(' ');
        //console.log(finalChar);
        for (var i = 0; i < configuration.character; i++) { 
            password = password + finalChar[Math.floor(Math.random() * finalChar.length)] 
        }
        //Math.random generates a random float
        //Math.floor rounds that float (to Int)
        //console.log(Math.floor(Math.random() * 10));
        //console.log(password);
        app.elements.namedItem('input-password').value = password;
    }
    
    function passwordCopy(elementp){
        elementp.select();
        document.execCommand('copy');
        document.getElementById('alert-copied').classList.add('active');
        
        setTimeout(function(){
            document.getElementById('alert-copied').classList.remove('active');
        }, 2000);
    }
    generatePassword();
}())