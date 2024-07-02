// user.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LoginResponse } from './dto/login.reponse.dto';
import { RegisterUserReponse } from './dto/registerUserResponse.dto';
import { UserResolver } from './users.resolvers';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            loginUser: jest.fn(),
            addUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('loginUser', () => {
    it('should return a token', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test' };
      const token = 'test-token';

      jest.spyOn(userService, 'loginUser').mockResolvedValue(token);

      expect(await resolver.loginUser(loginDto)).toEqual({ accessToken: token });
    });

    it('should return null if an error occurs', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test' };

      jest.spyOn(userService, 'loginUser').mockRejectedValue(new Error('Error'));

      expect(await resolver.loginUser(loginDto)).toBeNull();
    });
  });

  describe('registerUser', () => {
    it('should return a user response', async () => {
      const registerDto: RegisterUserDto = { username: 'test', password: 'test', email: 'test@test.com' };
      const registerResponse: RegisterUserReponse = { message : "success" , userId:1};

      jest.spyOn(userService, 'addUser').mockResolvedValue(registerResponse);

      expect(await resolver.registerUser(registerDto)).toBe(registerResponse);
    });

    it('should return an error if an error occurs', async () => {
      const registerDto: RegisterUserDto = { username: 'test', password: 'test', email: 'test@test.com' };

      const error = new Error('Error');
      jest.spyOn(userService, 'addUser').mockRejectedValue(error);

      expect(await resolver.registerUser(registerDto)).toBe(error);
    });
  });
});
