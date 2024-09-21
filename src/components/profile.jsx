"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, User, Phone, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  significantPerson: {
    name: "Ana Pérez",
    relation: "Esposa",
    phone: "+34 123 456 789",
    email: "ana.perez@example.com",
  },
};

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

function Header({ role }) {
  return (
    <header className="bg-blue-600 text-primary-foreground p-4 flex items-center justify-between">
      <span className="font-semibold text-lg">Perfil de {role}</span>
      <Link href="/">
        <Button variant="ghost" size="icon">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Cerrar sesión</span>
        </Button>
      </Link>
    </header>
  );
}

function ProfileInfo({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
      setUser(storedRole === "Usuario" ? patientData : workerData);
    }
  }, []);

  if (!user || !role) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header role={role} />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl mb-1">
                {user.firstName} {user.lastName}
              </CardTitle>
              <p className="text-muted-foreground">{role}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <ProfileInfo
                label="Nombre completo"
                value={`${user.firstName} ${user.lastName}`}
                icon={<User className="w-5 h-5 text-muted-foreground" />}
              />
              <ProfileInfo
                label="Correo electrónico"
                value={user.email}
                icon={<Mail className="w-5 h-5 text-muted-foreground" />}
              />
              <ProfileInfo
                label="Fecha de nacimiento"
                value={user.birthdate}
                icon={<Calendar className="w-5 h-5 text-muted-foreground" />}
              />
              {role === "Usuario" && (
                <>
                  <ProfileInfo
                    label="Diagnóstico"
                    value={user.medicalInfo.diagnosis}
                    icon={<Heart className="w-5 h-5 text-muted-foreground" />}
                  />
                  <ProfileInfo
                    label="Última visita"
                    value={user.medicalInfo.lastVisit}
                    icon={
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    }
                  />
                </>
              )}
              {role === "Funcionario" && (
                <>
                  <ProfileInfo
                    label="Posición"
                    value={user.jobInfo.position}
                    icon={<User className="w-5 h-5 text-muted-foreground" />}
                  />
                  <ProfileInfo
                    label="Fecha de inicio"
                    value={user.jobInfo.startDate}
                    icon={
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    }
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {role === "Usuario" && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Persona Significativa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <ProfileInfo
                  label="Nombre"
                  value={user.significantPerson.name}
                  icon={<User className="w-5 h-5 text-muted-foreground" />}
                />
                <ProfileInfo
                  label="Relación"
                  value={user.significantPerson.relation}
                  icon={<Heart className="w-5 h-5 text-muted-foreground" />}
                />
                <ProfileInfo
                  label="Teléfono"
                  value={user.significantPerson.phone}
                  icon={<Phone className="w-5 h-5 text-muted-foreground" />}
                />
                <ProfileInfo
                  label="Correo electrónico"
                  value={user.significantPerson.email}
                  icon={<Mail className="w-5 h-5 text-muted-foreground" />}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
