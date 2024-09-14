"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, User } from "lucide-react";

// Simulación de datos de usuario para pacientes
const patientData = {
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@example.com",
  birthdate: "15 de mayo de 1990",
  avatar: "/placeholder.svg?height=100&width=100",
  medicalInfo: {
    diagnosis: "Hipertensión",
    lastVisit: "1 de marzo de 2023",
  },
};

// Simulación de datos de usuario para trabajadores
const workerData = {
  firstName: "Maria",
  lastName: "González",
  email: "maria.gonzalez@hospital.com",
  birthdate: "20 de agosto de 1985",
  avatar: "/placeholder.svg?height=100&width=100",
  jobInfo: {
    position: "Enfermera",
    startDate: "15 de enero de 2015",
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole"); // Obtener el rol del usuario
    if (storedRole) {
      setRole(storedRole);
      if (storedRole === "Paciente") {
        setUser(patientData); // Cargar datos del paciente
      } else {
        setUser(workerData); // Cargar datos del trabajador
      }
    }
  }, []);

  if (!user || !role) {
    return <div>Cargando...</div>; // Mostrar loading mientras se cargan los datos
  }

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">
              {user.firstName} {user.lastName}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nombre completo</p>
                <p className="text-sm text-muted-foreground">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Correo electrónico</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Fecha de nacimiento</p>
                <p className="text-sm text-muted-foreground">
                  {user.birthdate}
                </p>
              </div>
            </div>

            {/* Información adicional según el rol */}
            {role === "Paciente" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">Diagnóstico</p>
                  <p className="text-sm text-muted-foreground">
                    {user.medicalInfo.diagnosis}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">Última visita</p>
                  <p className="text-sm text-muted-foreground">
                    {user.medicalInfo.lastVisit}
                  </p>
                </div>
              </div>
            )}

            {role === "Trabajador" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">Posición</p>
                  <p className="text-sm text-muted-foreground">
                    {user.jobInfo.position}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">Fecha de inicio</p>
                  <p className="text-sm text-muted-foreground">
                    {user.jobInfo.startDate}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
