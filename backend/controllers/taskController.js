const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const User = require('../models/User');
const Unit = require('../models/Unit');
const Task = require('../models/Task');
const ChecklistTemplate = require('../models/ChecklistTemplate');
const crypto = require('crypto');

// --- Funções do CRUD e Ações ---

const createTask = async (req, res) => {
    const { unitId, cleanerId, type, checklistTemplateId } = req.body;
    if (!unitId || !cleanerId || !type) {
        return res.status(400).json({ message: 'Os campos unitId, cleanerId e type são obrigatórios.' });
    }
    try {
        const unitExists = await Unit.findByPk(unitId);
        const cleanerExists = await User.findOne({ where: { id: cleanerId, role: 'cleaner' } });
        if (!unitExists) return res.status(404).json({ message: 'Unidade não encontrada.' });
        if (!cleanerExists) return res.status(404).json({ message: 'Usuário cleaner não encontrado.' });
        let checklistData = null;
        if (checklistTemplateId) {
            const template = await ChecklistTemplate.findByPk(checklistTemplateId);
            if (!template) return res.status(404).json({ message: 'Modelo de Checklist não encontrado.' });
            checklistData = template.items;
        }
        const newTask = await Task.create({ unitId, cleanerId, type, checklist: checklistData, checklistTemplateId: checklistTemplateId || null });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [
                { model: Unit, as: 'unit', attributes: ['id', 'name'] },
                { model: User, as: 'cleaner', attributes: ['id', 'fullName'] }
            ]
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id, {
            include: [
                { model: Unit, as: 'unit', attributes: ['id', 'name'] },
                { model: User, as: 'cleaner', attributes: ['id', 'fullName'] }
            ]
        });
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao buscar tarefa por ID:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        await task.update(req.body);
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Task.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const startTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { id: cleanerId } = req.user;
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        if (task.cleanerId !== cleanerId) return res.status(403).json({ message: 'Acesso negado. Esta tarefa não foi atribuída a você.' });
        if (task.status !== 'pending') return res.status(409).json({ message: `Esta tarefa não pode ser iniciada pois seu status é '${task.status}'.`});
        task.status = 'in_progress';
        task.startedAt = new Date();
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao iniciar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const finishTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { id: cleanerId } = req.user;
        const { maintenance_required, maintenance_notes } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        if (task.cleanerId !== cleanerId) return res.status(403).json({ message: 'Acesso negado. Esta tarefa não foi atribuída a você.' });
        if (task.status !== 'in_progress') return res.status(409).json({ message: `Esta tarefa não pode ser finalizada pois seu status é '${task.status}'.`});
        task.status = 'pending_approval';
        task.completedAt = new Date();
        if (maintenance_required !== undefined) task.maintenance_required = maintenance_required;
        if (maintenance_notes) task.maintenance_notes = maintenance_notes;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao finalizar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

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


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    startTask,
    finishTask,
    uploadProofImage,
};