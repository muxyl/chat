// Sample knowledge base data
const knowledgeBase = {
    "What is your name?": "My name is ChatGPT.",
    "How are you?": "I'm doing well, thank you!",
    "What can you do?": "I can answer questions, provide information, and chat with you."
};

document.getElementById('send-button').addEventListener('click', sendMessage);

// Load chat history from localStorage
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

// Render chat history
chatHistory.forEach(message => {
    const { sender, text } = message;
    if (sender === 'user') {
        addUserMessage(text);
    } else if (sender === 'bot') {
        addBotMessage(text);
    }
});

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
        // Save bot response to chat history
        chatHistory.push({ sender: 'bot', text: botResponse });
    } else {
        const errorMessage = "Sorry, I don't understand that.";
        addBotMessage(errorMessage);
        // Save error message to chat history
        chatHistory.push({ sender: 'bot', text: errorMessage });
    }
    // Save updated chat history to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'user-message');
    messageItem.textContent = message;
    messagesContainer.appendChild(messageItem);
    scrollToBottom(messagesContainer);
    // Save user message to chat history
    chatHistory.push({ sender: 'user', text: message });
    // Save updated chat history to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
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
