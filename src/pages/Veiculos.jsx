import { useEffect, useState } from "react";

import CardVeiculo from "../components/CardVeiculo/CardVeiculo";
import Modal from "../components/Modal/Modal";
import ModalVeiculo from "../components/ModalVeiculo/ModalVeiculo";
import useToast from "../contexts/useToast";

import {
    listarVeiculos,
    cadastrarVeiculo,
    atualizarVeiculo,
    excluirVeiculo
} from "../services/motocareService";

import "../styles/veiculos.css";


function Veiculos() {

    const { mostrarToast } = useToast();

    const [veiculos, setVeiculos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [modalAberto, setModalAberto] =
        useState(false);

    const [veiculoSelecionado, setVeiculoSelecionado] =
        useState(null);

    const [veiculoExcluir, setVeiculoExcluir] =
        useState(null);


    useEffect(() => {

        async function carregarInicial() {

            try {

                setCarregando(true);

                const dados =
                    await listarVeiculos();

                setVeiculos(dados);

            } catch (erro) {

                console.error(erro);

                mostrarToast(
                    erro.message ||
                    "Erro ao carregar os veículos.",
                    "error"
                );

            } finally {

                setCarregando(false);

            }
        }

        carregarInicial();

    }, [mostrarToast]);


    async function carregarVeiculos() {

        try {

            setCarregando(true);

            const dados =
                await listarVeiculos();

            setVeiculos(dados);

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                erro.message ||
                "Erro ao carregar os veículos.",
                "error"
            );

        } finally {

            setCarregando(false);

        }
    }


    function abrirCadastro() {

        setVeiculoSelecionado(null);

        setModalAberto(true);
    }


    function abrirEdicao(veiculo) {

        setVeiculoSelecionado(veiculo);

        setModalAberto(true);
    }


    function fecharModal() {

        setModalAberto(false);

        setVeiculoSelecionado(null);
    }


    async function salvarVeiculo(dados) {

        try {

            if (veiculoSelecionado) {

                await atualizarVeiculo(
                    veiculoSelecionado.id,
                    dados
                );

                mostrarToast(
                    "Veículo atualizado com sucesso!"
                );

            } else {

                await cadastrarVeiculo(dados);

                mostrarToast(
                    "Veículo cadastrado com sucesso!"
                );
            }

            await carregarVeiculos();

            fecharModal();

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                erro.message ||
                "Não foi possível salvar o veículo.",
                "error"
            );
        }
    }


    async function confirmarExclusao() {

        if (!veiculoExcluir) {
            return;
        }

        try {

            await excluirVeiculo(
                veiculoExcluir.id
            );

            await carregarVeiculos();

            mostrarToast(
                "Veículo excluído com sucesso!"
            );

        } catch (erro) {

            console.error(erro);

            mostrarToast(
                erro.message ||
                "Não foi possível excluir o veículo.",
                "error"
            );

        } finally {

            setVeiculoExcluir(null);

        }
    }


    return (
        <main className="veiculos-page">

            <section className="veiculos-header">

                <div>
                    <h1>Meus Veículos</h1>

                    <p>
                        Cadastre e gerencie os veículos
                        acompanhados pelo MotoCare.
                    </p>
                </div>

                <button
                    className="btn-primary"
                    onClick={abrirCadastro}
                >
                    + Novo veículo
                </button>

            </section>

            {carregando ? (

                <div className="estado-pagina">
                    <p>Carregando veículos...</p>
                </div>

            ) : veiculos.length === 0 ? (

                <div className="estado-pagina">

                    <span>🏍️</span>

                    <h2>
                        Nenhum veículo cadastrado
                    </h2>

                    <p>
                        Cadastre seu primeiro veículo
                        para começar.
                    </p>

                    <button
                        className="btn-primary"
                        onClick={abrirCadastro}
                    >
                        Cadastrar veículo
                    </button>

                </div>

            ) : (

                <section className="veiculos-grid">

                    {veiculos.map((veiculo) => (

                        <CardVeiculo
                            key={veiculo.id}
                            veiculo={veiculo}
                            onEditar={abrirEdicao}
                            onExcluir={
                                setVeiculoExcluir
                            }
                        />

                    ))}

                </section>

            )}

            <ModalVeiculo
                aberto={modalAberto}
                veiculo={veiculoSelecionado}
                onClose={fecharModal}
                onSalvar={salvarVeiculo}
            />

            <Modal
                aberto={!!veiculoExcluir}
                onClose={() =>
                    setVeiculoExcluir(null)
                }
            >

                <section className="confirmacao-exclusao">

                    <div className="confirmacao-icon">
                        ⚠️
                    </div>

                    <h2>Excluir veículo?</h2>

                    <p>
                        Deseja realmente excluir{" "}
                        <strong>
                            {veiculoExcluir?.marca}{" "}
                            {veiculoExcluir?.modelo}
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
                                setVeiculoExcluir(null)
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn-danger"
                            onClick={confirmarExclusao}
                        >
                            Excluir
                        </button>

                    </div>

                </section>

            </Modal>

        </main>
    );
}


export default Veiculos;