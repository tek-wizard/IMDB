import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react"
import {
  Heart,
  ListVideo,
  Lightbulb,
  FolderHeart,
  LogOut,
  Film,
} from "lucide-react"
import { Context } from "./Context"
import SignupModal from "./SignupModal"
import "../index.css"

export default function MyNav() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(Context)
  const [isSignupModalOpen, setSignupModalOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.clear()
    setUser(null)
    navigate("/")
  }

  const menuItems = [
    {
      key: "home",
      label: "Home",
      icon: <Film className="w-4 h-4" />,
      onClick: () => navigate("/"),
    },
    {
      key: "divider1",
      isDivider: true,
    },
    {
      key: "watchlist",
      label: "Watchlist",
      icon: <ListVideo className="w-4 h-4" />,
      onClick: () => navigate("/watchlist"),
    },
    {
      key: "recommendations",
      label: "Recommendations",
      icon: <Lightbulb className="w-4 h-4" />,
      onClick: () => navigate("/recommendation"),
    },
    {
      key: "favorites",
      label: "Favorites",
      icon: <Heart className="w-4 h-4" />,
      onClick: () => navigate("/favorites"),
    },
    {
      key: "collections",
      label: "Collections",
      icon: <FolderHeart className="w-4 h-4" />,
      onClick: () => navigate("/collections"),
    },
    {
      key: "divider",
      isDivider: true,
    },
    {
      key: "logout",
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4" />,
      onClick: handleSignOut,
      className: "text-danger hover:text-red-500",
    },
  ]

  return (
    <>
      <Navbar
        maxWidth="full"
        className="main-navbar bg-black/40 backdrop-blur-md border-b border-white/10"
        position="static"
      >
        <NavbarBrand>
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Film className="w-7 h-7 text-amber-300/80 group-hover:text-amber-200/90 transition-colors" />
            <span className="font-heading text-2xl tracking-widest font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-50/80 bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              CINEVAULT
            </span>
          </div>
        </NavbarBrand>

        <NavbarContent justify="end">
          {user ? (
            <Dropdown placement="bottom-end" className="my-dropdown">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  className="transition-transform cursor-pointer hover:scale-105"
                  color="secondary"
                  size="sm"
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.username}`}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="navbar-dropdown w-[200px] p-0 bg-neutral-900/95 backdrop-blur-xl"
                itemClasses={{
                  content: "text-gray-300",
                }}
                data-dropdown-id="user-dropdown"
              >
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2 data-[hover=true]:bg-transparent cursor-default border-0"
                  textValue="profile"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-gray-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {user.username}
                    </p>
                  </div>
                </DropdownItem>
                {menuItems.map((item) =>
                  item.isDivider ? (
                    <DropdownItem
                      key="divider"
                      className="h-px bg-neutral-800 p-0"
                    />
                  ) : (
                    <DropdownItem
                      key={item.key}
                      className={`
                        py-2.5 px-4 
                        data-[hover=true]:bg-neutral-800
                        ${
                          item.key === "logout"
                            ? "text-red-400 data-[hover=true]:!bg-red-900/50 data-[hover=true]:!text-red-400"
                            : "text-gray-300 data-[hover=true]:!text-white"
                        }
                      `}
                      startContent={
                        <span
                          className={`
                          ${
                            item.key === "logout"
                              ? "text-red-400"
                              : "text-gray-500"
                          }
                          data-[hover=true]:!text-inherit
                        `}
                        >
                          {item.icon}
                        </span>
                      }
                      onPress={item.onClick}
                    >
                      {item.label}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              variant="ghost"
              radius="full"
              className="font-medium text-white hover:text-purple-300 transition-colors px-6"
              onPress={() => setSignupModalOpen(true)}
            >
              Sign Up
            </Button>
          )}
        </NavbarContent>
      </Navbar>

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSignup={(user) => {
          setUser(user)
          setSignupModalOpen(false)
        }}
      />
    </>
  )
}
