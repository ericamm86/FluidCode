import {
  buildDashboard,
  createEmotionalRecord,
  listEmotionalRecords
} from "../services/emotional.service.js";

export async function createEmotion(req, res, next) {
  try {
    const record = await createEmotionalRecord(req.userId, req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
}

export async function listEmotions(req, res, next) {
  try {
    const records = await listEmotionalRecords(req.userId);
    res.json(records);
  } catch (error) {
    next(error);
  }
}

export async function dashboard(req, res, next) {
  try {
    const data = await buildDashboard(req.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
