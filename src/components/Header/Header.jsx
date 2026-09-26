import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-container">

                <NavLink to="/" className="logo">
                    <span className="logo-icon">🏍️</span>

                    <div>
                        <h1>MotoCare</h1>
                        <span>Controle de manutenção</span>
                    </div>
                </NavLink>

                <nav className="menu">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "menu-link ativo" : "menu-link"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/veiculos"
                        className={({ isActive }) =>
                            isActive ? "menu-link ativo" : "menu-link"
                        }
                    >
                        Veículos
                    </NavLink>

                    <NavLink
                        to="/manutencoes"
                        className={({ isActive }) =>
                            isActive ? "menu-link ativo" : "menu-link"
                        }
                    >
                        Manutenções
                    </NavLink>
                </nav>

            </div>
        </header>
    );
}

export default Header;