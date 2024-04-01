import Symptoms from "../models/symptoms_schema.js";

export const getSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptoms.find();
        res.status(200).json(symptoms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createSymptom = async (req, res) => {
    try {
        const symptom = await Symptoms.create(req.body);
        res.status(201).json(symptom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
