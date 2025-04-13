# 💬 Basic Chat App – Sparks Assignment

This is a simple **real-time chat application** built with React Native (Expo) and Node.js using Socket.IO. It allows users to enter a username, see a list of available users, and chat in real time with typing indicators and message metadata.

---

## 📱 Features

- 👤 Username-based login
- 🧑‍🤝‍🧑 1-to-1 chat functionality
- ⚡ Real-time messaging via Socket.IO
- ✍️ Typing indicator ("User is typing...")
- 🟢 Displays available users online
- ✅ Displays avatar, timestamp, and sender info for messages
- 📦 Clean folder structure for Frontend and Backend

---

## 🛠️ Tech Stack

### 🔹 Frontend (React Native):
- React Native (with Expo)
- Socket.IO-client
- Functional UI (TouchableOpacity, FlatList, View, TextInput)
  
### 🔹 Backend (Node.js + Socket.IO):
- Express.js server
- Real-time messaging with Socket.IO

---

## 📁 Folder Structure

simple-app/ ├── Backend/ # Node.js backend │ ├── index.js │ └── package.json │ ├── Frontend/ # React Native frontend (Expo) │ ├── App.js │ ├── screens/ │ ├── components/ │ └── package.json │ └── README.md

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/innovativenavneet/sparks-assignment.git
cd sparks-assignment
2. Start Backend (Node.js + Socket.IO)
bash
Copy
Edit
cd Backend
npm install
node index.js
This will start the Socket.IO server at http://localhost:3000.

3. Run Frontend (React Native with Expo)
bash
Copy
Edit
cd ../Frontend
npm install
npx expo start
Use the QR code in Expo Go (Android) or run on an emulator.
