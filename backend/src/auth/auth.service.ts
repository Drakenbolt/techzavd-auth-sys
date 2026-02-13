import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      const userObject = user.toObject();
      const { password, ...result } = userObject;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Користувача з таким email не знайдено'); //"Якщо така адреса існує, ми відправили лист."
    }

    const token = Math.random().toString(36).slice(2);
    
    await this.usersService.setResetToken(user._id.toString(), token);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Відновлення пароля',
      html: `
        <h3>Ви подали запит на відновлення пароля</h3>
        <p>Натисніть на посилання нижче, щоб встановити новий пароль:</p>
        <a href="${resetLink}">Змінити пароль</a>
        <p>Посилання діє 1 годину.</p>
      `,
    });

    return { message: 'Лист з інструкціями відправлено на пошту' };
  }

  async resetPassword(token: string, newPass: string) {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Токен недійсний або його термін дії закінчився');
    }
    
    await this.usersService.update(user._id.toString(), { password: newPass });
    
    await this.usersService.clearResetToken(user._id.toString());

    return { message: 'Пароль успішно змінено' };
  }
}