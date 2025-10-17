

import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import * as API from "../../Endpoint/Endpoint";

export default function NavigationBar() {
  const [uData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const location = useLocation();

  console.log(loading,error);
  const navigation = [
    { name: "Home", href: "/admin", icon: HomeIcon },
    { name: "Users", href: "/admin/users", icon: UsersIcon },
    { name: "Reports", href: "/admin/reports", icon: ChartBarIcon },
    {
      name: "Inventory",
      icon: ArchiveBoxIcon,
      children: [
        { name: "Product", href: "/admin/product" },
        { name: "Sales", href: "/admin/sales" },
        { name: "Company", href: "/admin/company" },
        { name: "Category", href: "/admin/category" },
      ],
    },
    {
      name: "CRM",
      icon: FolderIcon,
      children: [
        { name: "Leads", href: "/admin/crm/leads" },
        { name: "Opportunities", href: "/admin/crm/opportunities" },
        { name: "Pre-Sales", href: "/admin/crm/presales" },
        { name: "Cases", href: "/admin/crm/cases" },
      ],
    },
  ];

  useEffect(() => {
    axiosInstance
      .get(API.PROFILE)
      .then((res) => setData(res.data))
      .catch((err) => {
        const message = err.response?.data?.message || "Failed to fetch profile.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleDropdownToggle = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ===== TOP NAVBAR ===== */}
      <div className="bg-gray-800 border-b h-15 flex items-center justify-between px-4 sm:px-6 shadow-lg sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden inline-flex items-center justify-center rounded-md text-gray-200 hover:bg-gray-700 p-1.5"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>

          <h1 className="text-lg font-bold text-white">LOGO</h1>
        </div>

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-bold">
            {uData?.image ? (
              <img
                src={`http://localhost:5351/${uData.image}`}
                alt="User"
                className="w-9 h-9 rounded-full object-cover border"
              />
            ) : (
              uData?.name?.charAt(0).toUpperCase() || "?"
            )}
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg py-1 z-20">
            <MenuItem>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Your Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                <LogoutButton />
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      {/* ===== MAIN SECTION (SIDEBAR + OUTLET) ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden sm:flex sm:flex-col sm:w-64 bg-[#1e293b] text-gray-300 overflow-y-auto">
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className={classNames(
                      "flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white transition",
                      openDropdown === item.name
                        ? "bg-gray-700 text-white"
                        : location.pathname.startsWith(
                            `/admin/${item.name.toLowerCase()}`
                          )
                        ? "bg-orange-500 text-white"
                        : ""
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDownIcon
                      className={classNames(
                        "h-4 w-4 transition-transform duration-300",
                        openDropdown === item.name ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {openDropdown === item.name && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={classNames(
                            location.pathname === subItem.href
                              ? "bg-orange-500 text-white"
                              : "hover:bg-gray-700 hover:text-white",
                            "block px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-700 hover:text-white",
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition"
                  )}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Outlet (Main Content) */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </div>
      </div>

      {/* ===== MOBILE SIDEBAR ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-12 left-0 w-64 h-[calc(100vh-3rem)] bg-[#1e293b] text-gray-300 shadow-lg p-4 space-y-2 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white transition"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDownIcon
                      className={classNames(
                        "h-4 w-4 transition-transform duration-300",
                        openDropdown === item.name ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {openDropdown === item.name && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={classNames(
                            location.pathname === subItem.href
                              ? "bg-orange-500 text-white"
                              : "hover:bg-gray-700 hover:text-white",
                            "block px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-700 hover:text-white",
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition"
                  )}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
