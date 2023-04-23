import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(params: {
    email: string;
    password: string;
  }): Promise<SignInResponseDto> {
    const {
      password,
      email,
      name,
      id: sub,
    } = await this.userService.findByEmail(params.email);

    if (password !== params.password) throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      email,
      sub,
    });

    return {
      email,
      name,
      accessToken,
    };
  }
}
