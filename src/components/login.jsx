"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Login() {
  const [role, setRole] = useState(null);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rut, setRut] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      nombre,
      role,
    };

    if (role === "Usuario") {
      payload = {
        ...payload,
        password,
      };
    } else if (role === "Funcionario") {
      payload = {
        ...payload,
        rut,
        password,
      };
    }

    // Simular un inicio de sesión exitoso
    const res = { ok: true };

    if (res.ok) {
      // Almacenar en localStorage como respaldo
      localStorage.setItem("userName", nombre);
      localStorage.setItem("userRole", role);

      // Almacenar en sessionStorage para la sesión de la pestaña actual
      sessionStorage.setItem("userName", nombre);
      sessionStorage.setItem("userRole", role);

      // Redirigir según el rol
      if (role === "Funcionario") {
        router.push("/home-hospital");
      } else if (role === "Usuario") {
        router.push("/home-pacient");
      }
    } else {
      alert("Error en el inicio de sesión");
    }
  };

  if (!role) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Seleccione su rol
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button
              onClick={() => setRole("Funcionario")}
              className="h-20 text-lg bg-blue-600 hover:bg-blue-700"
            >
              <Briefcase className="mr-2 h-6 w-6" />
              Funcionario
            </Button>
            <Button
              onClick={() => setRole("Usuario")}
              className="h-20 text-lg bg-blue-600 hover:bg-blue-700"
            >
              <User className="mr-2 h-6 w-6" />
              Usuario
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRole(null)}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
            <CardTitle className="text-2xl font-bold">Login - {role}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre
              </label>
              <Input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Braulio Reyes"
                required
              />
            </div>

            {role === "Funcionario" && (
              <div>
                <label
                  htmlFor="rut"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  RUT
                </label>
                <Input
                  id="rut"
                  type="text"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  placeholder="12.345.678-9"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Ingresar como {role}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
