import "./CardVeiculo.css";

function CardVeiculo({
    veiculo,
    onEditar,
    onExcluir
}) {

    function formatarKm(valor) {
        return Number(valor).toLocaleString("pt-BR");
    }

    return (
        <article className="card-veiculo">

            <div className="card-veiculo-topo">

                <div className="veiculo-identificacao">

                    <div className="veiculo-tipo-icon">
                        {veiculo.tipo === "Moto"
                            ? "🏍️"
                            : "🚗"}
                    </div>

                    <div>
                        <h2>
                            {veiculo.marca}{" "}
                            {veiculo.modelo}
                        </h2>

                        <p>
                            {veiculo.ano}
                            {" • "}
                            {veiculo.placa}
                        </p>
                    </div>

                </div>

                <span
                    className={
                        veiculo.ativo
                            ? "status ativo"
                            : "status inativo"
                    }
                >
                    {veiculo.ativo
                        ? "Ativo"
                        : "Inativo"}
                </span>

            </div>

            <div className="veiculo-km">

                <span>
                    Quilometragem atual
                </span>

                <strong>
                    {formatarKm(
                        veiculo.quilometragem
                    )} km
                </strong>

            </div>

            <div className="card-veiculo-actions">

                <button
                    className="btn-editar"
                    onClick={() =>
                        onEditar(veiculo)
                    }
                >
                    Editar
                </button>

                <button
                    className="btn-excluir"
                    onClick={() =>
                        onExcluir(veiculo)
                    }
                >
                    Excluir
                </button>

            </div>

        </article>
    );
}

export default CardVeiculo;