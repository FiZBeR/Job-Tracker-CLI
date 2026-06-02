import { addJob, deleteJob, listJobs, updatejob } from "./services.js";

const main = async () => {

    const command = process.argv[2];
    

    switch(command) {
        case 'add':

            const companyName = process.argv[3];
            const role = process.argv[4];

            if(!companyName || !role){
                throw new Error('El nombre de la compañia y el rol son obligatorios');
            }

            try {
                const newJob = await addJob(companyName, role);
                console.log('Aplicación agregada con exito, ', newJob);
            } catch (error: any) {
                throw new Error(error);
            }
            break;
        case 'list':

            try {

                const jobs = await listJobs();
                
                const formattedJobs = jobs.map(job => {
                    return {
                        "ID": job.id.substring(0, 8),
                        "Empresa": job.companyName,
                        "Rol": job.role,
                        "Estado": job.status,
                        "Fecha": new Date(job.appliedDate).toLocaleDateString()
                    }
                });

                console.table(formattedJobs);

            } catch (error: any) {
                throw new Error(error);
            }

            break;
        case 'update':

            const shortID = process.argv[3];
            const newStatus = process.argv[4];

            console.log("ID: " + shortID + "status: " + newStatus)

            if(!shortID || shortID.length < 8 || !newStatus){
                throw new Error('El ID de la aplicacion y el status son obligatorios');
            }

            try {
                const updateJob = await updatejob(shortID, newStatus);
                console.log("Trabajo actualizado", updateJob);

            } catch (error: any) {
                throw new Error("Error al actualizar la aplicación")
            }

            break;
        case 'delete':

            const shortIDDelete = process.argv[3];
            if(!shortIDDelete || shortIDDelete.length < 8 ){
                throw new Error('El ID de la aplicacion y el status son obligatorios');
            }

            try {
                const job = await deleteJob(shortIDDelete);
                console.log("Trabajo eliminado");
            } catch (error: any) {
                console.log(error);
            }
            break;
        case 'help':
            console.log(`
                Puedes usar los siguientes comandos:
                add,
                list,
                update
                `);
            break;
        default:
            console.log('No se reconoce ese comando');
            console.log('Escribe "npx ts-node src/index.ts help" para ver los comandos disponibles.')
            break;
    }
}

main();