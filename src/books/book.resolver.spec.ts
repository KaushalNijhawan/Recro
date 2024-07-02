// book.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './books.service';
import { AddBooks } from './dto/add.books.dto';
import { FetchBooks } from './dto/fetchBooks.dto';
import { AddBookResponse } from './dto/addBookResponse.dto';
import { Book } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstants } from 'src/constants/messageConstants';
import { BookResolver } from './books.resolvers';

describe('BookResolver', () => {
  let resolver: BookResolver;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookResolver,
        {
          provide: BookService,
          useValue: {
            getAllBooks: jest.fn(),
            getBookById: jest.fn(),
            addBooks: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getBooks', () => {
    it('should return a list of books', async () => {
      const fetchBooksDto: FetchBooks = null;
      const books: Book[] = [{ id: 1, title: 'Test Book', author: 'Author', publishedYear:"2022" }];

      jest.spyOn(bookService, 'getAllBooks').mockResolvedValue(books);

      expect(await resolver.getBooks(fetchBooksDto)).toBe(books);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const fetchBooksDto: FetchBooks = null;

      jest.spyOn(bookService, 'getAllBooks').mockRejectedValue(new Error('Error'));

      await expect(resolver.getBooks(fetchBooksDto)).rejects.toThrow(HttpException);
      await expect(resolver.getBooks(fetchBooksDto)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('getBookById', () => {
    it('should return a book', async () => {
      const bookId = 1;
      const book: Book = { id: 1, title: 'Test Book', author: 'Author', publishedYear: "2022" };

      jest.spyOn(bookService, 'getBookById').mockResolvedValue(book);

      expect(await resolver.getBookById(bookId)).toBe(book);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const bookId = 1;

      jest.spyOn(bookService, 'getBookById').mockRejectedValue(new Error('Error'));

      await expect(resolver.getBookById(bookId)).rejects.toThrow(HttpException);
      await expect(resolver.getBookById(bookId)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('addBooks', () => {
    it('should add a book and return a response', async () => {
      const addBookDto: AddBooks = null;
      const addBookResponse: AddBookResponse = { message : "success", bookId: "123" };

    //   jest.spyOn(bookService, 'addBooks').mockResolvedValue(addBookResponse);

      const context = {}; // Mock context as needed

      expect(await resolver.addBooks(addBookDto, context)).toBe(addBookResponse);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const addBookDto: AddBooks = null;

      jest.spyOn(bookService, 'addBooks').mockRejectedValue(new Error('Error'));

      const context = {}; // Mock context as needed

      await expect(resolver.addBooks(addBookDto, context)).rejects.toThrow(HttpException);
      await expect(resolver.addBooks(addBookDto, context)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });
});
