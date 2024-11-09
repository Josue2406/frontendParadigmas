/*import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { onReceiveEvent, startConnection } from '../services/signalRService';

interface EventDto {
    message: string;
    purchaseId: number;
    customerId: number;
    date: string;
    isNew: boolean;
}

const Dashboard: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);

    useEffect(() => {
        // Establecer conexión y registrar la escucha solo una vez
        startConnection();
    
        // Función para recibir eventos en tiempo real
        onReceiveEvent((event: EventDto | EventDto[]) => {
            console.log("Evento recibido en frontend:", event);
            if (Array.isArray(event)) {
                // Si es un array, es el conjunto de eventos antiguos
                setEvents(event);
            } else {
                // Si es un solo objeto, es un evento nuevo
                setEvents(prevEvents => [...prevEvents, event]);
            }
        });
    
    }, []);

    // Datos para la gráfica
    const data = {
        labels: events.map(event => new Date(event.date).toLocaleString()),
        datasets: [
            {
                label: 'Eventos',
                data: events.map(event => event.purchaseId), // Ajusta este dato según lo que quieras graficar
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h2>Eventos en Tiempo Real</h2>
            <Line data={data} />
            <div>
                {events.map((event, index) => (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
                        <p>{event.message}</p>
                        <p>Purchase ID: {event.purchaseId}</p>
                        <p>Customer ID: {event.customerId}</p>
                        <p>Fecha: {new Date(event.date).toLocaleString()}</p>
                        <p>{event.isNew ? 'Evento Nuevo' : 'Evento Antiguo'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
*/


/*
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { onReceiveEvent, startConnection } from '../services/signalRService';

interface ProductDto {
    id: number;
    productId: number;
    name: string;
    price: number;
}

interface EventDto {
    message: string;
    purchaseId: number;
    customerId: number;
    date: string;
    isNew: boolean;
    products: ProductDto[]; // Asegúrate de que esta propiedad esté definida
}

const Dashboard: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);

    useEffect(() => {
        // Conexión inicial de SignalR
        startConnection();

        // Función para recibir eventos en tiempo real
        onReceiveEvent((event: EventDto | EventDto[]) => {
            console.log("Evento recibido en frontend:", event);
            if (Array.isArray(event)) {
                // Si es un array, es el conjunto de eventos antiguos
                setEvents(event);
            } else {
                // Si es un solo objeto, es un evento nuevo
                setEvents(prevEvents => [...prevEvents, event]);
            }
        });
    }, []);

    // Datos para la gráfica
    const data = {
        labels: events.map(event => new Date(event.date).toLocaleString()),
        datasets: [
            {
                label: 'Eventos',
                data: events.map(event => event.purchaseId),
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h2>Eventos en Tiempo Real</h2>
            <Line data={data} />
            <div>
                {events.map((event, index) => (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
                        <p>{event.message}</p>
                        <p>Purchase ID: {event.purchaseId}</p>
                        <p>Customer ID: {event.customerId}</p>
                        <p>Fecha: {new Date(event.date).toLocaleString()}</p>
                        <p>{event.isNew ? 'Evento Nuevo' : 'Evento Antiguo'}</p>
                        <h4>Productos:</h4>
                        <ul>
                            {event.products.map((product, productIndex) => (
                                <li key={productIndex}>
                                    {product.name} - ${product.price} (ID: {product.productId})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard; */



import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { onReceiveEvent, startConnection } from '../services/signalRService';

interface ProductDto {
    id: number;
    productId: number;
    name: string;
    price: number;
}

interface EventDto {
    message: string;
    purchaseId: number;
    customerId: number;
    date: string;
    isNew: boolean;
    products: ProductDto[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);

    useEffect(() => {
        startConnection();

        onReceiveEvent((event: EventDto | EventDto[]) => {
            console.log("Evento recibido en frontend:", event);
            if (Array.isArray(event)) {
                setEvents(event);
            } else {
                setEvents(prevEvents => [...prevEvents, event]);
            }
        });
    }, []);

    // Datos para la gráfica Pie
    const pieData = events.map(event => ({
        name: `ID ${event.purchaseId}`,
        value: event.purchaseId,
    }));

    return (
        <div>
            <h2>Eventos en Tiempo Real</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div>
                {events.map((event, index) => (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
                        <p>{event.message}</p>
                        <p>Purchase ID: {event.purchaseId}</p>
                        <p>Customer ID: {event.customerId}</p>
                        <p>Fecha: {new Date(event.date).toLocaleString()}</p>
                        <p>{event.isNew ? 'Evento Nuevo' : 'Evento Antiguo'}</p>
                        <h4>Productos:</h4>
                        <ul>
                            {event.products.map((product, productIndex) => (
                                <li key={productIndex}>
                                    {product.name} - ${product.price} (ID: {product.productId})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;


