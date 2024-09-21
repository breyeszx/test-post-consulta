"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Trash2,
  MessageSquare,
  Gift,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Ejemplo de notificaciones para pacientes
const patientNotifications = [
  {
    id: 1,
    type: "message",
    content: "Recordatorio de cita médica",
    time: "5 min",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    content: "Resultados de exámenes disponibles",
    time: "1 hora",
    read: false,
  },
];

// Ejemplo de notificaciones para trabajadores
const workerNotifications = [
  {
    id: 1,
    type: "message",
    content: "Turno programado",
    time: "3 horas",
    read: false,
  },
  {
    id: 2,
    type: "gift",
    content: "Bonificación por rendimiento",
    time: "1 día",
    read: false,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "gift":
      return <Gift className="h-4 w-4" />;
    case "alert":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return null;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [role, setRole] = useState(null); // Estado para manejar el rol
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole"); // Obtener el rol del usuario
    if (storedRole) {
      setRole(storedRole);
      if (storedRole === "Paciente") {
        setNotifications(patientNotifications); // Cargar notificaciones para pacientes
      } else if (storedRole === "Trabajador") {
        setNotifications(workerNotifications); // Cargar notificaciones para trabajadores
      }
    } else {
      setRole("Unknown");
    }
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length); // Contar notificaciones no leídas
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  if (!role) {
    return <div>Cargando...</div>; // Mostrar loading mientras se carga el rol
  }

  return (
    <>
      <header className="bg-blue-600 text-primary-foreground p-4 flex items-center">
        <span className="font-semibold">Usuario</span>
      </header>
      <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notificaciones
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No tienes notificaciones
                </p>
              ) : (
                <ul className="space-y-4">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`flex items-start justify-between p-3 rounded-lg ${
                        notification.read ? "bg-secondary" : "bg-primary/10"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            notification.read
                              ? "bg-secondary-foreground/10"
                              : "bg-primary"
                          }`}
                        >
                          {getIcon(notification.type)}
                        </div>
                        <div>
                          <p
                            className={`text-sm ${
                              notification.read
                                ? "text-muted-foreground"
                                : "font-medium"
                            }`}
                          >
                            {notification.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            aria-label="Marcar como leída"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          aria-label="Eliminar notificación"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
