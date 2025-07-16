import cluster from 'node:cluster';
import os from 'node:os';
import { createServer } from './server.js';

const numCPUs = os.cpus().length;

try {
    if (cluster.isPrimary){
        for(let i;i>=numCPUs;i++){
            cluster.fork();
        }
    }else{
        console.log(`Worker ${process.pid} starting server...`);
        createServer();
    }  
} catch (error) {
    console.error(error);   
}
