"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnhancedLogin() {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    rut: "",
    diagnostico: "Peritonitis",
    contrasena: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      role === "Paciente"
        ? formData
        : {
            nombre: formData.nombre,
            rut: formData.rut,
            contrasena: formData.contrasena,
          };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, role }),
      });

      if (res.ok) {
        const { token, role } = await res.json();

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userData", JSON.stringify(payload));

        router.push(role === "Paciente" ? "/home-pacient" : "/home-hospital");
      } else {
        throw new Error("Error en el registro");
      }
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="flex items-center">
            {step !== "role" && (
              <ChevronLeft
                className="w-6 h-6 mr-2 cursor-pointer"
                onClick={() => setStep("role")}
              />
            )}
            <span>Registro - {role || "Seleccione Rol"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          {step === "role" ? (
            <div className="space-y-4">
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  setRole("Paciente");
                  setStep("form");
                }}
              >
                Registrarse como Paciente
              </Button>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  setRole("Médico");
                  setStep("form");
                }}
              >
                Registrarse como Médico
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
              <Input
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                placeholder="RUT"
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
              {role === "Paciente" && (
                <>
                  <Input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Teléfono"
                    required
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <Input
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Dirección"
                    required
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <Select
                    name="diagnostico"
                    value={formData.diagnostico}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "diagnostico", value },
                      })
                    }
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Seleccione diagnóstico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Peritonitis">Peritonitis</SelectItem>
                      {/* Add more diagnoses as needed */}
                    </SelectContent>
                  </Select>
                </>
              )}
              <Input
                name="contrasena"
                type="password"
                value={formData.contrasena}
                onChange={handleInputChange}
                placeholder="Contraseña"
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Registrarse como {role}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
