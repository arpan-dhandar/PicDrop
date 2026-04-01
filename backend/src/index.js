import app from './app.js';
import connectDB from './db/db.js';

// Connect to MongoDB
connectDB();

// Render uses the PORT environment variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});