/**
 * This is from the website hackerrank.com, and this problem is called 'Lonely Integer'
 * There are N intergers in an array, all but one integer appear twice, find the one
 * that only apprers twice.  What we will do is take in a user input for the number
 * of integers they would like to put in the array and then we will build the array
 * and find the number that is only in it once.  For example, if the number of
 * elements we want in the array is 5 we might make an array like this [1,1,2,2,3]
 * and the number we are looking for is 3.
 */
var jsUtil = require('./util/js_utility_library.js'),
    arrayForProblem = [];

/**
 * This will get a number from the user that will define the size of the array
 * that we will be dealing with.  If they give the number 3 we will have an array
 * that might look like this => [1,1,2].
 */
function prompUserForInput () {
	// Start the standard input.
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Listen for data.
  process.stdin.on('data', function(text) {
		// Put this in a try catch to catch non numbers.
		try {
	    	// If the user wants to quit then we will exit the process.
			if (text === 'quit\n') {
				console.log('Exiting the problem!');
		    process.exit();
		    // Make sure we have an odd number...
			} else if (jsUtil.toNumber(text) % 2 === 1) {
		    // Let's set the number they passed in to the number we will use.
		    buildArrayForProblem(jsUtil.toNumber(text));
			} else {
				console.log('Please enter an odd number.');
			}
		} catch (e) {
			console.log(e.message);
			console.log('Please enter an odd number.');
		}
	});	
}

/**
 * This will push a random number from 0 to max number into the array 2 times.
 * We will make sure that the number is not already in the array first because
 * the rules state that we will have an array where all of the numbers appear
 * twice exept one that appears once.
 *
 * @param {Number} maxNum The max number that the user has defined.
 */
function pushIntoArray (maxNum) {
	var newNum = getNewRandomNumberForArray(maxNum);
  jsUtil.times(2,
  	function (numberToPushIn) { arrayForProblem.push(numberToPushIn) }, 
  	[newNum]
  );
}

/**
 * This will put the number that will only appear once in the array at a random
 * index in the array.
 *
 * @param {Number} maxNum The max number that the user has defined.
 */
function randomInsertIntoArray (maxNum) {
  // Get a random number that is not already in the array.
	var newNum = getNewRandomNumberForArray(maxNum);

	// Get a random number  between 0 and array length -1
	var insertIndex = jsUtil.random(0, arrayForProblem.length - 1);
  jsUtil.times(1,
  	function (numberToPushIn) { jsUtil.insert(arrayForProblem, insertIndex, numberToPushIn) }, 
  	[newNum]
  );
}

/**
 * Get us a random number that is not already in the array.
 * 
 * @param {Number} maxNum The user defined max number.
 *
 * @return {Number} The new random number we will be putting in the array.
 */
function getNewRandomNumberForArray (maxNum) {
  // Get a random number that is not already in the array.
	var newNum = jsUtil.random(0, maxNum);
	while (arrayForProblem.indexOf(newNum) !== -1) {
		newNum = jsUtil.random(0, maxNum);
	}
	return newNum;
}

/**
 * This function will create an array of numbers where each number appears twice
 * except one number that appears once.
 *
 * @param {Number} numberOfIntsInArray The number of ints we need in this array.
 */
function buildArrayForProblem (numberOfIntsInArray) {

	// Put a random number from 0 to numberOfIntsInArray
	jsUtil.times(Math.floor(numberOfIntsInArray / 2), pushIntoArray, [numberOfIntsInArray]);
	randomInsertIntoArray(numberOfIntsInArray);
	console.log('The array for this problem looks like -> ['+ arrayForProblem + '].');
	findSingleNumber();
	
}

/**
 * Find the number in the array that only appears once!
 */
function findSingleNumber () {
	// Loop over the numbers in the array and push them into a holder array as 
	// we go.  If we encounter any for the second time then we will delete it 
	// from the array.  We will be left with the last one.
	var holderArray = [];

	for (var i = 0; i < arrayForProblem.length; i++) {
		// Splice the number out of the holder array if we have already seen it.
    if (holderArray.indexOf(arrayForProblem[i]) !== -1) {
    	holderArray.splice(holderArray.indexOf(arrayForProblem[i]), 1);
    } else {
    	// Push it in, this is the first time we have seen it.
    	holderArray.push(arrayForProblem[i]);
    }
	}

	console.log('And the number is => ' + holderArray[0] + '.');
	process.exit();
}


// Ask the user to tell us how may ints they would like in the array.
console.log('How many integers would you like to see in this array? (Type quit to exit).');

// This call will take care of running the whole problem.
prompUserForInput();