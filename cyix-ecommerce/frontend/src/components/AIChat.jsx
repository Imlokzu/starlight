import React, { useState } from 'react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    const userInput = input;
    setInput('');

    try {
      const response = await puter.ai.chat(userInput);
      setMessages([...newMessages, { role: 'assistant', content: response.text }]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the AI." }]);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[40rem] bg-neutral-900 rounded-lg shadow-lg flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-neutral-700 text-white'}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-neutral-800 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full p-2 rounded-lg bg-neutral-800 text-white"
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-lg">Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
