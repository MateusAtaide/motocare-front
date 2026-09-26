const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";


async function processarResposta(response) {
    let dados = null;

    try {
        dados = await response.json();
    } catch {
        dados = null;
    }

    if (!response.ok) {
        const mensagem =
            dados?.erro ||
            "Ocorreu um erro ao comunicar com a API.";

        throw new Error(mensagem);
    }

    return dados;
}


// =========================================================
// VEÍCULOS
// =========================================================

export async function listarVeiculos() {
    const response = await fetch(
        `${API_URL}/veiculos`
    );

    return processarResposta(response);
}


export async function buscarVeiculo(id) {
    const response = await fetch(
        `${API_URL}/veiculos/${id}`
    );

    return processarResposta(response);
}


export async function cadastrarVeiculo(veiculo) {
    const response = await fetch(
        `${API_URL}/veiculos`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(veiculo)
        }
    );

    return processarResposta(response);
}


export async function atualizarVeiculo(
    id,
    veiculo
) {
    const response = await fetch(
        `${API_URL}/veiculos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(veiculo)
        }
    );

    return processarResposta(response);
}


export async function excluirVeiculo(id) {
    const response = await fetch(
        `${API_URL}/veiculos/${id}`,
        {
            method: "DELETE"
        }
    );

    return processarResposta(response);
}


// =========================================================
// MANUTENÇÕES
// =========================================================

export async function listarManutencoes() {
    const response = await fetch(
        `${API_URL}/manutencoes`
    );

    return processarResposta(response);
}


export async function buscarManutencao(id) {
    const response = await fetch(
        `${API_URL}/manutencoes/${id}`
    );

    return processarResposta(response);
}


export async function cadastrarManutencao(
    manutencao
) {
    const response = await fetch(
        `${API_URL}/manutencoes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(manutencao)
        }
    );

    return processarResposta(response);
}


export async function atualizarManutencao(
    id,
    manutencao
) {
    const response = await fetch(
        `${API_URL}/manutencoes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(manutencao)
        }
    );

    return processarResposta(response);
}


export async function excluirManutencao(id) {
    const response = await fetch(
        `${API_URL}/manutencoes/${id}`,
        {
            method: "DELETE"
        }
    );

    return processarResposta(response);
}
export async function listarMarcasFipe(tipo) {
    const response = await fetch(
        `${API_URL}/fipe/marcas/${tipo}`
    );

    return processarResposta(response);
}


export async function listarModelosFipe(tipo, marca) {
    const response = await fetch(
        `${API_URL}/fipe/modelos/${tipo}/${marca}`
    );

    return processarResposta(response);
}


export async function listarAnosFipe(
    tipo,
    marca,
    modelo
) {
    const response = await fetch(
        `${API_URL}/fipe/anos/${tipo}/${marca}/${modelo}`
    );

    return processarResposta(response);
}


export async function consultarDetalhesFipe(
    tipo,
    marca,
    modelo,
    ano
) {
    const response = await fetch(
        `${API_URL}/fipe/detalhes/${tipo}/${marca}/${modelo}/${ano}`
    );

    return processarResposta(response);
}