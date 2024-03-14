import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Judul harus diisi",
      invalid_type_error: "Judul harus berupa string",
    })
    .min(3, {
      message: "Judul harus lebih dari 3 karakter",
    }),
  id: z.string(),
  boardId: z.string(),
});
