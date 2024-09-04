import { toast } from "sonner";
import { httpClient } from "../../core/httpClient";
import { IResponse } from "../../core/types/IResponse";
import { IContatoResponse } from "./types/IContatoResponse";
import { AxiosError } from "axios";

export class ContatoService {
  static async save(contato?: Partial<IContatoResponse>): Promise<void> {
    try {
      if(contato?.id){
        const { data } = await httpClient.put<IResponse<IContatoResponse>>(`/contatos/${contato.id}`,contato)
        toast.success(data.mensagem);
      } else {
        const { data } = await httpClient.post<IResponse<IContatoResponse>>(`/contatos`,contato)
        toast.success(data.mensagem);
      }
    } catch (err: any) {
      const axiosError = err as AxiosError<IResponse<unknown>>
      toast.error(axiosError.response?.data.mensagem)
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      const { data } = await httpClient.delete<IResponse<IContatoResponse>>(`/contatos/${id}`);
      toast.success(data.mensagem);
    } catch (err: any) {
      const axiosError = err as AxiosError<IResponse<unknown>>
      toast.error(axiosError.response?.data.mensagem)
    }
  } 
};