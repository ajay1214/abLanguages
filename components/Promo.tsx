import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const Promo = () => {
  return (
    <aside className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />

          <h3 className="font-bold text-lg">Upgrade to pro</h3>
        </div>

        <p className="text-muted-foreground">Get unlimited hearts and more</p>
      </div>

      <Link href="/shop" className="block">
        {/* <Button variant="super" className="bg-sky-500 w-full hover:bg-sky-400" size="lg">
          Upgrade today
        </Button> */}
        <button className="upgrade-button">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Upgrade Today</span>
        </button>
      </Link>
    </aside>
  );
};
