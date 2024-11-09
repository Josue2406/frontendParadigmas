import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7062/eventHub") // Cambia la URL según tu configuración
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export async function startConnection() {
    try {
        await connection.start();
        console.log('SignalR conectado');
    } catch (err) {
        console.error('Error al conectar SignalR', err);
        setTimeout(startConnection, 5000); // Reintento en caso de fallo
    }
}

export function onReceiveEvent(callback: (event: any) => void) {
    connection.on('ReceiveEvent', callback);
}
// Llamar a connectionStart() para establecer la conexión

export default connection;

/*


import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:7062/eventHub") // Cambia esta URL según la configuración de tu backend
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

// Función para iniciar la conexión
export async function connectionStart() {
    try {
        await connection.start();
        console.log("Conexión SignalR iniciada");
    } catch (err) {
        console.error("Error en la conexión SignalR:", err);
        setTimeout(connectionStart, 5000); // Reintentar conexión
    }
}

// Función para registrar un manejador para recibir eventos
export function onReceiveEvent(callback: (event: any) => void) {
    connection.on("ReceiveEvent", callback);
}

// Llamar a connectionStart() para establecer la conexión
connectionStart();

export default connection;
*/