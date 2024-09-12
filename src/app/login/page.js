"use client";
import React from "react";
import dynamic from "next/dynamic";


const Login = dynamic(() => import("@/components/login"), { ssr: false });

export default function Home() {
  return <Login />;
}
