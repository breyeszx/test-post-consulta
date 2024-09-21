import React from "react";
import dynamic from "next/dynamic";

const HomeComponent = dynamic(() => import("@/components/home_hospital"), {
  ssr: false,
});

export default function Home() {
  return <HomeComponent />;
}
