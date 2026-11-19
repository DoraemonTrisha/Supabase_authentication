import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <>
     <div className="flex items-center justify-center min-h-screen bg-background">
      <Button className="bg-pink-700">Click Me</Button>
    </div>
   </>
  );
}
