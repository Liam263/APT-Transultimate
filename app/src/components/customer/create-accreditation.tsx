"use client";

import { cn } from "@/lib/utils";
import { queryClient } from "@/providers/client";
import {
  CreateAccreditationRequest,
  createAccreditation,
  getAccreditations,
} from "@/services/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, XOctagon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertError } from "../alert";
import { ConfirmDialog } from "../common/confirm-dialog";
import { Icons } from "../icon";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface CreateAccreditationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormSchema = z.object({
  accreditationName: z
    .string()
    .min(1, { message: "This field has to be filled." }),
});

type Accreditation = {
  id: string;
  accreditation: string;
};

export const CreateAccreditation = ({
  className,
  ...props
}: CreateAccreditationProps) => {
  const [errMessage, setErrMessage] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  const columns: ColumnDef<Accreditation>[] = [
    {
      accessorKey: "accreditationName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Accreditation
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="px-4">{row.getValue("accreditationName")}</div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const accreditation = row.original;

        return (
          <div className="flex justify-center gap-2">
            <i className="cursor-pointer p-1">
              <Pencil size={16} />
            </i>
            <i
              className="cursor-pointer bg-primary p-1 rounded-sm"
              onClick={() => setShowDialog(true)}
            >
              <XOctagon color="white" size={16} />
            </i>
          </div>
        );
      },
    },
  ];

  const { data } = useQuery({
    queryKey: ["accreditation"],
    queryFn: getAccreditations,
  });

  const table = useReactTable({
    data: data ?? [],
    columns: columns as any,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accreditationName: "",
    },
  });

  const accreditationMutation = useMutation({
    mutationFn: (data: CreateAccreditationRequest) => createAccreditation(data),
    mutationKey: ["create-accreditation"],
    onSuccess(data, _variables, _context) {
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: ["accreditation"] });
        form.reset();
      }
    },
    onError: (_error, _variables, _context) => {
      setErrMessage("Can't create accreditation, please try again!");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    accreditationMutation.mutate(data);
  };

  return (
    <div>
      <h3 className="font-semibold text-xl">Create accreditation</h3>

      <div className={cn("gap-6 mt-2", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-[1fr_max(160px)] gap-4">
              <FormField
                control={form.control}
                name="accreditationName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="accreditation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>

          <AlertError errMessage={errMessage} />
        </Form>
      </div>

      <Separator className="my-4" />

      {data?.length ? (
        <div className="w-full">
          <h3 className="font-semibold text-xl">Accreditations</h3>

          <div className="flex items-center py-4">
            <Input
              placeholder="Filter accreditation..."
              value={
                (table
                  .getColumn("accreditationName")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("accreditationName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={showDialog}
        heading="Confirm delete accreditation"
        description="Are you sure to delete this accreditation"
        onOk={() => {}}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  );
};
