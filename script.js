// Cache DOM elements
const messageInput = document.getElementById("messageInput");
const shiftInput = document.getElementById("shiftInput");
const resultOutput = document.getElementById("resultOutput");
const charCount = document.getElementById("charCount");
const toastEl = document.getElementById("appToast");
const cipherType = document.getElementById("cipherType");
const shiftGroup = document.getElementById("shiftGroup");

// Track last used shift
let lastShift = null;

/* ==========================
   Cipher Core Functions
========================== */
function caesarCipher(str, shift) {
  return str.replace(/[a-z]/gi, (char) => {
    let base = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

function rot13(str) {
  return caesarCipher(str, 13);
}

function base64Encode(str) {
  return btoa(str);
}

function base64Decode(str) {
  try {
    return atob(str);
  } catch {
    showError(resultOutput, "Invalid Base64 string.");
    return "";
  }
}

/* ==========================
   Encode & Decode
========================== */
function encodeMessage() {
  resetHighlights();
  let text = messageInput.value.trim();
  let cipher = cipherType.value;

  if (!text) {
    showError(messageInput, "Please enter a message to encode.");
    return;
  }

  let result = "";

  switch (cipher) {
    case "caesar":
      let shift = parseInt(shiftInput.value);
      if (isNaN(shift) || shift < 1 || shift > 25) {
        showError(shiftInput, "Shift must be a number between 1 and 25.");
        return;
      }
      lastShift = shift;
      result = caesarCipher(text, shift);
      break;

    case "rot13":
      result = rot13(text);
      break;

    case "base64":
      result = base64Encode(text);
      break;
  }

  resultOutput.value = result;
  highlightSuccess(resultOutput);
  showToast("Message encoded successfully!");
}

function decodeMessage() {
  resetHighlights();
  let text = messageInput.value.trim();
  let cipher = cipherType.value;

  if (!text) {
    showError(messageInput, "Please enter a message to decode.");
    return;
  }

  let result = "";

  switch (cipher) {
    case "caesar":
      let shift = parseInt(shiftInput.value);
      if (isNaN(shift) || shift < 1 || shift > 25) {
        showError(shiftInput, "Shift must be a number between 1 and 25.");
        return;
      }
      lastShift = shift;
      result = caesarCipher(text, 26 - shift);
      break;

    case "rot13":
      result = rot13(text);
      break;

    case "base64":
      result = base64Decode(text);
      break;
  }

  resultOutput.value = result;
  highlightSuccess(resultOutput);
  showToast("Message decoded successfully!");
}

/* ==========================
   Utility Functions
========================== */
function clearFields() {
  messageInput.value = "";
  shiftInput.value = "";
  resultOutput.value = "";
  lastShift = null;
  resetHighlights();
  updateCharCount();
}

function swapToInput() {
  if (resultOutput.value.trim()) {
    messageInput.value = resultOutput.value;
    updateCharCount();

    // Restore last shift if available
    if (lastShift !== null) {
      shiftInput.value = lastShift;
    }

    resetHighlights();
    showToast("Result moved back to input!");
  } else {
    showToast("No result to swap!");
  }
}

function copyToClipboard() {
  let result = resultOutput.value;
  if (result) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(result);
    } else {
      resultOutput.select();
      document.execCommand("copy");
    }
    showToast("Copied to clipboard!");
  }
}

/* ==========================
   Feedback UI
========================== */
function showToast(message) {
  toastEl.querySelector(".toast-body").textContent = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function showError(element, message) {
  element.classList.add("error-highlight");
  showToast(message);
}

function highlightSuccess(element) {
  element.classList.add("success-highlight");
}

function resetHighlights() {
  [messageInput, shiftInput, resultOutput].forEach(el => {
    el.classList.remove("error-highlight", "success-highlight");
  });
}

/* ==========================
   Character Count
========================== */
function updateCharCount() {
  charCount.textContent = `Characters: ${messageInput.value.length}`;
}
messageInput.addEventListener("input", updateCharCount);

/* ==========================
   Cipher Type Toggle
========================== */
cipherType.addEventListener("change", () => {
  if (cipherType.value === "caesar") {
    shiftGroup.style.display = "block";
  } else {
    shiftGroup.style.display = "none";
  }
});

/* ==========================
   Keyboard Shortcuts
========================== */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "e") {
    e.preventDefault();
    encodeMessage();
  } else if (e.ctrlKey && e.key === "d") {
    e.preventDefault();
    decodeMessage();
  } else if (e.key === "Escape") {
    clearFields();
  }
});
