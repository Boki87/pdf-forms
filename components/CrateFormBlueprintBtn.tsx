"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  formBlueprintSchema,
  formBlueprintSchemaType,
} from "@/schemas/formBlueprint";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { CreateFormBlueprint } from "@/actions/formBlueprint";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateFormBlueprintBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<formBlueprintSchemaType>({
    resolver: zodResolver(formBlueprintSchema),
  });

  async function onSubmit(values: formBlueprintSchemaType) {
    try {
      setLoading(true);
      const formId = await CreateFormBlueprint(values);
      setIsOpen(false);
      router.refresh();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-[200px] flex items-center justify-center flex-col hover:cursor-pointer border-dashed border border-gray-300 hover:border-gray-600 bg-white text-gray-500 hover:text-gray-900 gap-3 hover:bg-gray-100
        "
        >
          <BsFileEarmarkPlus className="text-4xl" />
          <p className="text-2xl font-bold">Create new form</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form blueprint to start collecting data.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            loading={loading}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
