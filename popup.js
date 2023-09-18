const arrE = [' ', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const arrA = [' ', 'ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', 'ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];

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
};

function convertText(str, fromArr, toArr, customMapping) {
  const strlen = str.length;
  let result = '';
  let prevChar = ''; // To keep track of the previous character.

  for (let i = 0; i < strlen; i++) {
    const char = str.charAt(i);

    // Check for context-based mappings
    if (
      (
        (char === 'ا' && [' ', 'ا', 'أ'].includes(prevChar)) ||
        (char === 'أ' && [' ', 'ا', 'أ'].includes(prevChar))
      ) && customMapping['لإ']
    ) {
      result += customMapping['لإ'];
    } else if (customMapping[char]) {
      result += customMapping[char];
    } else {
      let found = false;
      for (let j = 0; j < fromArr.length; j++) {
        if (char === fromArr[j] || char.toLowerCase() === fromArr[j].toLowerCase()) {
          result += toArr[j];
          found = true;
          break;
        }
      }

      if (!found) {
        for (let j = 0; j < toArr.length; j++) {
          if (char === toArr[j] || char.toLowerCase() === toArr[j].toLowerCase()) {
            result += fromArr[j];
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