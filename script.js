// CALCULATOR FUNCTIONS 
// ref for rounding https://www.peterlunch.com/snippets/javascript-round
// Round to 5 decimals -> 100000
function add(a,b) { 
    if(Number.isInteger(a+b)){
        return a+b;
    }
    else {
        return Math.round((a+b) * 100000) / 100000;
    }
}
function subtract(a,b) { 
    if(Number.isInteger(a-b)){
        return a-b;
    }
    else {
        return Math.round((a-b) * 100000) / 100000;
    }
}
function multiply(a,b) {
    if(Number.isInteger(a*b)){
        return a*b;
    }
    else {
        return Math.round((a*b) * 100000) / 100000;
    }
}
function divide(a,b) {
    if(Number.isInteger(a/b)){
        return a/b;
    }
    else {
        return Math.round((a/b) * 100000) / 100000;
    }
}
function modulus(a,b) {
    return a%b;
}

function toggleNegative() {
    // Are we making operand a or b negative? Will need to split string to look for operator
    // Important note: If operator exist -> b. Otherwise, a

    var temp = userInput;
    temp = temp.split(/([%*/+-]+)/g);

    console.table(temp);

    // If 0 or after an operation -> Replace 0 with negative sign
    if(afterAnOperation) {
        console.log("afterAnOperation: " + afterAnOperation);
        if(displayValue < 0) {
            displayValue *= -1;
            aIsNegative = false;

            userInput = String(displayValue);
            document.querySelector("#output-text").textContent = displayValue;
        }
        else {
            displayValue *= -1;
            aIsNegative = true;

            userInput = String(displayValue);
            document.querySelector("#output-text").textContent = displayValue;
        }
    }
    else if(String(displayValue) === '0') {
        console.log("String(displayValue) === '0': " + String(displayValue) === '0');
        displayValue = '-' + displayValue;

        // Check if a or b
        if(temp.length == 1) {
            aIsNegative = true;
        }
        else {
            bIsNegative = true;
        }

        // If the third to last and second to last values are -0 then remove the zero
        console.log("-1: " + displayValue[displayValue.length-1]);
        console.log("-2: " + displayValue[displayValue.length-2]);

        if(displayValue[displayValue.length-2] === "-" && displayValue[displayValue.length-1] === "0") {
            console.log("*1*")
            displayValue = displayValue.slice(0,1) + displayValue.slice(2, displayValue.length - 1);
        }

        document.querySelector("#output-text").textContent = displayValue;
    }

    // If one char long then make a negative
    else if(temp.length == 1) {
        console.log("temp.length == 1: " + temp.length == 1);

        if(aIsNegative === true) {
            aIsNegative = false;

            displayValue = displayValue.slice(1, displayValue.length);
            document.querySelector("#output-text").textContent = displayValue;
        }
        else {
            aIsNegative = true;

            displayValue = "-" + displayValue;
            document.querySelector("#output-text").textContent = displayValue;
        }
    }

    else if(temp.length == 3 && temp[2] != ''){
        console.log("temp.length == 3 && temp[2] != '': " + temp.length == 3 && temp[2] != '');
        if(bIsNegative === true) {
            console.log("bIsNegative === true: " + bIsNegative === true);
            bIsNegative = false;

            displayValue = String(displayValue); 
            displayValue = displayValue === 0 ? '0' : displayValue.slice(1, displayValue.length);
            displayValue = displayValue.slice(1, displayValue.length);
            document.querySelector("#output-text").textContent = displayValue;
        }
        else {
            console.log("bIsNegative === false: " + bIsNegative === false);
            bIsNegative = true;

            displayValue = "-" + displayValue;
            document.querySelector("#output-text").textContent = displayValue;
        }
    }
    else {
        console.log("ELSE");
        console.log("Operand A and Operator");
        console.table(temp);
    }
    
}

function clear() {
    userInput = '';
    displayValue = '0';
    aIsNegative = false;
    bIsNegative = false;
    afterAnOperation = false;

    document.querySelector("#output-text").textContent = displayValue;
}

