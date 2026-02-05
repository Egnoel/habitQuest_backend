import express from 'express';
import bodyParser from 'body-parser';
import dbConfig from './config/database.config.js';
import mongoose from 'mongoose';
import { clerkMiddleware } from '@clerk/express';

import profileRoutes from './routes/profile.route.js';
import habitRoutes from './routes/habit.route.js';
import categoryRoutes from './routes/category.route.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(clerkMiddleware());

app.use('/profile', profileRoutes);
app.use('/habits', habitRoutes);
app.use('/categories', categoryRoutes);

const port = process.env.PORT || 3001;

mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

// Health endpoint checks MongoDB connectivity
app.get('/health', async (req, res) => {
  const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  if (state === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      return res.status(200).json({ status: 'ok', mongodb: true });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'error', mongodb: false, error: err.message });
    }
  }

  return res.status(503).json({ status: 'error', mongodb: false, state });
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
