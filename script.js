function caesarCipher(text, shift, alphabet, encrypt = true) {
  const uniqueAlphabet = [...new Set(alphabet.toLowerCase())];
  const alphabetLength = uniqueAlphabet.length;

  if (!encrypt) {
    shift = alphabetLength - (shift % alphabetLength);
  } else {
    shift = shift % alphabetLength;
  }

  return text
    .split("")
    .map((char) => {
      const lowerChar = char.toLowerCase();
      const index = uniqueAlphabet.indexOf(lowerChar);

      if (index === -1) return char;

      const newIndex = (index + shift) % alphabetLength;
      const newChar = uniqueAlphabet[newIndex];

      return char === lowerChar ? newChar : newChar.toUpperCase();
    })
    .join("");
}

function incrementShift() {
  const shiftInput = document.getElementById("shift");
  shiftInput.value = parseInt(shiftInput.value) + 1;
  updateBothOutputs();
}

function decrementShift() {
  const shiftInput = document.getElementById("shift");
  const currentValue = parseInt(shiftInput.value);
  if (currentValue > 0) {
    shiftInput.value = currentValue - 1;
    updateBothOutputs();
  }
}

document.getElementById("input").addEventListener("input", updateBothOutputs);
document.getElementById("shift").addEventListener("change", updateBothOutputs);
document
  .getElementById("alphabet")
  .addEventListener("input", updateBothOutputs);
document.getElementById("output").addEventListener("input", updateBothOutputs);

function updateBothOutputs() {
  const inputText = document.getElementById("input").value;
  const outputText = document.getElementById("output").value;
  const shift = parseInt(document.getElementById("shift").value);
  const alphabet = document.getElementById("alphabet").value;

  if (document.activeElement.id === "output") {
    const decrypted = caesarCipher(outputText, shift, alphabet, false);
    document.getElementById("input").value = decrypted;
  } else {
    const encrypted = caesarCipher(inputText, shift, alphabet, true);
    document.getElementById("output").value = encrypted;
  }
}

function isEncrypted(text, alphabet) {
  const uniqueAlphabet = [...new Set(alphabet.toLowerCase())];
  const textLetters = text
    .toLowerCase()
    .split("")
    .filter((char) => uniqueAlphabet.includes(char));
  const alphabetLetters = uniqueAlphabet.join("");

  if (textLetters.length === 0) return false;

  let encryptedCount = 0;
  let normalCount = 0;

  for (let i = 0; i < textLetters.length - 1; i++) {
    const currentIndex = alphabetLetters.indexOf(textLetters[i]);
    const nextIndex = alphabetLetters.indexOf(textLetters[i + 1]);

    if (currentIndex !== -1 && nextIndex !== -1) {
      if (Math.abs(currentIndex - nextIndex) > uniqueAlphabet.length / 2) {
        encryptedCount++;
      } else {
        normalCount++;
      }
    }
  }

  return encryptedCount > normalCount;
}
