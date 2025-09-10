

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Outlet, useLocation } from 'react-router-dom'
import LogoutButton from '../LogoutButton/LogoutButton'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import * as API from "../../Endpoint/Endpoint"

export default function NavigationBar() {
  const [uData, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/admin' },
    { name: 'Sales', href: '/admin/sell' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Reports', href: '/admin/reports' },
    { name: 'Inventory', href: '/admin/inventory' },
  ]

  useEffect(() => {
    axiosInstance.get(API.PROFILE)
      .then((res) => setData(res.data))
      .catch((err) => {
        const message = err.response?.data?.message || "Failed to fetch profile."
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 text-white shadow-md">
        {({ open, close }) => (   // ✅ access close() to manually close panel
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">

                {/* Left: Logo */}
                <div className="flex items-center text-xl font-bold">
                  <Link to="/admin">LOGO</Link>
                </div>

                {/* Right side: nav + profile + toggle */}
                <div className="flex items-center space-x-3">

                  {/* Desktop navigation links (now before profile) */}
                  <div className="hidden sm:flex sm:space-x-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex rounded-full focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      {uData?.image ? (
                        <img
                          src={`http://localhost:5351/${uData.image}`}
                          alt="User"
                          className="h-8 w-8 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                          ?
                        </div>
                      )}
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-gray-800 shadow-lg py-1">
                      <MenuItem>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300">Your Profile</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300">Settings</Link>
                      </MenuItem>
                      <MenuItem>
                        <div className="block px-4 py-2 text-sm text-gray-300 cursor-pointer">
                          <LogoutButton />
                        </div>
                      </MenuItem>
                    </MenuItems>
                  </Menu>

                  {/* Mobile toggle (after profile) */}
                  <div className="sm:hidden">
                    <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile navigation panel */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => close()}  // ✅ auto-close when clicked
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <Outlet />
    </>
  )
}