function operate(operator, a, b) {

    if(aIsNegative) {
        a *= -1;
    }
    
    if(bIsNegative) {
        b *= -1;
    }

    console.log("In operate()");
    console.log("a: " + a);
    console.log("aIsNegative: " + aIsNegative);
    console.log("Operator: " + operator);
    console.log("b: " + b)
    console.log("bIsNegative: " + bIsNegative);

    switch(operator){
        
        case "+":
            return add(a,b);
            break;

        case "-":
            return subtract(a,b);
            break;

        case "*":
            return multiply(a,b);
            break;

        case "/":

            if(b === 0) {
                return "ERROR";
            }
            else{
                return divide(a,b);
            }
            
            break;

        case "%":

            return modulus(a,b);
            break;
    }

}

// INPUT FUNCTIONS
function resetButtonColors() {
    addBtn.style = "color: white; backgroundColor = rgb(214, 166, 8, 1.0)";
    subtractBtn.style = "color: white; backgroundColor = rgb(214, 166, 8, 1.0)";
    multiplyBtn.style = "color: white; backgroundColor = rgb(214, 166, 8, 1.0)";
    divideBtn.style = "color: white; backgroundColor = rgb(214, 166, 8, 1.0)";
    //modulusBtn.style = "backgroundColor = rgb(214, 166, 8, 1.0)";
}

function checkDecimalCount(value) {
    var count = 0;

    for(var i = 0; i < value.length; i++) {
        if(value[i] === '.') {
            count++;
        }
    }   

    return count;
}
function updateUserInput(value) {
    
    var a = '';
    var b = '';
    var operator = '';
    //var extraOperator = '';
    var result = '';

    // Store user input + value if value is not an equal sign
    var temp = value === '=' ? userInput : userInput + value; 
    var expressionSplit = temp.split(/([%*/+-]+)/g)

        // Check if ERROR is displayed, make it blank (will be overwritten later in this function) & Reset values
        if(displayValue === "ERROR") {
            displayValue = '';
            userInput = '';
            aIsNegative = false;
            bIsNegative = false;
            afterAnOperation = false;
        }

    // If value is an operator -> Check if another operator is already present. If so perform the calculation, otherwise update userInput
    console.table(expressionSplit);
    if(expressionSplit.length > 3) {
        //console.log("ERROR: Too many operators.");

        a = Number(expressionSplit[0]);
        operator = expressionSplit[1];
        b = Number(expressionSplit[2]);

        result = String(operate(operator, a, b));
        
        // Update negative flags
        aIsNegative = operate(operator, a, b) >= 0 ? false : true;

        if(aIsNegative) {
            result = result.slice(1, result.length);
        }

        bIsNegative = false;

        displayValue = '';
        userInput = result + expressionSplit[3]
    }

    
    else if(((expressionSplit[0] === '' || (expressionSplit[0] != ''  && expressionSplit[2] === '')) && value === '=')) {
        console.log("ERROR: Undefined Operand(s).");
        displayValue = "ERROR";
    }

    // ExpressionSplit is 1 element -> Only one operand was inputted (no operator + second operand)
   else if(expressionSplit.length === 1 && value === '=') {
        console.log("ERROR: Undefined Operator.");
        displayValue = "ERROR";
    }
    

    // If value is an equal sign perform operation
    else if(value === '=') {

        // Extract operands and operator
        a = expressionSplit[0];
        operator = expressionSplit[1];
        b = expressionSplit[2];

        // Check for deciamls (do this while value is a string, easy to traverse)
        if(checkDecimalCount(a) > 1 || checkDecimalCount(b) > 1) {
            console.log("Error: Too many decimals in an operand.");
            displayValue = "ERROR";
        } 

        else {

            // Cast a & b to number values 
            a = Number(a);
            b = Number(b);
    
            displayValue = operate(operator, a, b);
            console.log(displayValue);
        }
    }

    // Otherwise...
    else {
        // Update input
        userInput += value;
        console.log(userInput);
    }

    // Update negative values
    if(aIsNegative && bIsNegative) {
        aIsNegative = false;
        bIsNegative = false;
    }
    else if((aIsNegative == true && bIsNegative == false) || aIsNegative ==  false&& bIsNegative == true) {
        aIsNegative = true;
        bIsNegative = false;
    }
    else {
        aIsNegative = false;
        bIsNegative = false;
    }

    document.querySelector("#output-text").textContent = displayValue;
} 

