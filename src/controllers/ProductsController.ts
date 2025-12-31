import { Request, Response } from "express"
import { AppError } from "../utils/AppError"
import { z } from "zod"

class ProductsController {

    index(request: Request, response: Response) {
        const { name, price } = request.query
        const { id } = request.params
        response.send({ id, name, price })
    }
    create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z
                .string({ required_error: "Nome do produto é obrigatório" })
                .trim()
                .min(6, { message: "Nome do Produto deve ter no mínimo 6 caractéres" }),
            price: z
                .number({ required_error: "Preço do produto é obrigatório" })
                .positive({ message: "Digite um valor válido." })
        })
        const { name, price } = bodySchema.parse(request.body)

        /*
        if (!name) {
            throw new AppError("Nome do produto é obrigatório")
        }
        if (name.trim().length < 6) {
            throw new AppError("Nome do produto é obrigatório")
        }
        if (!price) {
            throw new AppError("Preço do produto é obrigatório")
        }
        if (price < 0) {
            throw new AppError("Digite um valor válido")
        }*/
        response.status(201).json({ name, price, user_id: request.user_id })
    }

}
export { ProductsController }