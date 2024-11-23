import { db } from "@/lib/firebase"; // Ensure Firebase is initialized correctly
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const PROJECTS_COLLECTION = "projects";

export const projectsService = {
  async addProject(project: any) {
    try {
      const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
      return docRef.id;
    } catch (error) {
      throw new Error("Failed to add project");
    }
  },

  async getAllProjects() {
    try {
      const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error("Failed to fetch projects");
    }
  },
};
