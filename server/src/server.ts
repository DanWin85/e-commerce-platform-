import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`íº€ Server running on port ${PORT}`);
  console.log(`í³Š Environment: ${process.env.NODE_ENV || 'development'}`);
});
