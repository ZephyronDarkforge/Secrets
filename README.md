# SECRETS - ENCODING / DECODING
Simple ciphers, but secure client-side tool needs careful design.
Intuitive, responsive interface for smooth user experience.
Handle diverse inputs, validate data, and run multiple algorithms in real time.
Provide instant feedback: live character count, error alerts, confirmation messages.
Must work on different browsers and screen sizes.
Goal: a lightweight, cross-platform web app that makes classical encryption interactive and educational.
Simple ciphers, but secure client-side tool needs careful design.

# Project Objective
Intuitive UI: Design a clean, responsive interface using HTML and Bootstrap that adapts to desktop and mobile screens.
Client-Side Algorithms: Implement Caesar Cipher, ROT13, and Base64 logic entirely in JavaScript for instant in-browser encoding and decoding.
Enhanced User Experience: Provide features such as live character counting, copy-to-clipboard, message swapping, and keyboard shortcuts for efficient operation.
Robustness: Validate input, handle errors gracefully, and maintain consistent performance across major browsers.
Learning Tool: Demonstrate the application of DOM manipulation, event-driven programming, and responsive design in a practical cryptography context.

# Implement
HTML Structure
Bootstrap container/card for layout.
Responsive form elements for UI.
Bootstrap toasts for feedback.
CSS Styling
Custom theme with specific font and color.
Hover transitions and focus glows.
Rounded cards and inputs.
JavaScript Logic
Cipher Algorithms
Caesar: Wraps character shifts.
ROT13: A fixed Caesar shift.
Base64: Uses native browser methods.
Dynamic UI
Live character counter.
Toggles Caesar shift input visibility.
Keyboard shortcuts (CTRL+E, CTRL+D, Esc).

User Feedback
Input/output box highlights.
Toast notifications.
Copy-to-clipboard.
Event Handling
Button Clicks: For core functions.
Input Events: For character count.
Dropdown Change: For UI visibility.
Keyboard Events: For shortcuts.
