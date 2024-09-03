import { Avatar, Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

const UserSelect = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as HTMLElement)
    ) {
      setOpen(false);
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  return (
    <div className="relative flex items-center">
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="text-sm font-medium text-gray-700 bg-transparent"
      >
        <Avatar alt="User Avatar" src="/path/to/avatar.png" className="mr-1" />
      </Button>
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-40 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            <div className="block px-4 py-2 text-sm text-gray-700">
              User Name
            </div>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
              role="menuitem"
              onClick={handleClose}
            >
              Profile
            </button>
            {isLoggedIn ? (
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                role="menuitem"
                onClick={handleClose}
              >
                Logout
              </button>
            ) : (
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                role="menuitem"
                onClick={handleClose}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelect;
