import cluster from 'node:cluster';
import os from 'node:os';
import { createServer } from './server.js';

const numCPUs = os.cpus().length;


    if (cluster.isPrimary){
        for(let i;i<numCPUs;i++){
            cluster.fork();
        }
    }else{
        console.log(`Worker ${process.pid} starting server...`);
        createServer();
    }  

