import crypto from 'crypto';
import { JobApplication, JobStatus } from './types.js';
import { getJobs, saveJobs } from './repository.js';

export const addJob = async (companyName: string, role: string): Promise<JobApplication> => {
    try {

        const data = await getJobs();

        if(companyName.length < 3 || role.length < 3){
            throw new Error('El nombre de la compañia y el rol deben de ser de mayores a 3 caracteres');
        }

        const newjob: JobApplication = {
            id: crypto.randomUUID(),
            companyName,
            role,
            status: JobStatus.APPLIED,
            appliedDate: new Date().toISOString()
        }

        const newData = [...data, newjob];

        await saveJobs(newData);
        return newjob;
    } catch (error: any) {
        throw new Error('Error en el guardado de los datos, ' + error);
    }
}