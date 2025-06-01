# 💬 Real-Time Chat App (WebSocket)

A real-time multi-user chat application built with:

- 🔧 **Node.js** and **WebSocket (ws)** on the backend  
- ⚛️ **React (with TypeScript)** on the frontend  
- 🔌 Uses **WebSocket protocol** to send/receive messages in real time  
- 🏠 Users can create or join chat rooms using a room ID  
- 📡 All messages are broadcasted only to users in the same room  

-------------------------------------



### Join Room
![Join Room](./assets/join_room.png)

### Chat Window
![Chat Window](./assets/chat_ui.png)

---

## 📁 Folder Structure
chatapp/
├── backend/
│ ├── src/
│ ├── dist/
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── tsconfig.json
└── README.md
## 🚀 Getting Started

### 🔙 Backend Setup

```bash
cd backend
npm install
npm run dev
```
these Runs TypeScript compiler and starts the server.


### Frontend Setup:
``` bash
cd frontend
npm install
npm run dev
```
Starts the frontend React app using your dev script
