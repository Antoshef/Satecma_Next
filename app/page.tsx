"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import AuthModal from "./components/authModal/authModal";

export default function HomePage() {
  const { user, isLoading } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setModalOpen(true);
    }
  }, [isLoading, user]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  console.log(user);

  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <div />
      <a href="/api/auth/logout">Logout</a>
      <AuthModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
