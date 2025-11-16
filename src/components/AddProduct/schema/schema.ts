import {z} from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const productSchema = z.object({
    title: z.string()
        .min(1, {message: 'Поле обязательно для заполнения'})
        .max(30, {message: 'Поле должно содержать максимум 30 символов'}),
    description: z.string()
        .min(1, {message: 'Поле обязательно для заполнения'})
        .max(150, {message: 'Поле должно содержать максимум 150 символов'}),
    price: z.string()
        .min(1, {message: 'Поле обязательно для заполнения'})
        .regex(/^\d+(\.\d*)?$/, { message: 'Поле должно содержать только числа' }),
    image: z.instanceof(FileList)
        .optional()
        .refine(
            (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
            `Максимальный размер файла 5MB.`
        )
        .refine(
            (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
            "Поддерживаются только .jpg, .jpeg, .png и .webp форматы."
        ),
})

export type ProductFormData = z.infer<typeof productSchema>