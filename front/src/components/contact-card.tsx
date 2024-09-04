import { useState } from "react";
import { IContatoResponse } from "../apps/contatos/types/IContatoResponse";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { ContatoService } from "../apps/contatos/ContactService";
import { useParams } from "react-router-dom";

interface Props {
  contato: IContatoResponse;
}

export function ContactCard({ contato }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Card className="hover:cursor-pointer hover:bg-zinc-200 transition-colors">
          <CardHeader>
            <CardTitle>{contato.tipo}</CardTitle>
            <CardDescription className="break-words">
              {contato.valor}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contato</DialogTitle>
        </DialogHeader>
        <ContactCardForm
          param={contato}
          onCloseModal={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EmptyContactCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Card className="hover:cursor-pointer hover:bg-zinc-200 transition-colors border border-dashed border-zinc-300 p-3">
          <CardHeader className="text-center">
            <CardTitle className="text-xs text-muted-foreground">
              + Contato
            </CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contato</DialogTitle>
        </DialogHeader>
        <ContactCardForm onCloseModal={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

interface ContactCardFormProps {
  param?: Partial<IContatoResponse>;
  onCloseModal: () => void;
}

function ContactCardForm({ param, onCloseModal }: ContactCardFormProps) {
  const queryClient = useQueryClient();
  const [contato, setContato] = useState(param ?? {});

  const { id: pessoaId } = useParams<{ id: string }>();

  const { mutateAsync: saveContato } = useMutation({
    mutationKey: ["save", "contato"],
    mutationFn: async (contato: Partial<IContatoResponse>) => {
      contato.pessoaId = Number(pessoaId);
      await ContatoService.save(contato);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch", "pessoas", pessoaId],
      });
      onCloseModal();
    },
  });

  const { mutateAsync: deleteContato } = useMutation({
    mutationKey: ["delete", "contato"],
    mutationFn: async (id: number) => {
      await ContatoService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch", "pessoas", pessoaId],
      });
      onCloseModal();
    },
  });

  return (
    <form className="flex flex-col gap-2">
      <Label htmlFor="input-tipo">Tipo</Label>
      <Input
        id="input-tipo"
        placeholder="Digite o tipo"
        defaultValue={contato?.tipo}
        onChange={(e) =>
          setContato((prevState) => ({ ...prevState, tipo: e.target.value }))
        }
      />
      <Label htmlFor="input-valor">Valor</Label>
      <Input
        id="input-valor"
        placeholder="Digite o valor"
        defaultValue={contato?.valor}
        onChange={(e) =>
          setContato((prevState) => ({ ...prevState, valor: e.target.value }))
        }
      />

      <div className="flex items-center w-full mt-2 gap-2">
        {!!contato.id && (
          <Button
            onClick={() => {
              if (contato.id !== undefined) {
                deleteContato(contato.id);
              }
            }}
            type="button"
            variant="destructive"
            className="w-full"
            disabled={!contato.tipo || !contato.valor}
          >
            Excluir
          </Button>
        )}
        <Button
          onClick={() => saveContato(contato)}
          type="button"
          className="w-full"
          disabled={!contato.tipo || !contato.valor}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
