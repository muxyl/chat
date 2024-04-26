// Sample knowledge base data
const knowledgeBase = {
    "What is your name?": "My name is ChatGPT.",
    "How are you?": "I'm doing well, thank you!",
    "What can you do?": "I can answer questions, provide information, and chat with you."
};

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('download-button').addEventListener('click', downloadChatHistory);

// Initialize chat history
let chatHistory = [];

// Render chat history
renderChatHistory();

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
        saveChatToHistory('bot', botResponse);
    } else {
        const errorMessage = "Sorry, I don't understand that.";
        addBotMessage(errorMessage);
        saveChatToHistory('bot', errorMessage);
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'user-message');
    messageItem.textContent = message;
    messagesContainer.appendChild(messageItem);
    scrollToBottom(messagesContainer);
    saveChatToHistory('user', message);
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'bot-message');
    messageItem.textContent = message;
    messagesContainer.appendChild(messageItem);
    scrollToBottom(messagesContainer);
}

function saveChatToHistory(sender, message) {
    chatHistory.push({ sender, message });
}

function renderChatHistory() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear existing messages
    chatHistory.forEach(chat => {
        const messageItem = document.createElement('li');
        messageItem.classList.add('message', chat.sender === 'user' ? 'user-message' : 'bot-message');
        messageItem.textContent = chat.message;
        messagesContainer.appendChild(messageItem);
    });
    scrollToBottom(messagesContainer);
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

// Function to download chat history as a text file
function downloadChatHistory() {
    const chatText = chatHistory.map(chat => `${chat.sender}: ${chat.message}`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
