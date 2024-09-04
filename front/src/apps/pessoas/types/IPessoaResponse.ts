import { IContatoResponse } from "../../contatos/types/IContatoResponse"

export interface IPessoaResponse {
  id: number
  nome: string
  contatos: Array<IContatoResponse>
} 