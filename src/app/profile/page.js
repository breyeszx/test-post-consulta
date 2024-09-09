import React from "react";
import dynamic from "next/dynamic";


const Profile = dynamic(() => import("@/components/profile"), { ssr: false });

export default function Home() {
  return <Profile />;
}
