"use client"
import { useEffect, useState } from 'react';

export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [role, setRole] = useState(''); // Estado para almacenar el rol
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del usuario
  
    useEffect(() => {
      // Recuperar el nombre y el rol desde sessionStorage
      const storedNombre = sessionStorage.getItem('userName');
      const storedRole = sessionStorage.getItem('userRole');
  
      if (storedNombre && storedRole) {
        setNombre(storedNombre);  // Establecemos el nombre del usuario
        setRole(storedRole);      // Establecemos el rol (Paciente o Trabajador)
      } else {
        console.error('Nombre o Rol no encontrado en sessionStorage.');
      }
  
      // Simulación de obtención de mensajes
      const fetchMessages = async () => {
        const res = await fetch('/api/messages');
        const data = await res.json();
        setMessages(data);
      };
  
      fetchMessages();
      const interval = setInterval(fetchMessages, 2000); // Actualizar mensajes cada 2 segundos
  
      return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);
  
    const sendMessage = async () => {
      if (input.trim() === '') return;
  
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `${nombre} (${role})`, // Enviar nombre y rol
          text: input,
        }),
      });
  
      setInput(''); // Limpiar el input después de enviar
    };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Chat - {role}</h1> {/* Mostramos el rol */}
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-200 text-black p-2 rounded">
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex space-x-2 bg-white mb-16">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2 rounded text-black bg-gray-50 border-black"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}
