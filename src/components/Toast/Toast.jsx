import "./Toast.css";

function Toast({
    mensagem,
    tipo = "success"
}) {

    if (!mensagem) {
        return null;
    }

    return (
        <div
            className={`toast ${tipo}`}
            role="status"
            aria-live="polite"
        >
            <span>
                {mensagem}
            </span>
        </div>
    );
}

export default Toast;