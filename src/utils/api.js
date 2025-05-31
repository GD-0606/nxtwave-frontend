import axios from "axios";
import { API_BASE_URL } from "./constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLists = async () => {
  try {
    const response = await api.get("/lists");
    return response;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

export const updateLists = async (lists) => {
  try {
    const response = await api.put("/lists", { lists });
    return response;
  } catch (error) {
    console.error("Error updating lists:", error);
    throw error;
  }
};
