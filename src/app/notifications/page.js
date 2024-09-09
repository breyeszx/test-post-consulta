import React from "react";
import dynamic from "next/dynamic";


const Notifications = dynamic(() => import("@/components/notifications"), { ssr: false });

export default function Home() {
  return <Notifications />;
}
