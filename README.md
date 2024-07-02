# Recro
Recro API

# NestJS GraphQL Resolvers Documentation

This repository contains GraphQL resolvers implemented using NestJS for managing user authentication, book management, and review functionalities.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [GraphQL Resolvers](#graphql-resolvers)
   - [UserResolver](#userresolver)
   - [ReviewResolver](#reviewresolver)
   - [BookResolver](#bookresolver)
6. [Contributing](#contributing)
7. [License](#license)

## Overview

This project uses NestJS to provide GraphQL APIs for user authentication, book management, and review functionalities. GraphQL resolvers are utilized to handle specific data operations and business logic.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (recommended version)
- npm or yarn
- PostgreSQL or any supported database (configured and running)

## Installation

Follow these steps to install dependencies and set up the project:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-directory
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   
   Create a `.env` file in the root directory and configure database connection details, JWT secret, and other environment-specific variables. In the `.env` file put the below details:

    - DATABASE_URL="postgresql://username:password@localhost:5432/recro?schema=public"
    - JWT_SECRET_KEY=SECRET_TEXT
    - PORT=3005

## Running the Project

To start the NestJS server locally, follow these steps:

```bash
npm run start:dev
# or
yarn start:dev
```

The GraphQL server will start running at `http://localhost:3000/graphql`.

## GraphQL Resolvers

### UserResolver

Handles user authentication and registration functionalities.

- **loginUser**
  - Mutation to log in a user.
  - Inputs: `loginUserType` (LoginDto)
  - Returns: `LoginResponse` containing an access token.

- **registerUser**
  - Mutation to register a new user.
  - Inputs: `registerUserType` (RegisterUserDto)
  - Returns: `RegisterUserReponse` with registration status.

### ReviewResolver

Manages CRUD operations for reviews associated with books.

- **getReviews**
  - Query to fetch reviews by book ID.
  - Inputs: `fetchReview` (FetchReview)
  - Returns: Array of `ReviewSchema`.

- **getMyReviews**
  - Authenticated query to fetch reviews by user ID.
  - Requires JWT authentication.
  - Returns: Array of `ReviewSchema`.

- **addReviews**
  - Mutation to add a new review.
  - Inputs: `addReview` (AddReviewRequest)
  - Requires JWT authentication.
  - Returns: `AddReviewResponse` indicating success or failure.

- **updateReview**
  - Mutation to update an existing review.
  - Inputs: `updateReview` (UpdateReviewRequest)
  - Requires JWT authentication.
  - Returns: `AddReviewResponse` indicating success or failure.

- **DeleteReview**
  - Mutation to delete a review by ID.
  - Inputs: `reviewId` (number)
  - Requires JWT authentication.
  - Returns: String indicating deletion status.

### BookResolver

Provides functionalities related to book management.

- **getBooks**
  - Query to fetch all books based on filtering criteria.
  - Inputs: `fetchBooksDto` (FetchBooks)
  - Returns: Array of `BooksSchema`.

- **getBookById**
  - Query to fetch a book by ID.
  - Inputs: `bookId` (number)
  - Returns: `BooksSchema` or `null`.

- **addBooks**
  - Mutation to add a new book.
  - Inputs: `addBookDto` (AddBooks)
  - Requires JWT authentication.
  - Returns: `AddBookResponse` indicating success or failure.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request with a detailed description of your modifications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Adjust `<repository-url>`, `project-directory`, and other placeholders as per your specific project details. This README documentation provides a comprehensive overview of your NestJS GraphQL resolvers, their functionalities, setup instructions, and guidelines for contribution, ensuring clarity and ease of understanding for reviewers of your assignment.