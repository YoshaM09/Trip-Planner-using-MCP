# 🌍 MCP Server: AI-Powered Trip Planning  

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)  [![MCP](https://img.shields.io/badge/MCP-Model_Context_Protocol-orange)](https://modelcontextprotocol.io/)  [![Gemini API](https://img.shields.io/badge/Gemini_API-AI-green)](https://deepmind.google/technologies/gemini/)  [![Exa Search](https://img.shields.io/badge/Exa_Search-Data-red)](https://exa.ai/)  [![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)  

An **AI-powered MCP (Model Context Protocol) server** that automates **end-to-end trip planning**.  
This server integrates **Gemini** for natural language queries, **Exa Search** for real-time travel data, and uses **Cursor as the MCP client**, enabling users to plan trips more efficiently through a seamless AI-driven workflow.  

## ✨ Features  

- **MCP Integration**: Built an MCP server that follows the new open standard (“USB-C port for AI”) to connect tools securely.  
- **Natural Language Trip Planning**: Leverages **Gemini** to understand and respond to travel queries.  
- **Real-Time Travel Data**: Integrates **Exa Search** for destinations, accommodations, and attractions.  
- **MCP Client (Cursor)**: Provides a user-friendly interface to interact with the server.  
- **Workflow Automation**: Automates the process of researching, planning, and suggesting travel itineraries.  
- **Scalable & Modular**: Can be extended to support other workflows (e.g., bookings, calendar integration).  

## 🛠 Tech Stack  

- **Core Server**: Python (MCP protocol implementation)  
- **AI Backend**: Gemini API (natural language query handling)  
- **Travel Data Source**: Exa Search API  
- **Client**: Cursor (MCP client for interaction)  

## 🚀 Setup & Installation  

### 1. Clone the repository  
```bash
git clone https://github.com/YoshaM09/Trip-Planner-using-MCP.git
cd Trip-Planner-using-MCP
```
### 2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```
### 3. Install dependencies
```bash
pip install -r requirements.txt
```
### 4. Configure environment variables
- Create a .env file in the project root with your API keys:
```bash
GEMINI_API_KEY=your_gemini_api_key
EXA_API_KEY=your_exa_api_key
```
### 5. Add MCP server to Cursor
```bash
{
  "mcpServers": {
    "travel-mcp": {
      "url": "",
      "capabilities": {
        "tools": {
  } } } }
}
```

### 6. Open in Cursor Chat
- Open Cursor → go to the Chat panel
- Select your MCP server (trip-planner)
- Start asking travel-related questions directly in chat

## 🎬 Usage  

Once the MCP server is added to **Cursor**, you can start chatting with it directly in the **Chat panel**.  

### 💬 Example Queries  

- *“Plan me a 5-day trip to Tokyo focused on food and culture.”*  
- *“Find family-friendly hotels in Paris near museums.”*  
- *“Suggest weekend getaways from San Francisco with hiking options.”*  

The server retrieves **real-time travel data** from **Exa Search** and uses **Gemini** to generate structured trip suggestions — all seamlessly within **Cursor chat**.  


## 📺 Demo

<a href="http://www.youtube.com/watch?feature=player_embedded&v=0jPfkxPEAmk
" target="_blank"><img src="http://img.youtube.com/vi/0jPfkxPEAmk/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## 🤝 Contributing

- Contributions are welcome! Please submit a pull request or open an issue for suggestions.

## 📄 License

- This project is licensed under the MIT License.
