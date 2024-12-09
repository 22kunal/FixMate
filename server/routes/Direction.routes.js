io.on('connection', (socket) => {
    console.log('Client connected');
  
    // Simulate real-time location updates
    setInterval(() => {
      const latitude = 51.505 + Math.random() * 0.01; // Simulate latitude
      const longitude = -0.09 + Math.random() * 0.01; // Simulate longitude
      socket.emit('locationUpdate', [latitude, longitude]); // Emit new location
    }, 5000); // Update every 5 seconds
  });
  