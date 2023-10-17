import { GetFormBlueprints } from "@/actions/formBlueprint";
import CreateFormBlueprintBtn from "@/components/CrateFormBlueprintBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { FormBlueprint } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { FaEdit, FaList } from "react-icons/fa";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <p className="font-bold text-3xl mb-8 pb-4 mt-8 border-b border-gray-200">
        My Forms
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBlueprintBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormBlueprintCards />
        </Suspense>
      </div>
    </div>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="h-[200px] w-full" />;
}

async function FormBlueprintCards() {
  const forms = await GetFormBlueprints();
  return (
    <>
      {forms.map((form) => (
        <FormBlueprintCard form={form} key={form.id} />
      ))}
    </>
  );
}

function FormBlueprintCard({ form }: { form: FormBlueprint }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="">
          <span className="truncate font-bold capitalize">{form.name}</span>
        </CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="truncate text-sm text-gray-500 h-[20px] mb-2">
        {form.description || "No description"}
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild variant={"secondary"} className="flex-1" size={"sm"}>
          <Link href={`/builder/${form.id}`}>
            <span>Edit</span>
            <FaEdit className="ml-2" />
          </Link>
        </Button>
        <Button asChild variant={"secondary"} className="flex-1" size={"sm"}>
          <Link href={`/forms/${form.id}`}>
            <span>List</span>
            <FaList className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
