const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const Task = require('../../models/Task');
const crypto = require('crypto');
const User = require('../../models/User');
const Unit = require('../../models/Unit');

const uploadProofImage = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { id: cleanerId } = req.user;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Nenhum arquivo de imagem enviado.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        if (task.cleanerId !== cleanerId) return res.status(403).json({ message: 'Acesso negado.' });

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const randomBytes = crypto.randomBytes(16).toString('hex');
        const fileName = `${randomBytes}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await s3Client.send(command);
        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        const updatedTask = await task.update({ proofImageUrl: imageUrl });
        
        const taskWithIncludes = await Task.findByPk(updatedTask.id, {
            include: [
                { model: Unit, as: 'unit', attributes: ['id', 'name'] },
                { model: User, as: 'cleaner', attributes: ['id', 'fullName'] }
            ]
        });
        res.status(200).json(taskWithIncludes);
    } catch (error) {
        console.error("ERRO DETALHADO NO UPLOAD:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor.", errorName: error.name, errorMessage: error.message });
    }
};

module.exports = uploadProofImage;

