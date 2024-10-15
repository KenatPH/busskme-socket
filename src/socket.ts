import { log } from 'console';
import { Server, Socket } from 'socket.io';
const moment = require('moment');

let timers: { [key: string]: NodeJS.Timeout } = {};
let isPaused: { [key: string]: boolean } = {};
let tiempoRecorido: { [key: string]: number } = {};

export const handleSocketConnection = (io: Server, socket: Socket) => {

        // socket.on('connection',  (client) => {
        //     console.log("hello", client);
        // });
    
        console.log('nueva solicitud de conexion', socket.id);
    
        socket.on('unirseAruta', (data) => {
        
            console.log('Usuario conectado unirseAruta BUS');
            console.log(data);
            let rutaid = data.rutaid
            let choferid = data.choferid
            if (data && data.rutaid && data.action === "locationUpdated" ) {
                console.log("actualizo ubicacion" );
                rutaid = data.rutaid
                io.to(rutaid).emit('locationUpdated', data);
                // io.to('admin').emit('locationUpdatedAdmin', data);
                io.to(choferid).emit('locationUpdatedAdmin', data);
            }
            
            if (data.action === "cliente"){
                socket.join(rutaid);
            }

            if (data.action === "admin") {
                // socket.join('admin');
                socket.join(choferid);
            }

            
        })


        socket.on('servicioTaxi', (data) => {

            console.log('Usuario conectado para servicio taxi');
            // console.log(data);

            let userid = data.userid
            if (data && data.action === "locationUpdatedTaxi") {
                console.log("actualizo ubicacion");
                // io.emit(`user_${userid}`, data);
                io.to(`user_${userid}`).emit('locationUpdatedTaxi', data);
            }


            if (data.action === "cliente") {
                socket.join(`user_${userid}`);
            }

        })


        socket.on('solicitudDeServicio', (data) => {

            console.log('Usuario conectado a solicitudDeServicio');
            // console.log(data);
            let userid = data.userid
            if (data && data.userid && data.action === "Aceptada") {
                console.log("solicitud aceptada");
                userid = data.userid
                io.to(`user_${userid}`).emit('solicitudAceptada', data.solicitud);
            }

            if (data.action === "cliente") {
                socket.join(`user_${userid}`);
            }


        })




        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });



};
