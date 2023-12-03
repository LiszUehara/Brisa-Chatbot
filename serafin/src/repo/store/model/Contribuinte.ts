interface Contribuinte {
    cod_pessoa: number;
    pes_nome: string;
    pes_fantasia: string;
    pes_logradouro: string;
    pes_numero: string;
    pes_complemento: string;
    pes_bairro: string;
    pes_cidade: string;
    pes_uf: string;
    pes_cep: string;
    pes_fone: string;
    pes_celular: string;
    pes_cpfcnpj: string;
    pes_rg: string;
    pes_obs: string;
    pes_email: string;
    ies_situacao: string;
    resp_nome: string;
    resp_cpf: string;
    dat_cadastro: string;
    chave_cpfcnpj: string;
    cad_status: string;
}

export type { Contribuinte };
