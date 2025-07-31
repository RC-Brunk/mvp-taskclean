// backend/controllers/tasks/index.js

const createTask = require('./createTask');
const { getAllTasks, getTaskById } = require('./getTasks'); // Exemplo se agruparmos
const updateTask = require('./updateTask');
const deleteTask = require('./deleteTask');
const { startTask, finishTask } = require('./taskActions');
const uploadProofImage = require('./uploadProof');

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