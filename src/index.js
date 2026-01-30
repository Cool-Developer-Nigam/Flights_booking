const express = require('express');

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // process.exit(1);
});

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running on port ' + ServerConfig.PORT);
});

app.use('/api', apiRoutes);

console.log('PORT:', ServerConfig.PORT);

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connected successfully');
        try {
            // bind to localhost explicitly to avoid potential IPv6/OS binding issues during dev
            app.listen(ServerConfig.PORT, '127.0.0.1', () => {
                console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
            });
        } catch (listenError) {
            console.error('Failed to start server:', listenError);
            // process.exit(1);
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // process.exit(1);
    }
}

startServer();

// Keep the event loop alive
setInterval(() => {}, 1000);
