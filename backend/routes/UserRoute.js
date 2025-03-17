import express from "express";
import { 
    loginUser,
    refreshToken,
    registerUser,
    logoutUser } from "../controllers/AuthController.js";
import {
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import {
    getRelay, 
    getRelayById,
    createRelay,
    updateRelay,
    deleteRelay
} from "../controllers/RelayController.js";
import {
    getPh, 
    getPhById,
    createPh,
    updatePh,
    deletePh
} from "../controllers/PhController.js";
import {
    getHumidity, 
    getHumidityById,
    createHumidity,
    updateHumidity,
    deleteHumidity
} from "../controllers/HumidityController.js";
import {
    getTds, 
    getTdsById,
    createTds,
    updateTds,
    deleteTds
} from "../controllers/TdsController.js";
import {
    getKelembapan, 
    getKelembapanById,
    createKelembapan,
    updateKelembapan,
    deleteKelembapan
} from "../controllers/KelembapanController.js";
import {
    getSuhua, 
    getSuhuaById,
    createSuhua,
    updateSuhua,
    deleteSuhua
} from "../controllers/SuhuaController.js";

const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get("/refresh-token", refreshToken);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/relay', getRelay);
router.get('/relay/:id', getRelayById);
router.post('/relay', createRelay);
router.patch('/relay/:id', updateRelay);
router.delete('/relay/:id', deleteRelay);
router.get('/ph', getPh);
router.get('/ph/:id', getPhById);
router.post('/ph', createPh);
router.patch('/ph/:id', updatePh);
router.delete('/ph/:id', deletePh);
router.get('/humidity', getHumidity);
router.get('/humidity/:id', getHumidityById);
router.post('/humidity', createHumidity);
router.patch('/humidity/:id', updateHumidity);
router.delete('/humidity/:id', deleteHumidity);
router.get('/tds', getTds);
router.get('/tds/:id', getTdsById);
router.post('/tds', createTds);
router.patch('/tds/:id', updateTds);
router.delete('/tds/:id', deleteTds);
router.get('/kelembapan', getKelembapan);
router.get('/kelembapan/:id', getKelembapanById);
router.post('/kelembapan', createKelembapan);
router.patch('/kelembapan/:id', updateKelembapan);
router.delete('/kelembapan/:id', deleteKelembapan);
router.get('/suhua', getSuhua);
router.get('/suhua/:id', getSuhuaById);
router.post('/suhua', createSuhua);
router.patch('/suhua/:id', updateSuhua);
router.delete('/suhua/:id', deleteSuhua);

export default router;