import React from "react";
import { Link } from "react-router-dom";

import { AppRoutes } from "@/config/routes";
import { UserContext } from "@/contexts/user";
import login from "@/assets/icons/login.svg";
import logout from "@/assets/icons/logout.svg";
import fileTextRed from "@/assets/icons/fileTextRed.svg";

interface HeaderProps {
  className?: string;
  button?: React.ReactNode;
}

export function Header({ className, button }: HeaderProps) {
  const { user } = React.useContext(UserContext);

  return (
    <header
      className={`${className} flex items-center justify-between w-full h-16 bg-slate-50 shadow-md px-14`}
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <img
            className="w-8 h-8"
            src={fileTextRed}
            alt="Arquivo de texto vermelho"
          />
          <h1 className="text-slate-900	text-3xl font-bold ml-1.5">CV Fácil</h1>
        </div>
        <nav className="ml-10">
          <Link
            className="text-slate-800	text-xl font-medium transition-all hover:text-rose-500"
            to={AppRoutes.home}
          >
            Início
          </Link>
        </nav>
      </div>
      <div className="flex items-center">
        {user?.avatar ? (
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mx-5 cursor-pointer"
              src={user.avatar}
              alt={user.name}
            />
            <img
              className="w-8 h-8 cursor-pointer"
              src={logout}
              alt="Ícone de logout"
              title="Log out"
            />
          </div>
        ) : (
          <img
            className="w-8 h-8 ml-8 cursor-pointer"
            src={login}
            alt="Ícone de login"
            title="Log in"
          />
        )}
      </div>
    </header>
  );
}
