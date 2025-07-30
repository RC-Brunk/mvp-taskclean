// test-s3.js
require('dotenv').config({ path: '../.env' });
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

console.log('--- Iniciando Teste de Conexão com AWS S3 ---');

// 1. Verifica se as variáveis de ambiente foram carregadas
console.log('Região AWS:', process.env.AWS_REGION);
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Carregada' : 'NÃO ENCONTRADA');
console.log('Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Carregada' : 'NÃO ENCONTRADA');
console.log('Nome do Bucket:', process.env.S3_BUCKET_NAME);

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
    console.error('\n[ERRO] Variáveis de ambiente da AWS (ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION) não encontradas no arquivo .env!');
    process.exit(1);
}

// 2. Configura o cliente S3 (exatamente como no nosso controller)
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// 3. Tenta executar um comando simples (listar buckets)
const runTest = async () => {
    try {
        console.log('\nEnviando comando para a AWS...');
        const data = await s3Client.send(new ListBucketsCommand({}));
        console.log('\n[SUCESSO!] Conexão com a AWS estabelecida com sucesso.');
        console.log('Seu bucket está na lista?');
        console.log('Buckets encontrados:', data.Buckets.map(b => b.Name));

        if (!data.Buckets.map(b => b.Name).includes(process.env.S3_BUCKET_NAME)) {
            console.warn(`\n[AVISO] A conexão funcionou, mas o bucket "${process.env.S3_BUCKET_NAME}" não foi encontrado nesta conta/região.`);
        }

    } catch (error) {
        console.error('\n[FALHA] Erro ao tentar conectar com a AWS S3:');
        console.error('====================================================');
        console.error('Nome do Erro:', error.name);
        console.error('Mensagem:', error.message);
        console.error('====================================================');
        console.error('Verifique se suas credenciais (Access Key, Secret Key) e região no arquivo .env estão corretas e se o usuário IAM tem a permissão "s3:ListAllMyBuckets".');
    }
};

runTest();