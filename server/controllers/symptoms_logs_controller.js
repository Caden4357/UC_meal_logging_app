import SymptomsLog from "../models/symtpoms_log_schema.js";

export const logSymptom = async (req, res) => {
    try {
        const symptomLog = await SymptomsLog.create(req.body);
        res.status(201).json(symptomLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSymptomsLog = async (req, res) => {
    try {
        const symptomsLog = await SymptomsLog.find({ userId: req.body.userId }).populate('symptomId');
        res.status(200).json(symptomsLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}