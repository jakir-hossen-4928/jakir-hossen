import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT') // Set your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID');        // Set your project ID

export const account = new Account(client);
export const databases = new Databases(client);

// Collection IDs - you'll need to create these in your Appwrite console
export const PROJECTS_COLLECTION_ID = 'YOUR_COLLECTION_ID';
export const DATABASE_ID = 'YOUR_DATABASE_ID';

export { client };