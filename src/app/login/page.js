import React from "react";
import dynamic from "next/dynamic";
import Login from "@/components/login";

const Login = dynamic(() => import("@/src/components/login"), { ssr: false });

export default function Home() {
  return <Login />;
}
