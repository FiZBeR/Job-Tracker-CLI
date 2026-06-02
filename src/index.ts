import { addJob } from "./services.js";

const main = async () => {

    const command = process.argv[2];
    const companyName = process.argv[3];
    const role = process.argv[4];

    switch(command) {
        case 'add':

            if(!companyName || !role){
                throw new Error('El nombre de la compañia y el rol son obligatorios');
            }

            try {
                const newJob = await addJob(companyName, role);
                console.log('Aplicación agregada con exito, ' + newJob);
            } catch (error: any) {
                throw new Error(error);
            }
            break;
        case 'list':
            break;
        case 'update':
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