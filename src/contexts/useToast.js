import { useContext } from "react";

import ToastContext from "./ToastContext";

function useToast() {

    const contexto = useContext(ToastContext);

    if (!contexto) {
        throw new Error(
            "useToast deve ser utilizado dentro de ToastProvider."
        );
    }

    return contexto;
}

export default useToast;