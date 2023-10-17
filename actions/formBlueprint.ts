"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import {
  formBlueprintSchema,
  formBlueprintSchemaType,
} from "@/schemas/formBlueprint";

class UserNotFoundError extends Error {}

export async function CreateFormBlueprint(data: formBlueprintSchemaType) {
  const validation = formBlueprintSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const form = await prisma.formBlueprint.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("something went wrong, please try again");
  }

  return form.id;
}

export async function GetFormBlueprints() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.formBlueprint.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
