# Library API

API REST para la gestión de una biblioteca, construida con Node.js, Express 5, TypeScript y MongoDB.

## Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
Rutas → Controladores → Servicios → Repositorios → MongoDB


rutas trabajon librería

POST   http://localhost:3000/api/v1/authors
GET    http://localhost:3000/api/v1/authors
GET    http://localhost:3000/api/v1/authors/:id
GET    http://localhost:3000/api/v1/authors/:id/books
PUT    http://localhost:3000/api/v1/authors/:id
DELETE http://localhost:3000/api/v1/authors/:id

POST   http://localhost:3000/api/v1/books
GET    http://localhost:3000/api/v1/books
GET    http://localhost:3000/api/v1/books?available=true
GET    http://localhost:3000/api/v1/books?available=false
GET    http://localhost:3000/api/v1/books/:id
PUT    http://localhost:3000/api/v1/books/:id
DELETE http://localhost:3000/api/v1/books/:id

POST   http://localhost:3000/api/v1/loans
GET    http://localhost:3000/api/v1/loans
GET    http://localhost:3000/api/v1/loans?active=true
GET    http://localhost:3000/api/v1/loans/:id
PUT    http://localhost:3000/api/v1/loans/:id
DELETE http://localhost:3000/api/v1/loans/:id

GET    http://localhost:3000/health

POST /authors

{
  "name": "Gabriel García Márquez",
  "nationality": "Colombiana",
  "birthYear": 1927
}

PUT /authors/:id

{
  "name": "Gabriel García Márquez",
  "nationality": "Colombiano",
  "birthYear": 1928
}


POST /books

{
  "title": "Cien años de soledad",
  "isbn": "978-0307474728",
  "authorId": "aquí va el ID del autor",
  "year": 1967
}

PUT /books/:id

{
  "title": "Cien años de soledad (edición especial)",
  "isbn": "978-0307474729",
  "authorId": "aquí va el ID del autor",
  "year": 1968,
  "available": true
}

POST /loans

{
  "bookId": "aquí va el ID del libro",
  "userName": "Juan Pérez",
  "loanDate": "2025-01-15T10:00:00Z"
}

PUT /loans/:id

{
  "userName": "Juan Pérez Actualizado",
  "returned": true
}


