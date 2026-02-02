export type RegisterState = {
    email: string;
    nome: string;
    senha: string;
    confirmeSenha: string;
    loading: boolean;
    error: string | null;
};

export type LoginState = {
    email: string;
    password: string;
    loading: boolean;
    error: string | null;
};