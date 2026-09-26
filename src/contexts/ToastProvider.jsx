import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import Toast from "../components/Toast/Toast";
import ToastContext from "./ToastContext";

function ToastProvider({ children }) {

    const [toast, setToast] = useState({
        mensagem: "",
        tipo: "success"
    });

    const timerRef = useRef(null);

    const mostrarToast = useCallback((
        mensagem,
        tipo = "success"
    ) => {

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setToast({
            mensagem,
            tipo
        });

        timerRef.current = setTimeout(() => {

            setToast({
                mensagem: "",
                tipo: "success"
            });

            timerRef.current = null;

        }, 3000);

    }, []);

    const fecharToast = useCallback(() => {

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        setToast({
            mensagem: "",
            tipo: "success"
        });

    }, []);

    useEffect(() => {

        return () => {

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

        };

    }, []);

    const valorContexto = useMemo(() => ({
        mostrarToast,
        fecharToast
    }), [
        mostrarToast,
        fecharToast
    ]);

    return (
        <ToastContext.Provider value={valorContexto}>

            {children}

            <Toast
                mensagem={toast.mensagem}
                tipo={toast.tipo}
            />

        </ToastContext.Provider>
    );
}

export default ToastProvider;