import fs from 'fs/promises';
import { JobApplication } from './types.js';

const FILE_PATH = './jobs.json';

export const getJobs = async (): Promise<JobApplication[]> => {
    try {
        
        const data = await fs.readFile(FILE_PATH);
        return JSON.parse(data);

    } catch (error: any) {

        if( error.code == 'ENOENT'){
            return [];
        }
        throw new Error('Error critico al leer la base de datos');
        
    }
}

export const saveJobs = async (jobs: JobApplication[]): Promise<void> => {
    const dataString = JSON.stringify(jobs, null, 2);
    await fs.writeFile(FILE_PATH, dataString, 'utf-8');
} 