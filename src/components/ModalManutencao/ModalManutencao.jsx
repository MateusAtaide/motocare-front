import { useState } from "react";

import Modal from "../Modal/Modal";

import "./ModalManutencao.css";

const formularioInicial = {
    veiculoId: "",
    tipo: "Troca de óleo",
    data: "",
    quilometragem: "",
    valor: "",
    proximaQuilometragem: "",
    observacoes: ""
};

function criarFormulario(manutencao, veiculos) {

    if (!manutencao) {
        return {
            ...formularioInicial,
            veiculoId: veiculos[0]?.id ?? ""
        };
    }

    return {
        veiculoId: manutencao.veiculoId,
        tipo: manutencao.tipo,
        data: manutencao.data,
        quilometragem: manutencao.quilometragem,
        valor: manutencao.valor,
        proximaQuilometragem:
            manutencao.proximaQuilometragem ?? "",
        observacoes:
            manutencao.observacoes ?? ""
    };
}

function FormularioManutencao({
    manutencao,
    veiculos,
    onClose,
    onSalvar
}) {

    const [formulario, setFormulario] =
        useState(() =>
            criarFormulario(
                manutencao,
                veiculos
            )
        );

    const [erro, setErro] = useState("");

    function alterarCampo(event) {

        const { name, value } =
            event.target;

        setFormulario(
            (dadosAtuais) => ({
                ...dadosAtuais,
                [name]: value
            })
        );
    }

    function salvar(event) {

        event.preventDefault();

        if (
            !formulario.veiculoId ||
            !formulario.tipo ||
            !formulario.data ||
            formulario.quilometragem === "" ||
            formulario.valor === ""
        ) {

            setErro(
                "Preencha todos os campos obrigatórios."
            );

            return;
        }

        if (
            Number(formulario.quilometragem) < 0 ||
            Number(formulario.valor) < 0
        ) {

            setErro(
                "Quilometragem e valor não podem ser negativos."
            );

            return;
        }

        if (
            formulario.proximaQuilometragem !== "" &&
            Number(
                formulario.proximaQuilometragem
            ) <= Number(
                formulario.quilometragem
            )
        ) {

            setErro(
                "A próxima quilometragem deve ser maior que a quilometragem atual."
            );

            return;
        }

        onSalvar({
            ...formulario,

            veiculoId:
                Number(formulario.veiculoId),

            quilometragem:
                Number(formulario.quilometragem),

            valor:
                Number(formulario.valor),

            proximaQuilometragem:
                formulario.proximaQuilometragem === ""
                    ? null
                    : Number(
                        formulario.proximaQuilometragem
                    ),

            observacoes:
                formulario.observacoes.trim()
        });
    }

    return (
        <section className="modal-manutencao">

            <div className="modal-manutencao-header">

                <h2>
                    {manutencao
                        ? "Editar manutenção"
                        : "Nova manutenção"}
                </h2>

                <p>
                    Registre os dados do serviço
                    realizado.
                </p>

            </div>

            <form onSubmit={salvar}>

                <div className="form-grid">

                    <div className="form-group campo-completo">

                        <label htmlFor="veiculoId">
                            Veículo
                        </label>

                        <select
                            id="veiculoId"
                            name="veiculoId"
                            value={formulario.veiculoId}
                            onChange={alterarCampo}
                        >

                            {veiculos.map(
                                (veiculo) => (

                                    <option
                                        key={veiculo.id}
                                        value={veiculo.id}
                                    >
                                        {veiculo.marca}{" "}
                                        {veiculo.modelo}
                                        {" - "}
                                        {veiculo.placa}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    <div className="form-group">

                        <label htmlFor="tipo">
                            Tipo
                        </label>

                        <select
                            id="tipo"
                            name="tipo"
                            value={formulario.tipo}
                            onChange={alterarCampo}
                        >
                            <option>
                                Troca de óleo
                            </option>

                            <option>
                                Kit de transmissão
                            </option>

                            <option>
                                Freios
                            </option>

                            <option>
                                Pneus
                            </option>

                            <option>
                                Revisão geral
                            </option>

                            <option>
                                Outro
                            </option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label htmlFor="data">
                            Data
                        </label>

                        <input
                            id="data"
                            name="data"
                            type="date"
                            value={formulario.data}
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
                            value={
                                formulario.quilometragem
                            }
                            onChange={alterarCampo}
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="valor">
                            Valor (R$)
                        </label>

                        <input
                            id="valor"
                            name="valor"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formulario.valor}
                            onChange={alterarCampo}
                        />

                    </div>

                    <div className="form-group campo-completo">

                        <label htmlFor="proximaQuilometragem">
                            Próxima manutenção (km)
                        </label>

                        <input
                            id="proximaQuilometragem"
                            name="proximaQuilometragem"
                            type="number"
                            min="0"
                            placeholder="Opcional"
                            value={
                                formulario.proximaQuilometragem
                            }
                            onChange={alterarCampo}
                        />

                    </div>

                    <div className="form-group campo-completo">

                        <label htmlFor="observacoes">
                            Observações
                        </label>

                        <textarea
                            id="observacoes"
                            name="observacoes"
                            rows="4"
                            placeholder="Informações adicionais sobre o serviço..."
                            value={
                                formulario.observacoes
                            }
                            onChange={alterarCampo}
                        />

                    </div>

                </div>

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
                    >
                        {manutencao
                            ? "Salvar alterações"
                            : "Registrar manutenção"}
                    </button>

                </div>

            </form>

        </section>
    );
}

function ModalManutencao({
    aberto,
    manutencao,
    veiculos,
    onClose,
    onSalvar
}) {

    return (
        <Modal
            aberto={aberto}
            onClose={onClose}
        >
            {aberto && (
                <FormularioManutencao
                    key={
                        manutencao
                            ? `editar-${manutencao.id}`
                            : "nova"
                    }
                    manutencao={manutencao}
                    veiculos={veiculos}
                    onClose={onClose}
                    onSalvar={onSalvar}
                />
            )}
        </Modal>
    );
}

export default ModalManutencao;