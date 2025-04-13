const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"]
  }
});

// Store active users
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // When a user joins with their username
  socket.on("join", (username) => {
    if (!username || typeof username !== 'string') {
      socket.emit('error', 'Invalid username');
      return;
    }

    // Store user information
    socket.username = username;
    activeUsers.set(socket.id, username);
    
    // Join a room with their username for private messaging
    socket.join(username);
    
    console.log(`${username} joined`);
    
    // Notify all users about the updated user list
    updateUserList();
  });

  // Handle private messages
  socket.on("private message", ({ recipient, message }) => {
    if (!recipient || !message) {
      socket.emit('error', 'Recipient and message are required');
      return;
    }

    if (!socket.username) {
      socket.emit('error', 'You must join first');
      return;
    }

    const messageData = {
      sender: socket.username,
      recipient,
      message,
      timestamp: new Date().toISOString()
    };

    // Send to the recipient's private room
    io.to(recipient).emit("private message", messageData);
    
    // Also send back to sender for their own UI
    socket.emit("private message", messageData);
    
    console.log(`Private message from ${socket.username} to ${recipient}`);
  });

  // Handle typing indicator for private chats
  socket.on("typing", ({ recipient }) => {
    if (!recipient) return;
    
    io.to(recipient).emit("typing", {
      sender: socket.username,
      isTyping: true
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id} (${socket.username || 'unknown'})`);
    if (socket.username) {
      activeUsers.delete(socket.id);
      updateUserList();
    }
  });

  // Function to update all clients with the current user list
  function updateUserList() {
    const users = Array.from(activeUsers.values());
    console.log("Active users:", users);
    io.emit("user list", users);
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});