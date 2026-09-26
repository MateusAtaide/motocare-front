import { useEffect } from "react";
import "./Modal.css";

function Modal({ aberto, onClose, children }) {

    useEffect(() => {

        function fecharComEsc(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (aberto) {
            document.addEventListener(
                "keydown",
                fecharComEsc
            );
        }

        return () => {
            document.removeEventListener(
                "keydown",
                fecharComEsc
            );
        };

    }, [aberto, onClose]);

    if (!aberto) {
        return null;
    }

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-container"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {children}
            </div>

        </div>
    );
}

export default Modal;