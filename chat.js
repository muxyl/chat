// Sample knowledge base data
const knowledgeBase = {
    "What is your name?": "My name is ChatGPT.",
    "How are you?": "I'm doing well, thank you!",
    "What can you do?": "I can answer questions, provide information, and chat with you."
};

document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return; // Do nothing if input is empty
    addUserMessage(userInput);
    getBotResponse(userInput);
    document.getElementById('user-input').value = ''; // Clear input field after sending message
}

function getBotResponse(userInput) {
    const botResponse = knowledgeBase[userInput];
    if (botResponse) {
        addBotMessage(botResponse);
    } else {
        addBotMessage("Sorry, I don't understand that.");
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'user-message');
    messageItem.textContent = message;
    messagesContainer.appendChild(messageItem);
    scrollToBottom(messagesContainer);
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'bot-message');
    messageItem.textContent = message;
    messagesContainer.appendChild(messageItem);
    scrollToBottom(messagesContainer);
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}
