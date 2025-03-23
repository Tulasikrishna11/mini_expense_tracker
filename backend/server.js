const app = require('./app');
const sequelize = require('./config/sequelize');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => { 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to sync database', err);
    process.exit(1);
});
