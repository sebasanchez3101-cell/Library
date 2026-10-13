import { ObjectId } from "mongodb";
import { BadRequestError, NotFoundError } from "../../shared/errors/AppError";
import { Genres, GenresDTO } from "./genres.model";
import { GenresRepository } from "./genresrepository";

export class GenresService {
    private readonly genresRepository = new GenresRepository();

    async create(data: GenresDTO): Promise<Genres> {
        const name = this.requireString(data?.name, "name");
        const description = data.description?.trim() || "";
        const now = new Date();

        return this.genresRepository.create({
            name,
            description,
            createdAt: now,
            updatedAt: now,
        });
    }

    async findAll(): Promise<Genres[]> {
        return this.genresRepository.findAll();
    }

    async findById(id: string): Promise<Genres> {
        const genre = await this.genresRepository.findById(this.toObjectId(id));
        if (!genre) throw new NotFoundError("Género no encontrado");
        return genre;
    }

    async update(id: string, data: GenresDTO): Promise<Genres> {
        const changes: Partial<Genres> = {};
        if (data.name !== undefined) changes.name = this.requireString(data.name, "name");
        if (data.description !== undefined) changes.description = data.description.trim();
        changes.updatedAt = new Date();

        const genre = await this.genresRepository.update(this.toObjectId(id), changes);
        if (!genre) throw new NotFoundError("Género no encontrado");
        return genre;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.genresRepository.delete(this.toObjectId(id));
        if (!deleted) throw new NotFoundError("Género no encontrado");
    }

    private requireString(value: unknown, field: string): string {
        if (typeof value !== "string" || value.trim() === "") {
            throw new BadRequestError(`El campo '${field}' es obligatorio`);
        }
        return value.trim();
    }

    private toObjectId(id: string): ObjectId {
        if (!ObjectId.isValid(id)) throw new BadRequestError(`Identificador inválido: ${id}`);
        return new ObjectId(id);
    }
}