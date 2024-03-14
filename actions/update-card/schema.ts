import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Deskripsi harus diisi",
        invalid_type_error: "Deskripsi harus berupa string",
      })
      .min(3, {
        message: "Deskripsi harus lebih dari 3 karakter",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Judul harus diisi",
        invalid_type_error: "Judul harus berupa string",
      })
      .min(3, {
        message: "Judul harus lebih dari 3 karakter",
      })
  ),
  id: z.string(),
});
