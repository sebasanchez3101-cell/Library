import { ObjectId } from "mongodb";
import { Author } from "../author/author.model";
import { Genres } from "../genres/genres.model";

export interface Book {
    _id?: ObjectId;
    title: string;
    isbn: string;
    authorId: ObjectId;
    genreId: ObjectId;
    year?: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookDTO {
    title?: string;
    isbn?: string;
    authorId?: string;
    genreId?: string;
    year?: number;
    available?: boolean;
}

export interface BookWithDetails extends Book {
    author: Author | null;
    genre: Genres | null;
}
