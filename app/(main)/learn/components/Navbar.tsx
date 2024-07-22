import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export const Navbar = ({ title }: Props) => {
  return (
    <nav className="sticky top-0 bg-white pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/courses">
        <Button variant="defaultOutline" size="sm">
          <ArrowLeft className="h-8 w-10 stroke-2 text-neutral-400" />
        </Button>
      </Link>

      <h1 className="text-3xl font-bold">{title}</h1>

      <div />
    </nav>
  );
};
