const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

pool.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the PostgreSQL database', err);
    process.exit(1);
  });
