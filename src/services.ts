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

export const listJobs = async (): Promise<JobApplication[]> => {
    try {
        const data = await getJobs();
        return data;
    } catch (error) {
        throw new Error("Error al obtener la lista de trabajos");
    }
}

export const updatejob = async (shortID: string, newStatus: string): Promise<JobApplication> => {
    
        const listJobs = await getJobs();
        const jobIndex = listJobs.findIndex(e => e.id.startsWith(shortID));

        if (jobIndex === -1) { throw new Error('No se encontró ninguna postulación con ese ID'); }

        const verificar = Object.values(JobStatus).includes(newStatus);

        if(!verificar){
            throw new Error("El status inscrito no es valido");
        }

        listJobs[jobIndex].status = newStatus as JobStatus;

        await saveJobs(listJobs);

        return listJobs[jobIndex];

}

export const deleteJob = async (shortID: string): Promise<void> => {

    const jobs = await getJobs();
    const jobIndex = jobs.findIndex(e => e.id.startsWith(shortID));

    if(jobIndex == -1){
        throw new Error("Aplicacion no encontrada");
    }

    const newListJobs = jobs.filter(e => e.id != jobs[jobIndex]?.id);

    await saveJobs(newListJobs);
}