import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IGetUser } from "@/types/user";
import {
  ArrowSquareIn,
  ArrowsCounterClockwise,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { AddTeacher } from "../add-teacher";

export function TableActions({
  id,
  isActive,
}: {
  id: string;
  isActive: string | boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Opções do usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-x-2 items-center">
          <AddTeacher>
            <div>
              <ArrowSquareIn size={18} />
              Visualizar
            </div>
          </AddTeacher>
        </DropdownMenuItem>

        <TableActionsItem isActive={isActive} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TableActionsItem({ isActive }: { isActive: string | boolean }) {
  if (isActive === "Ativo") {
    return (
      <DropdownMenuItem className="gap-x-2 items-center text-red-600">
        <Trash size={18} />
        Excluir
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem className="gap-x-2 items-center text-green-600">
      <ArrowsCounterClockwise size={18} />
      Restauruar
    </DropdownMenuItem>
  );
}
