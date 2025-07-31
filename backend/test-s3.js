// backend/test-s3.js
require('dotenv').config({ path: '../.env' });
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs'); // Módulo do Node.js para ler arquivos

console.log('--- Iniciando Teste de UPLOAD para AWS S3 ---');

// 1. Verifica as variáveis de ambiente
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.S3_BUCKET_NAME) {
    console.error('\n[ERRO] Verifique se todas as variáveis da AWS estão no arquivo .env na raiz do projeto!');
    process.exit(1);
}
console.log(`Bucket Alvo: ${process.env.S3_BUCKET_NAME}, Região: ${process.env.AWS_REGION}`);

// 2. Configura o cliente S3 (v3)
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// 3. Prepara e executa o upload
const runUploadTest = async () => {
    try {
        // Lê nosso arquivo de teste do disco
        const fileContent = fs.readFileSync('./teste.txt');
        const fileName = `teste-direto-${Date.now()}.txt`;

        console.log(`\nTentando fazer o upload do arquivo 'teste.txt' como '${fileName}'...`);

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: fileContent,
        });

        await s3Client.send(command);

        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        console.log('\n[SUCESSO!] Upload realizado com sucesso.');
        console.log('URL do arquivo:', fileUrl);
        console.log('Isso prova que suas credenciais e permissões de ESCRITA (PutObject) estão corretas!');

    } catch (error) {
        console.error('\n[FALHA] Erro ao tentar fazer o upload para o S3:');
        console.error('====================================================');
        console.error('Nome do Erro:', error.name);
        console.error('Mensagem:', error.message);
        console.error('====================================================');
        console.error('A causa mais provável é que o seu usuário IAM não tem a permissão "s3:PutObject". Verifique as políticas de permissão do usuário no console da AWS.');
    }
};

runUploadTest();