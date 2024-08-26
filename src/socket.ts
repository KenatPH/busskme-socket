import { log } from 'console';
import { Server, Socket } from 'socket.io';
const moment = require('moment');

let timers: { [key: string]: NodeJS.Timeout } = {};
let isPaused: { [key: string]: boolean } = {};
let tiempoRecorido: { [key: string]: number } = {};

export const handleSocketConnection = (io: Server, socket: Socket) => {
    
    // socket.on('unirseAtorneo', (data) => {

    //     console.log('Un usuario se ha conectado');

    //     console.log(data);
    //     let torneoId 
    //     if (data && data.torneoId && data.action === "jugador"){
    //         torneoId = data.torneoId
    //         socket.join(torneoId);
    //         console.log('Un usuario se ha conectado al torneo: '+torneoId);
    //         // io.to(torneoId).emit('joinedGame', `Te haz unido a la partida`);
    //     }

    //     if (data && data.torneoId && data.action === "pausarTorneo") {
    //         isPaused[data.torneoId] = true
    //         console.log('Un usuario ha pausado el torneo: ' + data.torneoId);
    //     }

    //     if (data && data.torneoId && data.action === "reaunudarTorneo") {
    //         isPaused[data.torneoId] = false
    //         console.log('Un usuario ha reanudado el torneo: ' + torneoId);
    //     }

    //     if (data && data.torneoId && data.action === "reiniciarRonda") {
    //         isPaused[data.torneoId] = true
    //         torneoId = data.torneoId
    //         // console.log('timers[torneoId]', timers[torneoId], "tiempoRecorido[torneoId] ", tiempoRecorido[torneoId]);
    //         clearInterval(timers[torneoId]);
    //         delete timers[torneoId];
    //         delete isPaused[torneoId];
    //         delete tiempoRecorido[torneoId];
    //         let endTime = moment().add(data.time, 'seconds')
    //         let now = moment();
    //         let duration = moment.duration(endTime.diff(now));
    //         let hours = Math.floor(duration.asHours());
    //         let mins = Math.floor(duration.asMinutes()) - hours * 60;
    //         let secs = Math.floor(duration.asSeconds()) - mins * 60 - hours * 3600;
    //         io.to(torneoId).emit('tiempoTorneo', `${mins}:${(secs < 10) ? '0' + secs : secs}`);
    //         console.log('Un usuario ha reiniciado el torneo: ' + data.torneoId + 'con el tiempo :', tiempoRecorido[torneoId]);
    //     }
        
    //     if (data && data.action === "iniciarTorneo" ){
    //         torneoId = data.torneoId
    //         isPaused[torneoId] = false
    //         // delete timers[torneoId];
    //         console.log("comienza el juego");
    //         // console.log('timers[torneoId]', timers[torneoId], "tiempoRecorido[torneoId] ", tiempoRecorido[torneoId] );
            
            
    //         if (!timers[torneoId]) {

    //             tiempoRecorido[torneoId] = data.time
    //             io.to(torneoId).emit('initGame', `La Partida a comenzado`);
                
                
    //             timers[torneoId] = setInterval(() => {
                    
    //                 if (!isPaused[torneoId]) {
    //                     let endTime = moment().add(tiempoRecorido[torneoId], 'seconds')
    //                     let now = moment();
    //                     let duration = moment.duration(endTime.diff(now));
    //                     let hours = Math.floor(duration.asHours());
    //                     let mins = Math.floor(duration.asMinutes()) - hours * 60;
    //                     let secs = Math.floor(duration.asSeconds()) - mins * 60 - hours * 3600;
                        
    //                     if (hours < 0 || mins < 0 || secs < 0) {
    //                         console.log('¡Tiempo agotado!  ' + torneoId);
    //                         clearInterval(timers[torneoId]);
    //                         delete timers[torneoId];
    //                         delete isPaused[torneoId];
    //                         delete tiempoRecorido[torneoId];
    //                         io.to(torneoId).emit('finalizarTorneo', `¡Torneo Finalizado!`);
    //                     } else {
    //                         io.to(torneoId).emit('tiempoTorneo', `${mins}:${(secs < 10)? '0'+secs:secs}`);
    //                         tiempoRecorido[torneoId] == tiempoRecorido[torneoId]--
    //                     }
    //                 }

    //             }, 1000)//fin del intervalo
                
    //         }

    //     }

    //     if (data && data.torneoId && data.action === "finalizarTorneo"){
    //         torneoId = data.torneoId
    //         delete timers[torneoId];
    //         delete isPaused[torneoId];
    //         io.to(torneoId).emit('finalizarTorneo', `¡Torneo Finalizado!`);
    //     }

    // });

    // socket.on('dejarTorneo', (torneoId) => {


    //     socket.leave(torneoId);

    //     // Si no hay más jugadores en la partida, detén el cronómetro
    //     if (io.sockets.adapter.rooms.get(torneoId).size === 0) {
    //         clearInterval(timers[torneoId]);
    //         delete timers[torneoId];
    //     }
    // });

    // socket.on('disconnect', () => {
    //     console.log('El usuario se ha desconectado');
    // });


    // socket.on('unirseAPartida',(data)=>{

    //     // console.log('Un usuario se ha conectado', data);
    //     // console.log('data.action === "actualizarPuntos"', data.action === "actualizarPuntos", ' data.puntaje : ', data.puntaje  );

    //     let partidaId
    //     if (data && data.partidaId && data.action === "jugador") {
    //         partidaId = data.partidaId
    //         socket.join(partidaId);
    //         console.log('Un usuario se ha conectado a partida: ' + partidaId);
    //     }
        
    //     if (data && data.partidaId && data.action === "actualizarPuntos" && data.puntaje) {
    //         console.log("actualizo puntaje", data.puntaje );
    //         partidaId = data.partidaId
    //         io.to(partidaId).emit('actualizaPuntaje', data.puntaje);
    //     }

    //     if (data && data.partidaId && data.action === "finalizarPartida") {
    //         partidaId = data.partidaId
    //         io.to(partidaId).emit('finPartida', `¡Partida Finalizada!`);
    //     }

    // })

    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        // Escuchar actualizaciones de ubicación
        socket.on('updateLocation', async (data) => {
            // const { servicioId, latitud, longitud } = data;
            // await Servicio.findByIdAndUpdate(servicioId, {
            //     ubicacion: { latitud, longitud },
            // });
            io.emit('locationUpdated', data);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });

};