function updateDisplayValue(value) {
    
    // If value is NOT an operator or 0 -> Update display value 
    if(!(value === '+' || value === '-'|| value === '*' || value === '/' || value === '%')) {

        // If displayValue is 0 -> Overwrite it with value
        if(displayValue === '0') {
            displayValue = value;
        }

        // Otherwise concat/add value
        else {
            displayValue += value;
        }  
    }

    // If an operator is pressed -> Now display a zero
    else {
        displayValue = '0';
    }
   
    document.querySelector("#output-text").textContent = displayValue;
}

// DOM FUNCTIONS
const numberBtns = document.querySelectorAll(".number");
numberBtns.forEach((button) => {
    button.addEventListener("click", () => {

        if(afterAnOperation) {
            console.log("after an operation");
            displayValue = button.textContent;
            userInput = displayValue;
            document.querySelector("#output-text").textContent = displayValue;

            afterAnOperation = false;
        }
        else {
            updateUserInput(button.textContent);
            updateDisplayValue(button.textContent);
            resetButtonColors();
        }
    })
});

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    afterAnOperation = false;
    updateUserInput(addBtn.textContent);
    updateDisplayValue(addBtn.textContent);
    addBtn.style.color = "rgb(214, 166, 8, 1.0)";
    addBtn.style.backgroundColor = "white";
});

const subtractBtn = document.querySelector("#subtract");
subtractBtn.addEventListener("click", () => {
    afterAnOperation = false;
    updateUserInput(subtractBtn.textContent);
    updateDisplayValue(subtractBtn.textContent);
    subtractBtn.style.color = "rgb(214, 166, 8, 1.0)";
    subtractBtn.style.backgroundColor = "white";
});

const multiplyBtn = document.querySelector("#multiply");
multiplyBtn.addEventListener("click", () => {
    afterAnOperation = false;
    updateUserInput('*');
    updateDisplayValue('*');
    multiplyBtn.style.color = "rgb(214, 166, 8, 1.0)";
    multiplyBtn.style.backgroundColor = "white";
});

const divideBtn = document.querySelector("#divide");
divideBtn.addEventListener("click", () => {
    afterAnOperation = false;
    updateUserInput(divideBtn.textContent);
    updateDisplayValue(divideBtn.textContent);
    divideBtn.style.color = "rgb(214, 166, 8, 1.0)";
    divideBtn.style.backgroundColor = "white";
});

const modulusBtn = document.querySelector("#modulus");
modulusBtn.addEventListener("click", () => {
    afterAnOperation = false;
    updateUserInput(modulusBtn.textContent);
    updateDisplayValue(modulusBtn.textContent);
    //modulusBtn.style = "background-color: rgba(214, 166, 8, 0.75)";
});

const decimalBtn = document.querySelector("#decimal");
decimalBtn.addEventListener("click", () => {
    afterAnOperation = false;
    updateUserInput(decimalBtn.textContent);
    updateDisplayValue(decimalBtn.textContent);
    resetButtonColors();
});

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
    afterAnOperation = false;
    clear();
    resetButtonColors();
})

const negativeToggleBtn = document.querySelector("#toggle-negative");
negativeToggleBtn.addEventListener("click", () => {
    toggleNegative();
    afterAnOperation = false;
    resetButtonColors();
})

const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", () => {
    afterAnOperation = true;
    updateUserInput(equalBtn.textContent);
    resetButtonColors();
});

// Global variable --- Starting dummy value
let userInput = '';
let aIsNegative = false;
let bIsNegative = false;
let afterAnOperation = false;
let displayValue = '0';
document.querySelector("#output-text").textContent = displayValue;