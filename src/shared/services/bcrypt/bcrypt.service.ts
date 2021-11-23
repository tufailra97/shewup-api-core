import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../app-configs/app.config.service';

@Injectable()
export class BcryptService {
  constructor(private readonly appConfigService: AppConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this.appConfigService.configs.BCRYPT_SALT_ROUNDS
    );
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const isCorrectPassword = await bcrypt.compare(password, hash);
    return isCorrectPassword;
  }
}
