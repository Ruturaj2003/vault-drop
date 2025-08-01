import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-cyan-100">
      <h1 className="h-16 w-16 text-black">Hello</h1>
      <Button variant={"secondary"}>Btn</Button>
    </div>
  );
}
