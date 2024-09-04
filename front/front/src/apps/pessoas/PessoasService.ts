import { AxiosError } from "axios";
import { httpClient } from "../../core/httpClient";
import { IResponse } from "../../core/types/IResponse";
import { IPessoaResponse } from "./types/IPessoaResponse";
import { toast } from "sonner";

export class PessoasService {
  static async findAll(): Promise<IResponse<Array<IPessoaResponse>>> {
    try {
      const { data } = await httpClient.get<IResponse<Array<IPessoaResponse>>>('/pessoas');
      return data
    } catch (err: any) {
      const axiosError = err as AxiosError<IResponse<unknown>>
      toast.error(axiosError.response?.data.mensagem)
      return {} as IResponse<Array<IPessoaResponse>>
    }
  }

  static async findOne(id: number): Promise<IResponse<IPessoaResponse>> {
    try {
      const { data } = await httpClient.get<IResponse<IPessoaResponse>>(`/pessoas/${id}`);
      return data
    } catch (err: any) {
      const axiosError = err as AxiosError<IResponse<unknown>>
      toast.error(axiosError.response?.data.mensagem)
      return {} as IResponse<IPessoaResponse>
    }
  } 

  static async save(pessoa?: IPessoaResponse): Promise<IResponse<IPessoaResponse>> {
    try {
      if(pessoa?.id){
        const { data } = await httpClient.put<IResponse<IPessoaResponse>>(`/pessoas/${pessoa.id}`,pessoa)
        toast.success(data.mensagem);
        return data
      } else {
        const { data } = await httpClient.post<IResponse<IPessoaResponse>>(`/pessoas`,pessoa)
        toast.success(data.mensagem);
        return data
      }
    } catch (err: any) {
      const axiosError = err as AxiosError<IResponse<unknown>>
      toast.error(axiosError.response?.data.mensagem)
      return {} as IResponse<IPessoaResponse>
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      const { data } = await httpClient.delete<IResponse<IPessoaResponse>>(`/pessoas/${id}`);
      toast.success(data.mensagem);
    } catch (err: any) {
      const axiosError = err as AxiosError<IResponse<unknown>>
      toast.error(axiosError.response?.data.mensagem)
    }
  } 
}