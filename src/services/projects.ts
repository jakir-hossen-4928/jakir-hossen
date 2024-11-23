import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, PROJECTS_COLLECTION_ID } from '@/lib/appwrite';

export const projectsService = {
  async getAllProjects() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  async addProject(project: any) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        ID.unique(),
        project
      );
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  async updateProject(projectId: string, project: any) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId,
        project
      );
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(projectId: string) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId
      );
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  async getProjectsByTechnology(technology: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        [Query.search('technologies', technology)]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching projects by technology:', error);
      throw error;
    }
  }
};