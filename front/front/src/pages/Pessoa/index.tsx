import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PessoasService } from "../../apps/pessoas/PessoasService";
import { useState } from "react";
import { IPessoaResponse } from "../../apps/pessoas/types/IPessoaResponse";
import { Spinner } from "../../components/ui/spinner";
import { Button } from "../../components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ContactCard, EmptyContactCard } from "../../components/contact-card";

export function Pessoa() {
  const { id } = useParams<{ id: string }>();
  const [pessoa, setPessoa] = useState<IPessoaResponse>({} as IPessoaResponse);

  const navigate = useNavigate()

  const { isFetching } = useQuery({
    queryKey: ["fetch", "pessoas", id],
    queryFn: async () => {
      const response = await PessoasService.findOne(Number(id));
      setPessoa(response.dados);
      return response;
    },
    staleTime: 0,
    enabled: !!id
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["save", "pessoa"],
    mutationFn: async (pessoa?: IPessoaResponse) => {
      const { dados } = await PessoasService.save(pessoa)
      navigate(`/pessoas/${dados.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch", "pessoas"]
      })
    }
  })

  return (
    <main className="w-screen h-screen flex justify-center">
      <div className="max-w-xl w-full h-full flex flex-col items-center">
        <h1 className="font-bold text-3xl p-6">
          {!id ? "Cadastrando" : "Editando"} pessoa
        </h1>
        <div className="flex-1 flex flex-col w-full items-center gap-6">
          {isFetching && <Spinner />}
          {!isFetching && (
            <form className="w-full flex flex-col gap-2">
              <Label htmlFor="input_nome">Nome</Label>
              <Input
                id="input_nome"
                placeholder="Digite seu nome"
                defaultValue={pessoa?.nome}
                onChange={(event)=> setPessoa(prevState => ({...prevState, nome: event.target.value }))}
              />
              {!!pessoa?.id && (
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-lg">Contatos</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {pessoa?.contatos?.map((contato) => (
                      <ContactCard contato={contato} key={contato.id} />
                    ))}
                    <EmptyContactCard />
                  </div>
                </div>
              )}  
              <div className="w-full flex mt-4 gap-2">
                <Link to="/" className="w-full">
                  <Button  className="w-full" type="button" variant="outline">
                    Voltar
                  </Button>
                </Link>
                  <Button className="w-full" type="button" isLoading={isPending} onClick={()=> mutateAsync(pessoa)}>
                    Salvar
                  </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
