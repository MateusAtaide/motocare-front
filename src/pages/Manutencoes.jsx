import { useEffect, useMemo, useState } from "react";

import CardManutencao from "../components/CardManutencao/CardManutencao";
import Modal from "../components/Modal/Modal";
import ModalManutencao from "../components/ModalManutencao/ModalManutencao";
import useToast from "../contexts/useToast";

import {
    listarVeiculos,
    listarManutencoes,
    cadastrarManutencao,
    atualizarManutencao,
    excluirManutencao
} from "../services/motocareService";

import "../styles/manutencoes.css";

function Manutencoes() {

    const { mostrarToast } = useToast();

    const [manutencoes, setManutencoes] =
        useState([]);

    const [veiculos, setVeiculos] =
        useState([]);

    const [carregando, setCarregando] =
        useState(true);

    const [modalAberto, setModalAberto] =
        useState(false);

    const [
        manutencaoSelecionada,
        setManutencaoSelecionada
    ] = useState(null);

    const [
        manutencaoExcluir,
        setManutencaoExcluir
    ] = useState(null);

    const [filtroVeiculo, setFiltroVeiculo] =
        useState("todos");

    const [filtroTipo, setFiltroTipo] =
        useState("todos");

    useEffect(() => {

    async function carregarInicial() {

        try {

            setCarregando(true);

            const [
                listaManutencoes,
                listaVeiculos
            ] = await Promise.all([
                listarManutencoes(),
                listarVeiculos()
            ]);

            setManutencoes(
                [...listaManutencoes]
                    .sort(
                        (a, b) =>
                            new Date(b.data) -
                            new Date(a.data)
                    )
            );

            setVeiculos([...listaVeiculos]);

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                "Erro ao carregar as manutenções.",
                "error"
            );

        } finally {

            setCarregando(false);

        }
    }

    carregarInicial();

}, [mostrarToast]);

    async function carregarDados() {

        try {

            setCarregando(true);

            const [
                listaManutencoes,
                listaVeiculos
            ] = await Promise.all([
                listarManutencoes(),
                listarVeiculos()
            ]);

            setManutencoes(
                [...listaManutencoes]
                    .sort(
                        (a, b) =>
                            new Date(b.data) -
                            new Date(a.data)
                    )
            );

            setVeiculos([...listaVeiculos]);

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                "Erro ao carregar as manutenções.",
                "error"
            );

        } finally {

            setCarregando(false);

        }
    }

    function abrirCadastro() {

        if (veiculos.length === 0) {

            mostrarToast(
                "Cadastre um veículo antes de registrar uma manutenção.",
                "warning"
            );

            return;
        }

        setManutencaoSelecionada(null);
        setModalAberto(true);
    }

    function abrirEdicao(manutencao) {

        setManutencaoSelecionada(
            manutencao
        );

        setModalAberto(true);
    }

    function fecharModal() {

        setModalAberto(false);

        setManutencaoSelecionada(null);
    }

    async function salvarManutencao(dados) {

        try {

            if (manutencaoSelecionada) {

                await atualizarManutencao(
                manutencaoSelecionada.id,
                dados
                );

                mostrarToast(
                    "Manutenção atualizada com sucesso!"
                );

            } else {

                await cadastrarManutencao(
                    dados
                );

                mostrarToast(
                    "Manutenção registrada com sucesso!"
                );
            }

            await carregarDados();

            fecharModal();

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                erro.message ||
                "Não foi possível salvar a manutenção.",
                "error"
            );
        }
    }

    async function confirmarExclusao() {

        if (!manutencaoExcluir) {
            return;
        }

        try {

            await excluirManutencao(
                manutencaoExcluir.id
            );

            await carregarDados();

            mostrarToast(
                "Manutenção excluída com sucesso!"
            );

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                erro.message ||
                "Não foi possível excluir a manutenção.",
                "error"
            );

        } finally {

            setManutencaoExcluir(null);
        }
    }

    function localizarVeiculo(veiculoId) {

        return veiculos.find(
            (veiculo) =>
                veiculo.id === veiculoId
        );
    }

    const manutencoesFiltradas =
        useMemo(() => {

            return manutencoes.filter(
                (manutencao) => {

                    const atendeVeiculo =
                        filtroVeiculo === "todos" ||
                        manutencao.veiculoId ===
                            Number(filtroVeiculo);

                    const atendeTipo =
                        filtroTipo === "todos" ||
                        manutencao.tipo ===
                            filtroTipo;

                    return (
                        atendeVeiculo &&
                        atendeTipo
                    );
                }
            );

        }, [
            manutencoes,
            filtroVeiculo,
            filtroTipo
        ]);

    return (
        <main className="manutencoes-page">

            <section className="manutencoes-header">

                <div>
                    <h1>Manutenções</h1>

                    <p>
                        Registre e acompanhe o histórico
                        de manutenção dos seus veículos.
                    </p>
                </div>

                <button
                    className="btn-primary"
                    onClick={abrirCadastro}
                >
                    + Nova manutenção
                </button>

            </section>

            <section className="filtros-manutencao">

                <div className="filtro">

                    <label htmlFor="filtroVeiculo">
                        Veículo
                    </label>

                    <select
                        id="filtroVeiculo"
                        value={filtroVeiculo}
                        onChange={(event) =>
                            setFiltroVeiculo(
                                event.target.value
                            )
                        }
                    >

                        <option value="todos">
                            Todos os veículos
                        </option>

                        {veiculos.map(
                            (veiculo) => (

                                <option
                                    key={veiculo.id}
                                    value={veiculo.id}
                                >
                                    {veiculo.marca}{" "}
                                    {veiculo.modelo}
                                </option>

                            )
                        )}

                    </select>

                </div>

                <div className="filtro">

                    <label htmlFor="filtroTipo">
                        Tipo
                    </label>

                    <select
                        id="filtroTipo"
                        value={filtroTipo}
                        onChange={(event) =>
                            setFiltroTipo(
                                event.target.value
                            )
                        }
                    >

                        <option value="todos">
                            Todos os tipos
                        </option>

                        <option value="Troca de óleo">
                            Troca de óleo
                        </option>

                        <option value="Kit de transmissão">
                            Kit de transmissão
                        </option>

                        <option value="Freios">
                            Freios
                        </option>

                        <option value="Pneus">
                            Pneus
                        </option>

                        <option value="Revisão geral">
                            Revisão geral
                        </option>

                        <option value="Outro">
                            Outro
                        </option>

                    </select>

                </div>

                <div className="resultado-filtro">

                    <strong>
                        {manutencoesFiltradas.length}
                    </strong>

                    <span>
                        {manutencoesFiltradas.length === 1
                            ? "registro encontrado"
                            : "registros encontrados"}
                    </span>

                </div>

            </section>

            {carregando ? (

                <div className="estado-pagina">
                    <p>
                        Carregando manutenções...
                    </p>
                </div>

            ) : manutencoesFiltradas.length === 0 ? (

                <div className="estado-pagina">

                    <span>🔧</span>

                    <h2>
                        Nenhuma manutenção encontrada
                    </h2>

                    <p>
                        Registre uma manutenção ou
                        altere os filtros utilizados.
                    </p>

                </div>

            ) : (

                <section className="manutencoes-grid">

                    {manutencoesFiltradas.map(
                        (manutencao) => (

                            <CardManutencao
                                key={manutencao.id}
                                manutencao={
                                    manutencao
                                }
                                veiculo={
                                    localizarVeiculo(
                                        manutencao.veiculoId
                                    )
                                }
                                onEditar={
                                    abrirEdicao
                                }
                                onExcluir={
                                    setManutencaoExcluir
                                }
                            />

                        )
                    )}

                </section>

            )}

            <ModalManutencao
                aberto={modalAberto}
                manutencao={
                    manutencaoSelecionada
                }
                veiculos={veiculos}
                onClose={fecharModal}
                onSalvar={salvarManutencao}
            />

            <Modal
                aberto={!!manutencaoExcluir}
                onClose={() =>
                    setManutencaoExcluir(null)
                }
            >

                <section className="confirmacao-exclusao">

                    <div className="confirmacao-icon">
                        ⚠️
                    </div>

                    <h2>
                        Excluir manutenção?
                    </h2>

                    <p>
                        Deseja realmente excluir{" "}
                        <strong>
                            {
                                manutencaoExcluir
                                    ?.tipo
                            }
                        </strong>
                        ?
                    </p>

                    <p className="confirmacao-aviso">
                        Esta ação não poderá ser
                        desfeita.
                    </p>

                    <div className="modal-actions">

                        <button
                            className="btn-secondary"
                            onClick={() =>
                                setManutencaoExcluir(
                                    null
                                )
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn-danger"
                            onClick={
                                confirmarExclusao
                            }
                        >
                            Excluir
                        </button>

                    </div>

                </section>

            </Modal>

        </main>
    );
}

export default Manutencoes;