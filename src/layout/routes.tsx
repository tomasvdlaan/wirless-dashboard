import { RxDashboard } from "react-icons/rx";
import { PiDevices, PiStickerLight } from "react-icons/pi";
import { LiaToolsSolid } from "react-icons/lia";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { BsCardImage, BsCart, BsShopWindow } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

export const Routes = [
  {
    title: "menu",
    type: "section",
    children: [
      {
        type: "item",
        icon: <RxDashboard className="w-6 h-6" />,
        badge: (
          <div className="ml-auto rounded bg-blue-500 px-3 py-1 text-sm uppercase">
            new
          </div>
        ),
        title: "Dashboard",
        href: "/",
      },
    ],
  },

  {
    title: "Store",
    type: "section",
    children: [
      {
        type: "item",
        icon: <PiDevices className="w-6 h-6" />,
        badge: null,
        title: "Devices",
        href: "/brands/overview",
      },
      {
        type: "item",
        icon: <BsShopWindow className="w-6 h-6" />,
        badge: null,
        title: "Products",
        href: "/products",
      },
      {
        type: "item",
        icon: <LiaToolsSolid className="w-6 h-6" />,
        badge: null,
        title: "Repairs",
        href: "/repairs",
      },
      {
        type: "item",
        icon: <PiStickerLight className="w-6 h-6" />,
        badge: null,
        title: "Skins",
        href: "/skins",
      },
      {
        type: "item",
        icon: <BsCart className="w-6 h-6" />,
        badge: null,
        title: "Orders",
        href: "/orders",
      },
      {
        type: "item",
        icon: <FiUsers className="w-6 h-6" />,
        badge: null,
        title: "Users",
        href: "/users",
      },
      {
        type: "item",
        icon: <BsCardImage className="w-6 h-6" />,
        badge: null,
        title: "Images",
        href: "/images",
      },
      {
        type: "item",
        icon: <HiOutlineCog6Tooth className="w-6 h-6" />,
        badge: null,
        title: "Settings",
        href: "/settings",
      },
    ],
  },
];
