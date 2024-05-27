"use client";
export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <div />
      <a href="/api/auth/logout">Logout</a>
      {children}
    </div>
  );
}
