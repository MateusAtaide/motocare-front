import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "./GraficoGastos.css";

function GraficoGastos({ manutencoes }) {

    const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
    ];

    const gastosPorMes = manutencoes.reduce(
        (resultado, manutencao) => {

            if (!manutencao.data) {
                return resultado;
            }

            const [ano, mes] =
                manutencao.data.split("-");

            const chave = `${ano}-${mes}`;

            if (!resultado[chave]) {
                resultado[chave] = {
                    chave,
                    ano: Number(ano),
                    mes: Number(mes),
                    valor: 0
                };
            }

            resultado[chave].valor +=
                Number(manutencao.valor) || 0;

            return resultado;
        },
        {}
    );

    const dados = Object.values(gastosPorMes)
        .sort((a, b) => {
            if (a.ano !== b.ano) {
                return a.ano - b.ano;
            }

            return a.mes - b.mes;
        })
        .map((item) => ({
            periodo: `${meses[item.mes - 1]}/${String(
                item.ano
            ).slice(-2)}`,

            valor: item.valor
        }));

    function formatarMoeda(valor) {
        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    if (dados.length === 0) {
        return (
            <div className="grafico-vazio">
                Nenhum gasto registrado.
            </div>
        );
    }

    return (
        <div className="grafico-container">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart data={dados}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="periodo"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(valor) => [
                            formatarMoeda(valor),
                            "Gastos"
                        ]}
                    />

                    <Bar
                        dataKey="valor"
                        fill="#2563eb"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default GraficoGastos;