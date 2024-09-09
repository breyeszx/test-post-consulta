// src/components/ClientWrapper.jsx
"use client"; // Marcamos este componente como del lado del cliente

import { usePathname } from 'next/navigation';
import Bottom from './bottom'; // Asegúrate de tener tu componente Bottom

export default function ClientWrapper({ children }) {
  const pathname = usePathname();

  // Ocultar la barra de navegación inferior en la página de login
  const hideBottomNav = pathname === '/' || pathname === '/login';

  return (
    <>
      {children} {/* Renderiza el contenido principal */}
      {!hideBottomNav && <Bottom />} {/* Condicionalmente muestra la barra de navegación */}
    </>
  );
}
