import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main style={{
            textAlign: "center",
            padding: "80px 20px"
        }}>
            <h1>404</h1>

            <h2>Página não encontrada</h2>

            <Link to="/">
                Voltar para o Dashboard
            </Link>
        </main>
    );
}

export default NotFound;