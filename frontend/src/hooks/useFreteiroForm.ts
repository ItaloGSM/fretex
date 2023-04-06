import { useState } from "react";
import { type IFreteiroFormData } from "../interfaces";
import useApi from "./useApi";
import { type SubmitHandler } from "react-hook-form";

interface Props {
    onSuccess: () => void
}

export const useFreteiroForm = ({ onSuccess }: Props) => {
    const { registerFreteiro } = useApi()
    const [error, setError] = useState("")

    const onSubmit: SubmitHandler<IFreteiroFormData> = (data) => {
        if (data.url_foto.length === 0) {
            setError("Imagem obrigatória!")
            return
        }
        const formData = new FormData();
        const { endereco, ...freteiro } = data;

        Object.entries(freteiro).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        Object.entries(endereco).forEach(([key, value]) => {
            if (value) formData.append(`endereco.${key}`, String(value));
        });

        registerFreteiro(formData)
            .then(onSuccess)
            .catch((err) => {
                const errors = err.response.data.errors
                if (errors.hasOwnProperty('email') && errors.email[0] === 'This field must be unique.') {
                    setError("Email, possui uma conta cadastrada!")
                }
                else if (errors.hasOwnProperty('cpf') && errors.cpf[0] === 'This field must be unique.') {
                    setError("CPF, possui uma conta cadastrada!")
                }
                else if (errors.hasOwnProperty('url_foto') && errors.url_foto[0].includes('Upload a valid image.')) {
                    setError("Envie uma imagem válida!")
                }
            });
    };

    return {
        onSubmit,
        error
    }
}