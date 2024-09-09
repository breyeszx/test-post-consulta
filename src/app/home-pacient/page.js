import React from "react";
import dynamic from "next/dynamic";


const HomePatient = dynamic(() => import("@/components/home_pacient"), { ssr: false });

export default function Home() {
  return <HomePatient />;
}
