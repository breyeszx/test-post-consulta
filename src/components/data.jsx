"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const patientData = [
  { time: "13:00-14:00", bien: 30, mal: 15, urgencia: 5 },
  { time: "14:00-15:00", bien: 40, mal: 20, urgencia: 10 },
  { time: "15:00-16:00", bien: 35, mal: 25, urgencia: 8 },
  { time: "16:00-17:00", bien: 45, mal: 18, urgencia: 7 },
  { time: "17:00-18:00", bien: 50, mal: 22, urgencia: 6 },
  { time: "18:00-19:00", bien: 38, mal: 28, urgencia: 9 },
  { time: "19:00-20:00", bien: 42, mal: 19, urgencia: 4 },
];

const colors = {
  bien: "hsl(142, 76%, 36%)",
  mal: "hsl(45, 93%, 47%)",
  urgencia: "hsl(0, 84%, 60%)",
};

const PatientDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === patientData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? patientData.length - 1 : prev - 1));
  };

  const currentData = patientData[currentSlide];

  const totalData = patientData.reduce(
    (acc, curr) => {
      acc.bien += curr.bien;
      acc.mal += curr.mal;
      acc.urgencia += curr.urgencia;
      return acc;
    },
    { bien: 0, mal: 0, urgencia: 0 }
  );

  const pieData = Object.entries(totalData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <>
      <header className="bg-blue-600 text-primary-foreground p-4 flex items-center">
        <span className="font-semibold">Usuario</span>
      </header>
      <div className="w-full max-w-7xl mx-auto p-4 min-h-screen flex flex-col pb-16">
        <h1 className="text-3xl font-bold text-center mb-6">
          Dashboard de Pacientes
        </h1>
        <Card className="flex-grow mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              {currentData.time}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 h-full">
            <div className="relative h-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[currentData]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="bien"
                    fill={colors.bien}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="mal" fill={colors.mal} radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="urgencia"
                    fill={colors.urgencia}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2">
                <Button
                  onClick={prevSlide}
                  size="icon"
                  variant="outline"
                  aria-label="Intervalo de tiempo anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={nextSlide}
                  size="icon"
                  variant="outline"
                  aria-label="Siguiente intervalo de tiempo"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {Object.entries(currentData).map(([key, value]) => {
                if (key === "time") return null;
                return (
                  <div key={key}>
                    <p
                      className={`text-lg font-semibold ${getColorClass(key)}`}
                    >
                      {value}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Resumen Total
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between gap-2">
            <span className="font-medium capitalize">{entry.dataKey}:</span>
            <span className="font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const getColorClass = (key) => {
  switch (key) {
    case "bien":
      return "text-green-600";
    case "mal":
      return "text-yellow-600";
    case "urgencia":
      return "text-red-600";
    default:
      return "";
  }
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default PatientDashboard;
