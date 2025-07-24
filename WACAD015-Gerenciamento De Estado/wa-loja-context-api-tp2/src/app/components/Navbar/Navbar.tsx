"use client";

import { useAuth } from "@/app/states/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { userEmail, logout } = useAuth();

  const pathname = usePathname();
  const rotasUsuariosDeslogados = ["/login", "/cadastro"];

  if (rotasUsuariosDeslogados.includes(pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favoritos">
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {userEmail && (
              <span className="text-muted small me-2">{userEmail}</span>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
