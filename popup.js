const arrE = [' ', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/','`'];
const arrA = [' ', 'ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', 'ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ','ذ'];

const customMapping = {
  'ض': 'q',
  'ص': 'w',
  'ث': 'e',
  'ق': 'r',
  'ف': 't',
  'غ': 'y',
  'ع': 'u',
  'ه': 'i',
  'خ': 'o',
  'ح': 'p',
  'ج': '[',
  'د': ']',
  'ش': 'a',
  'س': 's',
  'ي': 'd',
  'ب': 'f',
  'ل': 'g',
  'ا': 'h',
  'ت': 'j',
  'ن': 'k',
  'م': 'l',
  'ك': ';',
  'ط': "'",
  'ئ': 'z',
  'ء': 'x',
  'ؤ': 'c',
  'ر': 'v',
  'لا': 'b',
  'ى': 'n',
  'm': 'ة',
  'ة': 'm',
  'و': ',',
  'ز': '.',
  'ظ': '/',
  'لإ': 't',
  'لأ': 'g',
  'لا': 'gh',
  'ذ': '`'
};

function convertText(str, fromArr, toArr, customMapping) {
  const strlen = str.length;
  let result = '';
  let prevChar = ''; // To keep track of the previous character.
  let lamhmaza = '';





  for (let i = 0; i < strlen; i++) {
    const char = str.charAt(i);
   let NextChar = str.charAt(i + 1 )
    // Check for context-based mappings
    if (['ل' , 'أ' , 'إ' ].includes(char)) {

      if (char === 'ل') {
        lamhmaza = char
      }

      if (char === 'أ') {
        if (lamhmaza === 'ل') {
          result += customMapping['لأ']

        lamhmaza = ''
        }
        else{

        result += customMapping[char];
        }
      }

      if (char === 'إ') {

        if (lamhmaza === 'ل') {
          result += customMapping['لإ']
        lamhmaza = ''
        }
        else{

        result += customMapping[char];
        }
      }
      if(NextChar !==   'أ'  && NextChar !=='إ' && char === 'ل' ) {
         
        result += customMapping[char];
      }
    }



      else  if (customMapping[char]){
        result += customMapping[char];
      }
    else {
      let found = false;
      for (let i = 0; i < fromArr.length; i++) {
        if (char.toLowerCase() === fromArr[i]) {
          result += toArr[i];
          found = true;
          break;
        }
      }

      if (!found) {
        for (let i = 0; i < toArr.length; i++) {
          if (char.toLowerCase() === toArr[i]) {
            result += fromArr[i];
            break;
          }
        }
      }
    }

    prevChar = char; // Update the previous character.
  }

  return result;
}

function convertBetweenLanguages(text) {
  const detectedLanguage = /[\u0600-\u06FF]/u.test(text) ? 'arabic' : 'english';

  if (detectedLanguage === 'english') {
    return convertText(text, arrA, arrE, customMapping); // Convert from English to Arabic
  } else {
    return convertText(text, arrE, arrA, customMapping); // Convert from Arabic to English
  }
}

// Function to handle the conversion and display the result
function handleConversion() {
  const inputText = document.getElementById("inputText").value;
  const convertedText = convertBetweenLanguages(inputText);
  document.getElementById("result").textContent = convertedText;
}

// Add an event listener to the convert button
document.getElementById("convertButton").addEventListener("click", handleConversion);
