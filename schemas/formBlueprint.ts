import { z } from "zod";

const formBlueprintSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});

type formBlueprintSchemaType = z.infer<typeof formBlueprintSchema>;

export { formBlueprintSchema, type formBlueprintSchemaType };
