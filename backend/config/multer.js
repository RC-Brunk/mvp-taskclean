const multer = require('multer');

// Configura o armazenamento em memória
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;