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
	urlBD = 'mongodb+srv://root:b0y2J1D7tpjPQysl@cluster0-dcxyf.mongodb.net/coffe'
}

process.env.URLDB = urlBD;


