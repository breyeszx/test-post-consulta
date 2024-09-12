'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bell, Home, Search, User, List, MessageSquare } from 'lucide-react';

export default function Bottom() {
  const router = useRouter();
  const [role, setRole] = useState(null); // Estado inicial para manejar el rol
  const [error, setError] = useState(null); // Estado para manejar errores de navegación

  // Obtener el rol del usuario cuando el componente se carga
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole'); // Verifica si está guardado el rol
    if (storedRole) {
      setRole(storedRole); // Si existe, actualizamos el estado del rol
    } else {
      console.error('Rol no encontrado en localStorage.');
      setRole('Unknown'); // Manejar el caso si no se encuentra el rol
    }
  }, []);

  const handleNavigationHome = async () => {
    try {
      if (role === 'Paciente') {
        await router.push('/home-pacient'); // Redirigir a home de pacientes
      } else if (role === 'Trabajador') {
        await router.push('/home-hospital'); // Redirigir a home de trabajadores
      } else {
        throw new Error('Rol no reconocido');
      }
    } catch (err) {
      setError('Ruta no encontrada o error en la navegación.');
    }
  };

  const handleNavigation = async (path) => {
    try {
      await router.push(path); // Redirigir a rutas comunes como /perfil o /notificaciones
    } catch (err) {
      setError('Ruta no encontrada o error en la navegación.');
    }
  };

  if (role === null) {
    // Mientras el rol se está cargando, puedes mostrar un indicador de carga o nada
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-blue-600 border-t border-gray-200 dark:bg-dark dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
        {/* Botón Home (diferente para cada rol) */}
        <button
          type="button"
          onClick={handleNavigationHome} // Redirigir a /home-pacient o /home-hospital según el rol
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Home className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Inicio
          </span>
        </button>

        {/* Botón Buscar (puedes agregar lógica similar si también depende del rol) */}
        <button
          type="button"
          onClick={() => handleNavigation('/search')} // Redirigir a una ruta /buscar común
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Search className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Buscar
          </span>
        </button>

        {/* Botón para Categorias */}
        <button type='button' 
        onClick={() => handleNavigation('/category')}
        className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'
        >
        <List className='w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'></List>
        <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Categoría
        </span>
        </button>

        {/* Botón Chat (nuevo botón para el chat) */}
        <button
          type="button"
          onClick={() => handleNavigation('/chat')} // Redirigir a la página de chat
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <MessageSquare className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Chat
          </span>
        </button>

        {/* Botón Notificaciones (ruta común) */}
        <button
          type="button"
          onClick={() => handleNavigation('/notifications')} // Redirigir a una ruta /notificaciones común
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Bell className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Notificaciones
          </span>
        </button>

        {/* Botón Perfil (ruta común) */}
        <button
          type="button"
          onClick={() => handleNavigation('/profile')} // Redirigir a una ruta /perfil común
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <User className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Perfil
          </span>
        </button>
      </div>
      {error && (
        <div className="text-center text-red-500 mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
