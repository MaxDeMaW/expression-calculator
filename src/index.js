function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    // write your solution here
    //need remove all spaces and space-symbols
    var expression = expr.replace(/\s/g, '');

    var numberBrackets = 0;
    //check expression for open and close brackets
    for (var i = 0; i < expression.length; i++) {
        if (expression[i] == "(") {
            numberBrackets = numberBrackets + 1;
        }

        if (expression[i] == ")") {
            numberBrackets = numberBrackets - 1;
        }
    }

    if (Number(numberBrackets) !== 0) {
        throw new TypeError("ExpressionError: Brackets must be paired");
    }

    var arrayExpression = [];
    var stringToNumber = "";

    //split string to numbers, operators and brackets for array
    for (var i = 0; i < expression.length; i++) {
        //if it is number, add to string and go next
        if ((expression[i] >= "0") && (expression[i] <= "9")) {
            stringToNumber = stringToNumber + expression[i];

            //if it is last element and it is number, add to array
            if (i == expression.length - 1) {
                arrayExpression.push(stringToNumber);
            }
            //or
        } else {
            //If it went from last check symbol and it is number
            if (stringToNumber.length > 0) {
                //add number
                arrayExpression.push(stringToNumber);
                //clear number in string
                stringToNumber = "";
            }

            //add expr. or bracket
            if (expression[i] !== "r")
                arrayExpression.push(expression[i]);
        }
    }

    //////////////////////// Work with brackets ///////////////////
    var haveBrackets = true;
    if (Number(numberBrackets) == 0)
        while (haveBrackets == true) {

            haveBrackets = IsBracketsInExpression(arrayExpression);

            if (haveBrackets === true) {
                arrayExpression = CountWithBrackets(arrayExpression);
            }
            haveBrackets = IsBracketsInExpression(arrayExpression);
        }

    //if we haven't brackets, count expression
    ////////////////////// work with с  * / + -  ///////////////////
    arrayExpression = MultyDivis(arrayExpression);
    arrayExpression = SumSub(arrayExpression);

    return arrayExpression[0];
}



//to count expression from first founded pair brackets
function CountWithBrackets(arrayExpression) {
    var bracketsArray = [];

    var firstBracket = -1;
    var secondBracket = -1;
    //is there brackets
    haveBrackets = IsBracketsInExpression(arrayExpression);

    //find second open bracket
    firstBracket = FirstPairBracketsToWork(arrayExpression)[0];
    secondBracket = FirstPairBracketsToWork(arrayExpression)[1];

    //copy express. in brackets
    for (var z = firstBracket + 1; z < secondBracket; z++) {
        bracketsArray.push(arrayExpression[z]);
    }
    //count expr. in brackets
    bracketsArray = MultyDivis(bracketsArray);
    bracketsArray = SumSub(bracketsArray);

    //cut expr. in brackets and push what were counted
    arrayExpression.splice(firstBracket, secondBracket - firstBracket + 1, bracketsArray);

    return arrayExpression;
}

//is there brackets
function IsBracketsInExpression(arrayExpression) {
    var haveBrackets = false;
    for (var i = 0; i < arrayExpression.length; i++) {
        if (arrayExpression[i] == "(") {
            haveBrackets = true;
            break;
        }

        if (arrayExpression[i] == ")") {
            haveBrackets = true;
            break;
        }
    }
    return haveBrackets;
}

//find first pair brackets, which we can use to work and to count
function FirstPairBracketsToWork(arrayExpression) {
    var arrayBrackets = [-1, -1];
    for (var i = 0; i < arrayExpression.length; i++) {
        if (arrayExpression[i] == "(") {
            arrayBrackets[0] = i;
        }

        if (arrayExpression[i] == ")") {
            arrayBrackets[1] = i;
            break;
        }
    }
    return arrayBrackets;
}

//////////////////////// work with  * /      ///////////////////
function MultyDivis(arrayExpression) {
    var stopCount = false;

    //выполнить первое умножение или деление
    while (stopCount == false) {
        stopCount = true;
        for (var i = 0; i < arrayExpression.length; i++) {
            if (arrayExpression[i] == "*") {
                arrayExpression.splice(i - 1, 3, Multiplication(arrayExpression[i - 1], arrayExpression[i + 1]));
                stopCount = false;
                break;
            }

            if (arrayExpression[i] == "/") {
                arrayExpression.splice(i - 1, 3, Division(arrayExpression[i - 1], arrayExpression[i + 1]));

                stopCount = false;
                break;
            }
        }
    }
    return arrayExpression;
}


//do first sum and Subtraction
function SumSub(arrayExpression) {

    var stopCount = false;

    while (stopCount == false) {
        stopCount = true;
        for (var i = 0; i < arrayExpression.length; i++) {
            if (arrayExpression[i] == "+") {
                arrayExpression.splice(i - 1, 3, Summ(arrayExpression[i - 1], arrayExpression[i + 1]));
                stopCount = false;
                break;
            }

            if (arrayExpression[i] == "-") {
                arrayExpression.splice(i - 1, 3, Subtraction(arrayExpression[i - 1], arrayExpression[i + 1]));
                stopCount = false;
                break;
            }
        }
    }
    return arrayExpression;
}

function Division(a, b) {
    if (Number(b) === 0) throw new TypeError("TypeError: Division by zero.");
    return a / b;
}

function Summ(a, b) {
    return Number(a) + Number(b);
}

function Multiplication(a, b) {
    return Number(a) * Number(b);
}

function Subtraction(a, b) {
    return Number(a) - Number(b);
}

module.exports = {
    expressionCalculator
}