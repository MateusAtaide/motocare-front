import "./CardResumo.css";

function CardResumo({
    titulo,
    valor,
    descricao,
    icone
}) {
    return (
        <article className="card-resumo">

            <div className="card-resumo-icon">
                {icone}
            </div>

            <div>
                <p className="card-resumo-titulo">
                    {titulo}
                </p>

                <strong className="card-resumo-valor">
                    {valor}
                </strong>

                {descricao && (
                    <p className="card-resumo-descricao">
                        {descricao}
                    </p>
                )}
            </div>

        </article>
    );
}

export default CardResumo;