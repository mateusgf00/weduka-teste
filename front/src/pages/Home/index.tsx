import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { PessoasService } from "../../apps/pessoas/PessoasService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../components/ui/spinner";
import { Link } from "react-router-dom";

export function Home() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["fetch", "pessoas"],
    queryFn: PessoasService.findAll,
  });

  useEffect(() => {
    const fetchPessoas = async () => {
      const response = await PessoasService.findAll();
      console.log({ response });
      return response;
    };

    fetchPessoas();
  }, []);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["delete", "pessoa"],
    mutationFn: async (id: number) => {
      await PessoasService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch", "pessoas"],
      });
      setLoadingId(null);
    },
  });

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    try {
      await mutateAsync(id);
    } catch (error) {
      setLoadingId(null);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center">
      <div className="max-w-xl w-full h-full flex flex-col items-center">
        <h1 className="font-bold text-3xl p-6">Meus contatos</h1>
        <div className="flex-1 flex flex-col w-full items-center">
          <div className="w-full flex justify-end">
            <Link to={"/pessoas"}>
              <Button disabled={isFetching}>Cadastrar</Button>
            </Link>
          </div>

          {isFetching && <Spinner />}
          {!isFetching && (
            <Table className="mt-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contatos</TableHead>
                  <TableHead className="space-x-2 w-[150px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.dados.map((pessoa) => (
                  <TableRow key={pessoa.id}>
                    <TableCell>{pessoa.nome}</TableCell>
                    <TableCell>{pessoa.contatos.length}</TableCell>
                    <TableCell className="space-x-2 w-[150px]">
                      <Link to={`/pessoas/${pessoa.id}`}>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        isLoading={loadingId === pessoa.id}
                        onClick={() => handleDelete(pessoa.id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </main>
  );
}
