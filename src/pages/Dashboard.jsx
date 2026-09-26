import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardResumo from "../components/CardResumo/CardResumo";
import GraficoGastos from "../components/GraficoGastos/GraficoGastos";

import {
    listarVeiculos,
    listarManutencoes
} from "../services/motocareService";

import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [veiculos, setVeiculos] = useState([]);
    const [manutencoes, setManutencoes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        async function carregarDashboard() {

            try {

                setCarregando(true);

                const [
                    listaVeiculos,
                    listaManutencoes
                ] = await Promise.all([
                    listarVeiculos(),
                    listarManutencoes()
                ]);

                setVeiculos([...listaVeiculos]);
                setManutencoes([...listaManutencoes]);

            } catch (erro) {

                console.error(
                    "Erro ao carregar dashboard:",
                    erro
                );

            } finally {

                setCarregando(false);
            }
        }

        carregarDashboard();

    }, []);

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

    const totalGastos = useMemo(() => {

        return manutencoes.reduce(
            (total, manutencao) =>
                total +
                (Number(manutencao.valor) || 0),
            0
        );

    }, [manutencoes]);

    const proximasManutencoes = useMemo(() => {

        return manutencoes
            .map((manutencao) => {

                const veiculo = veiculos.find(
                    (item) =>
                        item.id === manutencao.veiculoId
                );

                let distancia = null;

                if (
                    veiculo &&
                    manutencao.proximaQuilometragem
                ) {
                    distancia =
                        manutencao.proximaQuilometragem -
                        veiculo.quilometragem;
                }

                return {
                    ...manutencao,
                    distancia
                };
            })
            .filter(
                (manutencao) =>
                    manutencao.distancia !== null
            )
            .sort(
                (a, b) =>
                    a.distancia - b.distancia
            );

    }, [manutencoes, veiculos]);

    const proximaManutencao =
        proximasManutencoes.find(
            (manutencao) =>
                manutencao.distancia > 0
        );

    const manutencoesVencidas =
        proximasManutencoes.filter(
            (manutencao) =>
                manutencao.distancia <= 0
        );

    const veiculoPrincipal = veiculos[0];

    if (carregando) {

        return (
            <main className="dashboard">
                <div className="estado-pagina">
                    <p>
                        Carregando dashboard...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="dashboard">

            <section className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Acompanhe seus veículos e
                        mantenha as manutenções
                        sempre em dia.
                    </p>
                </div>

                <button
                    className="btn-primary"
                    onClick={() =>
                        navigate("/manutencoes")
                    }
                >
                    + Nova manutenção
                </button>

            </section>

            <section className="resumo-grid">

                <CardResumo
                    titulo="Veículos cadastrados"
                    valor={veiculos.length}
                    descricao="Veículos acompanhados"
                    icone="🏍️"
                />

                <CardResumo
                    titulo="Manutenções realizadas"
                    valor={manutencoes.length}
                    descricao="Total registrado"
                    icone="🔧"
                />

                <CardResumo
                    titulo="Gastos com manutenção"
                    valor={formatarMoeda(totalGastos)}
                    descricao="Total registrado"
                    icone="💰"
                />

                <CardResumo
                    titulo="Próxima manutenção"
                    valor={
                        proximaManutencao
                            ? `${formatarKm(
                                proximaManutencao.distancia
                            )} km`
                            : "Nenhuma"
                    }
                    descricao={
                        proximaManutencao
                            ? proximaManutencao.tipo
                            : "Tudo em dia"
                    }
                    icone="⚠️"
                />

            </section>

            {manutencoesVencidas.length > 0 && (

                <section className="dashboard-alerta">

                    <div className="alerta-icon">
                        ⚠️
                    </div>

                    <div>
                        <strong>
                            Atenção
                        </strong>

                        <p>
                            Você possui{" "}
                            {manutencoesVencidas.length}{" "}
                            {manutencoesVencidas.length === 1
                                ? "manutenção vencida"
                                : "manutenções vencidas"}.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/manutencoes")
                        }
                    >
                        Ver manutenções
                    </button>

                </section>

            )}

            <section className="dashboard-content">

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <div>
                            <h2>Meu veículo</h2>

                            <p>
                                Veículo principal
                            </p>
                        </div>

                    </div>

                    {veiculoPrincipal ? (

                        <div className="veiculo-destaque">

                            <div className="veiculo-icone">

                                {veiculoPrincipal.tipo ===
                                "Moto"
                                    ? "🏍️"
                                    : "🚗"}

                            </div>

                            <div>

                                <h3>
                                    {veiculoPrincipal.marca}{" "}
                                    {veiculoPrincipal.modelo}
                                </h3>

                                <p>
                                    Ano{" "}
                                    {veiculoPrincipal.ano}
                                </p>

                                <strong>
                                    {formatarKm(
                                        veiculoPrincipal.quilometragem
                                    )}{" "}
                                    km
                                </strong>

                            </div>

                        </div>

                    ) : (

                        <div className="dashboard-vazio">

                            <p>
                                Nenhum veículo cadastrado.
                            </p>

                            <button
                                className="btn-primary"
                                onClick={() =>
                                    navigate("/veiculos")
                                }
                            >
                                Cadastrar veículo
                            </button>

                        </div>

                    )}

                </div>

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <div>
                            <h2>
                                Próximas manutenções
                            </h2>

                            <p>
                                Acompanhe os próximos
                                serviços
                            </p>
                        </div>

                    </div>

                    {proximasManutencoes.length === 0 ? (

                        <div className="dashboard-vazio">
                            Nenhuma manutenção programada.
                        </div>

                    ) : (

                        proximasManutencoes
                            .slice(0, 3)
                            .map((manutencao) => {

                                const vencida =
                                    manutencao.distancia <= 0;

                                return (
                                    <div
                                        className={
                                            `manutencao-item ${
                                                vencida
                                                    ? "manutencao-vencida"
                                                    : ""
                                            }`
                                        }
                                        key={manutencao.id}
                                    >

                                        <span>
                                            {vencida
                                                ? "🚨"
                                                : "🔧"}
                                        </span>

                                        <div>

                                            <strong>
                                                {manutencao.tipo}
                                            </strong>

                                            <p>
                                                {vencida
                                                    ? `Vencida há ${formatarKm(
                                                        Math.abs(
                                                            manutencao.distancia
                                                        )
                                                    )} km`
                                                    : `Faltam ${formatarKm(
                                                        manutencao.distancia
                                                    )} km`}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })

                    )}

                </div>

            </section>

            <section className="dashboard-panel grafico-panel">

                <div className="panel-header">

                    <div>
                        <h2>
                            Gastos com manutenção
                        </h2>

                        <p>
                            Evolução dos gastos
                            registrados
                        </p>
                    </div>

                </div>

                <GraficoGastos
                    manutencoes={manutencoes}
                />

            </section>

        </main>
    );
}

export default Dashboard;