(function() {
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

    /*this object contain charset required to generate the password */
    /*Character sorted by category (object property) */

    var characters = {
        symbols: '! @ # $ % & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        numbers: '0 1 2 3 4 5 6 7 8 9',
        capLetters: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowCases: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    /*Events! */

    /* This prevents the application to do a submit to send any data and refresh the web page*/
    app.addEventListener('submit',function(e){
        e.preventDefault();
    });

    /*Number of characters increment button function */
    app.elements.namedItem('btn-plus-one').addEventListener('click',function(){
        configuration.character++;
        inputCharacters.value = configuration.character;

        /*Console log output 
        console.log('Number of characters increased to: ' + configuration.character); */
    });

    /*Number of characters decrement button function*/
    app.elements.namedItem('btn-minus-one').addEventListener('click', function () {
        if(configuration.character > 1){
        configuration.character--;
        inputCharacters.value = configuration.character;

        /*Console log output 
        console.log('Number of characters decreased to: ' + configuration.character); */
        
        }else{
            alert('Must be greater than 1');
        /*Console log output 
        console.log('ERROR: It can't be decreased by 1:'); */
        }    
    });

    //To switch true/false include symbol option 
    app.elements.namedItem('btn-symbol').addEventListener(click,function() {
        //This activate the function that change button and icon itself
            btnToggle(this);

        //Switching between true and false values:
        configuration.symbol = !configuration.symbols;

        //console log output
        //console.log('Include Symbols set: ' + configuration.symbol);
    });

    //To switch true/false include number option 
    app.elements.namedItem('btn-number').addEventListener(click, function () {
        //This activate the function that change button and icon itself
        btnToggle(this);
        configuration.number = !configuration.numbers;
        //console log output
        //console.log('Include Numbers set: ' + configuration.number);
    });

    //To switch true/false include capital letters  option 
    app.elements.namedItem('btn-capital-letter').addEventListener(click, function () { 
        btnToggle(this);
        configuration.capLetter = !configuration.capLetters;
        //console log output
        //console.log('Include Capital Letters set: ' + configuration.capLetter);
    });


    //To generate a password event
    app.elements.namedItem('btn-generate').addEventListener(click,function () {
        //Calls generate password function
        generatePassword();
    });

    //To copy to clipboard password event
    app.elements.namedItem('input-password').addEventListener(click,function(){
        copyPassword();
    });



    //Dedicated Functions

    //To alternate icon button styles
    function btnToggle(elementx){
        elementx.classList.toggle('false');
        elementx.childNodes[0].classList.toggle('fa-check');
        elementx.childNodes[0].classList.toggle('fa-times');
    }

    //To generate a password

    function generatePassword(){
        //final charset input container
        var finalCharacters = '';
        //generated password container
        var password = '';

        //setting an specific configuration for this password gen instance
        for(property in configuration){
            if(configuration[property] == true){
                //console log to identify property from configuration
                //console.log(configuration[property];)
                //adding the specific charset
                finalCharacters += characters[property] + ' ';
            }
        }

        //add trim (no spaceboard)
        finalCharacters = finalCharacters.trim();

        //Fetching to array
        finalCharacters = finalCharacters.split(' ');

        //Generating password
        for(var i=0; i < configuration.character; i++){
            //random math function
            password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
        }

        //Putting the generated password into the password text field
        app.elements.namedItem('input-password').value = password;
    }

    //To copy generated password to the clipboard
    function copyPassword(){
        //Select the text in the password field
        app.elements.namedItem('input-password').select();
        //Let's copy the text
        document.execCommand("copy");
        document.getElementById('alert-copied').classList.add('active');

        setTimeout (function () {
            document.getElementById('alert-copied').classList.remove('active');
        },2000)
    }
    //Generating a password with default settings
}())