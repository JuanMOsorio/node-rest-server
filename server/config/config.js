// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Env
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  BD
// ============================

let urlBD;

if (process.env.NODE_ENV === 'dev') {
	urlBD = 'mongodb://localhost:27017/coffe';
} else {
	urlBD = process.env.MONGO_URI;
}

process.env.URLDB = urlBD;


