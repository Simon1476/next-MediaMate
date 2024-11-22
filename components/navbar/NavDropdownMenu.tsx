import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

type DropdownOption = {
  label: string;
  route: string;
};

type DropdownMenuProps = {
  label: string;
  submenu: DropdownOption[];
  imgUrl: string;
};

const NavDropdownMenu = ({ label, submenu, imgUrl }: DropdownMenuProps) => {
  return (
    <DropdownMenu key={label}>
      <DropdownMenuTrigger className="items-center space-x-2 p-2 rounded-md hidden lg:flex hover:bg-gray-800">
        <Image src={imgUrl} alt={label} width={24} height={24} />
        <span className="text-white">{label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-none ">
        <div className="flex flex-col p-1 bg-gray-800 text-white ">
          {submenu.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={item.route} className="w-full  hover:bg-blue-600">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdownMenu;
