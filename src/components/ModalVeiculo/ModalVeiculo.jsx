import { useEffect, useState } from "react";

import Modal from "../Modal/Modal";

import {
    listarMarcasFipe,
    listarModelosFipe,
    listarAnosFipe,
    consultarDetalhesFipe
} from "../../services/motocareService";

import "./ModalVeiculo.css";


const formularioInicial = {
    tipo: "Moto",
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    quilometragem: ""
};


function criarFormulario(veiculo) {

    if (!veiculo) {
        return { ...formularioInicial };
    }

    return {
        tipo: veiculo.tipo,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        placa: veiculo.placa,
        quilometragem: veiculo.quilometragem
    };
}


function converterTipoParaFipe(tipo) {

    if (tipo === "Moto") {
        return "motos";
    }

    if (tipo === "Carro") {
        return "carros";
    }

    return "";
}


function FormularioVeiculo({
    veiculo,
    onClose,
    onSalvar
}) {

    const modoEdicao = Boolean(veiculo);

    const [formulario, setFormulario] =
        useState(() => criarFormulario(veiculo));

    const [erro, setErro] = useState("");

    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [anos, setAnos] = useState([]);

    const [marcaSelecionada, setMarcaSelecionada] =
        useState("");

    const [modeloSelecionado, setModeloSelecionado] =
        useState("");

    const [anoSelecionado, setAnoSelecionado] =
        useState("");

    const [detalhesFipe, setDetalhesFipe] =
        useState(null);

    const [carregandoFipe, setCarregandoFipe] =
        useState(false);


    useEffect(() => {

        if (modoEdicao) {
            return;
        }

        async function carregarMarcas() {

            try {

                setCarregandoFipe(true);
                setErro("");

                const tipoFipe =
                    converterTipoParaFipe(
                        formulario.tipo
                    );

                const dados =
                    await listarMarcasFipe(tipoFipe);

                setMarcas(dados);

            } catch (erroRequisicao) {

                setErro(
                    erroRequisicao.message ||
                    "Não foi possível carregar as marcas."
                );

            } finally {

                setCarregandoFipe(false);
            }
        }

        carregarMarcas();

    }, [formulario.tipo, modoEdicao]);


    function alterarCampo(event) {

        const { name, value } = event.target;

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            [name]: value
        }));

        setErro("");
    }


    function alterarTipo(event) {

        const { value } = event.target;

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            tipo: value,
            marca: "",
            modelo: "",
            ano: ""
        }));

        setMarcaSelecionada("");
        setModeloSelecionado("");
        setAnoSelecionado("");

        setModelos([]);
        setAnos([]);
        setDetalhesFipe(null);

        setErro("");
    }


    async function alterarMarca(event) {

        const codigoMarca = event.target.value;

        setMarcaSelecionada(codigoMarca);
        setModeloSelecionado("");
        setAnoSelecionado("");

        setModelos([]);
        setAnos([]);
        setDetalhesFipe(null);

        const marca = marcas.find(
            (item) => item.valor === codigoMarca
        );

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            marca: marca?.nome || "",
            modelo: "",
            ano: ""
        }));

        if (!codigoMarca) {
            return;
        }

        try {

            setCarregandoFipe(true);
            setErro("");

            const tipoFipe =
                converterTipoParaFipe(
                    formulario.tipo
                );

            const dados =
                await listarModelosFipe(
                    tipoFipe,
                    codigoMarca
                );

            setModelos(dados);

        } catch (erroRequisicao) {

            setErro(
                erroRequisicao.message ||
                "Não foi possível carregar os modelos."
            );

        } finally {

            setCarregandoFipe(false);
        }
    }


    async function alterarModelo(event) {

        const codigoModelo = event.target.value;

        setModeloSelecionado(codigoModelo);
        setAnoSelecionado("");

        setAnos([]);
        setDetalhesFipe(null);

        const modelo = modelos.find(
            (item) => item.valor === codigoModelo
        );

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            modelo: modelo?.modelo || "",
            ano: ""
        }));

        if (!codigoModelo) {
            return;
        }

        try {

            setCarregandoFipe(true);
            setErro("");

            const tipoFipe =
                converterTipoParaFipe(
                    formulario.tipo
                );

            const dados =
                await listarAnosFipe(
                    tipoFipe,
                    marcaSelecionada,
                    codigoModelo
                );

            setAnos(dados);

        } catch (erroRequisicao) {

            setErro(
                erroRequisicao.message ||
                "Não foi possível carregar os anos."
            );

        } finally {

            setCarregandoFipe(false);
        }
    }


    async function alterarAno(event) {

        const codigoAno = event.target.value;

        setAnoSelecionado(codigoAno);
        setDetalhesFipe(null);

        const ano = anos.find(
            (item) => item.valor === codigoAno
        );

        if (!ano) {

            setFormulario((dadosAtuais) => ({
                ...dadosAtuais,
                ano: ""
            }));

            return;
        }

        try {

            setCarregandoFipe(true);
            setErro("");

            const tipoFipe =
                converterTipoParaFipe(
                    formulario.tipo
                );

            const detalhes =
                await consultarDetalhesFipe(
                    tipoFipe,
                    marcaSelecionada,
                    modeloSelecionado,
                    codigoAno
                );

            setDetalhesFipe(detalhes);

            setFormulario((dadosAtuais) => ({
                ...dadosAtuais,
                ano: detalhes.anoModelo
            }));

        } catch (erroRequisicao) {

            setErro(
                erroRequisicao.message ||
                "Não foi possível consultar a FIPE."
            );

        } finally {

            setCarregandoFipe(false);
        }
    }


    function salvar(event) {

        event.preventDefault();

        if (
            !formulario.marca.trim() ||
            !formulario.modelo.trim() ||
            !formulario.ano ||
            !formulario.placa.trim() ||
            formulario.quilometragem === ""
        ) {

            setErro(
                "Preencha todos os campos obrigatórios."
            );

            return;
        }

        if (
            Number(formulario.ano) < 1900 ||
            Number(formulario.ano) >
                new Date().getFullYear() + 1
        ) {

            setErro("Informe um ano válido.");
            return;
        }

        if (Number(formulario.quilometragem) < 0) {

            setErro(
                "A quilometragem não pode ser negativa."
            );

            return;
        }

        onSalvar({
            ...formulario,

            marca: formulario.marca.trim(),

            modelo: formulario.modelo.trim(),

            placa: formulario.placa
                .trim()
                .toUpperCase(),

            ano: Number(formulario.ano),

            quilometragem:
                Number(formulario.quilometragem)
        });
    }


    return (
        <section className="modal-veiculo">

            <div className="modal-veiculo-header">

                <div>
                    <h2>
                        {modoEdicao
                            ? "Editar veículo"
                            : "Novo veículo"}
                    </h2>

                    <p>
                        {modoEdicao
                            ? "Altere os dados do veículo."
                            : "Selecione o veículo pela Tabela FIPE."}
                    </p>
                </div>

            </div>

            <form onSubmit={salvar}>

                <div className="form-grid">

                    <div className="form-group">

                        <label htmlFor="tipo">
                            Tipo
                        </label>

                        <select
                            id="tipo"
                            name="tipo"
                            value={formulario.tipo}
                            onChange={
                                modoEdicao
                                    ? alterarCampo
                                    : alterarTipo
                            }
                        >
                            <option value="Moto">
                                Moto
                            </option>

                            <option value="Carro">
                                Carro
                            </option>
                        </select>

                    </div>


                    <div className="form-group">

                        <label htmlFor="marca">
                            Marca
                        </label>

                        {modoEdicao ? (

                            <input
                                id="marca"
                                name="marca"
                                type="text"
                                value={formulario.marca}
                                onChange={alterarCampo}
                            />

                        ) : (

                            <select
                                id="marca"
                                value={marcaSelecionada}
                                onChange={alterarMarca}
                                disabled={carregandoFipe}
                            >
                                <option value="">
                                    Selecione uma marca
                                </option>

                                {marcas.map((marca) => (
                                    <option
                                        key={marca.valor}
                                        value={marca.valor}
                                    >
                                        {marca.nome}
                                    </option>
                                ))}
                            </select>

                        )}

                    </div>


                    <div className="form-group">

                        <label htmlFor="modelo">
                            Modelo
                        </label>

                        {modoEdicao ? (

                            <input
                                id="modelo"
                                name="modelo"
                                type="text"
                                value={formulario.modelo}
                                onChange={alterarCampo}
                            />

                        ) : (

                            <select
                                id="modelo"
                                value={modeloSelecionado}
                                onChange={alterarModelo}
                                disabled={
                                    !marcaSelecionada ||
                                    carregandoFipe
                                }
                            >
                                <option value="">
                                    Selecione um modelo
                                </option>

                                {modelos.map((modelo) => (
                                    <option
                                        key={modelo.valor}
                                        value={modelo.valor}
                                    >
                                        {modelo.modelo}
                                    </option>
                                ))}
                            </select>

                        )}

                    </div>


                    <div className="form-group">

                        <label htmlFor="ano">
                            Ano
                        </label>

                        {modoEdicao ? (

                            <input
                                id="ano"
                                name="ano"
                                type="number"
                                value={formulario.ano}
                                onChange={alterarCampo}
                            />

                        ) : (

                            <select
                                id="ano"
                                value={anoSelecionado}
                                onChange={alterarAno}
                                disabled={
                                    !modeloSelecionado ||
                                    carregandoFipe
                                }
                            >
                                <option value="">
                                    Selecione o ano
                                </option>

                                {anos.map((ano) => (
                                    <option
                                        key={ano.valor}
                                        value={ano.valor}
                                    >
                                        {ano.nome}
                                    </option>
                                ))}
                            </select>

                        )}

                    </div>


                    <div className="form-group">

                        <label htmlFor="placa">
                            Placa
                        </label>

                        <input
                            id="placa"
                            name="placa"
                            type="text"
                            maxLength="7"
                            placeholder="ABC1D23"
                            value={formulario.placa}
                            onChange={alterarCampo}
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="quilometragem">
                            Quilometragem
                        </label>

                        <input
                            id="quilometragem"
                            name="quilometragem"
                            type="number"
                            min="0"
                            placeholder="48350"
                            value={formulario.quilometragem}
                            onChange={alterarCampo}
                        />

                    </div>

                </div>


                {!modoEdicao && detalhesFipe && (

                    <div className="fipe-info">

                        <strong>
                            Valor FIPE: {detalhesFipe.valor}
                        </strong>

                        <span>
                            Código FIPE:{" "}
                            {detalhesFipe.codigoFipe}
                        </span>

                        <span>
                            Referência:{" "}
                            {detalhesFipe.mesReferencia}
                        </span>

                    </div>

                )}


                {carregandoFipe && !modoEdicao && (

                    <p className="fipe-carregando">
                        Consultando Tabela FIPE...
                    </p>

                )}


                {erro && (
                    <p className="form-erro">
                        {erro}
                    </p>
                )}


                <div className="modal-actions">

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={carregandoFipe}
                    >
                        {modoEdicao
                            ? "Salvar alterações"
                            : "Cadastrar veículo"}
                    </button>

                </div>

            </form>

        </section>
    );
}


function ModalVeiculo({
    aberto,
    veiculo,
    onClose,
    onSalvar
}) {

    return (
        <Modal
            aberto={aberto}
            onClose={onClose}
        >
            {aberto && (
                <FormularioVeiculo
                    key={
                        veiculo
                            ? `editar-${veiculo.id}`
                            : "novo"
                    }
                    veiculo={veiculo}
                    onClose={onClose}
                    onSalvar={onSalvar}
                />
            )}
        </Modal>
    );
}


export default ModalVeiculo;