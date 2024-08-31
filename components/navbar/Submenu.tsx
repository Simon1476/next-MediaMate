import { navbarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Submenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleMenuClick = (label: string | null) => {
    if (activeSubmenu === label) {
      setDropdownOpen(false);
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(label);
      setDropdownOpen(true);
    }
  };
  return (
    <>
      {navbarLinks.map(({ imgUrl, label, submenu }) => {
        return (
          <li
            className="relative items-center justify-center hidden gap-4 px-4 py-2 lg:flex"
            key={label}
            onClick={() => handleMenuClick(label)}
          >
            <Image src={imgUrl} alt={label} width={24} height={24} />
            <span className="text-white cursor-pointer">{label}</span>
            {dropdownOpen && activeSubmenu === label && (
              <ul className="absolute left-0 mt-2 text-white bg-gray-800 rounded shadow-lg top-full">
                {submenu.map((item) => (
                  <li key={item.label} className="px-4 py-2 hover:bg-gray-700">
                    <Link href={item.route}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

export default Submenu;
