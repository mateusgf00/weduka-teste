export interface IResponse<T> {
  dados: T
  mensagem: string
  sucesso: boolean
}