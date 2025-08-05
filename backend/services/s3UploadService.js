// services/s3UploadService.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

// 1. Crie o cliente S3 FORA da função. Ele será reutilizado em toda a aplicação.
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// 2. Crie uma função de upload exportável
const uploadFile = async (file) => {
    if (!file) {
        throw new Error("Nenhum arquivo fornecido para upload.");
    }

    const randomBytes = crypto.randomBytes(16).toString('hex');
    const fileName = `proofs/${randomBytes}-${file.originalname}`; // Adicionei um prefixo 'proofs/' para organizar

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        await s3Client.send(command);
        // Retorna a URL completa da imagem
        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        return imageUrl;
    } catch (error) {
        console.error("Erro detalhado no serviço S3:", error);
        // Joga o erro para frente para que o controller possa capturá-lo
        throw new Error("Falha ao fazer upload do arquivo para o S3.");
    }
};

module.exports = { uploadFile };