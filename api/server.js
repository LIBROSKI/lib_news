const http = require('http');
const net = require('net');
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'your_database_name';

// Add debug logging
if (process.env.DEBUG) {
  console.debug('Debug mode enabled');
  console.debug('MongoDB URL:', url);
}

// Create MongoDB client
const client = new MongoClient(url);

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        return client.db(dbName);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

// Initialize database connection
let db;
connectDB()
    .then(database => {
        db = database;
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });

new http.Server((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            res.end('ok');
        });
    }
    else if (req.method === 'GET') {
        res.end('GET request');
    }
    else if (req.method === 'PUT') {
        res.end('PUT request');
    }
    else if (req.method === 'DELETE') {
        res.end('DELETE request');
    }
    else {
        res.end('Unknown request');
    }
}).listen(3000);