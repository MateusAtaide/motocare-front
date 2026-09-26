import "./CardManutencao.css";

function CardManutencao({
    manutencao,
    veiculo,
    onEditar,
    onExcluir
}) {

    function formatarMoeda(valor) {
        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    function formatarKm(valor) {
        return Number(valor).toLocaleString(
            "pt-BR"
        );
    }

    function formatarData(data) {

        if (!data) {
            return "-";
        }

        const [ano, mes, dia] =
            data.split("-");

        return `${dia}/${mes}/${ano}`;
    }

    function obterIcone(tipo) {

        const icones = {
            "Troca de óleo": "🛢️",
            "Kit de transmissão": "⛓️",
            "Freios": "🛑",
            "Pneus": "💨",
            "Revisão geral": "🔧",
            "Outro": "⚙️"
        };

        return icones[tipo] || "🔧";
    }

    function obterStatus() {

        if (
            !manutencao.proximaQuilometragem ||
            !veiculo
        ) {
            return null;
        }

        const restante =
            manutencao.proximaQuilometragem -
            veiculo.quilometragem;

        if (restante <= 0) {

            return {
                texto: "Vencida",
                classe: "vencida"
            };
        }

        if (restante <= 1000) {

            return {
                texto: "Próxima",
                classe: "proxima"
            };
        }

        return {
            texto: "Em dia",
            classe: "em-dia"
        };
    }

    const status = obterStatus();

    return (
        <article className="card-manutencao">

            <div className="manutencao-topo">

                <div className="manutencao-identificacao">

                    <div className="manutencao-icon">
                        {obterIcone(
                            manutencao.tipo
                        )}
                    </div>

                    <div>
                        <h2>
                            {manutencao.tipo}
                        </h2>

                        <p>
                            {veiculo
                                ? `${veiculo.marca} ${veiculo.modelo}`
                                : "Veículo não encontrado"}
                        </p>
                    </div>

                </div>

                {status && (
                    <span
                        className={
                            `manutencao-status ${status.classe}`
                        }
                    >
                        {status.texto}
                    </span>
                )}

            </div>

            <div className="manutencao-dados">

                <div>
                    <span>Data</span>
                    <strong>
                        {formatarData(
                            manutencao.data
                        )}
                    </strong>
                </div>

                <div>
                    <span>Quilometragem</span>
                    <strong>
                        {formatarKm(
                            manutencao.quilometragem
                        )} km
                    </strong>
                </div>

                <div>
                    <span>Valor</span>
                    <strong>
                        {formatarMoeda(
                            manutencao.valor
                        )}
                    </strong>
                </div>

                <div>
                    <span>Próxima revisão</span>
                    <strong>
                        {manutencao.proximaQuilometragem
                            ? `${formatarKm(
                                manutencao.proximaQuilometragem
                            )} km`
                            : "Não informada"}
                    </strong>
                </div>

            </div>

            {manutencao.observacoes && (
                <div className="manutencao-observacao">
                    <span>Observações</span>

                    <p>
                        {manutencao.observacoes}
                    </p>
                </div>
            )}

            <div className="card-manutencao-actions">

                <button
                    className="btn-editar"
                    onClick={() =>
                        onEditar(manutencao)
                    }
                >
                    Editar
                </button>

                <button
                    className="btn-excluir"
                    onClick={() =>
                        onExcluir(manutencao)
                    }
                >
                    Excluir
                </button>

            </div>

        </article>
    );
}

export default CardManutencao;