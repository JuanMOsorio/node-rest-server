// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Env
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Expired Token
// ============================
// 60 seconds
// 60 minutes
// 24 Hours
// 30 Days
process.env.EXPIRATION_TOKEN = '48h';

// ============================
//  Autentication Seed
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


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


// ============================
//  Google Client ID
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '322360393884-j28d8fb1tqhh2lbop3koe6qo1dit61oj.apps.googleusercontent.com';
