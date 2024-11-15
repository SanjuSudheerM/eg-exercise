import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  @Exclude()
  password: string;

  constructor(payload: UserResponseDto) {
    Object.assign(this, payload);
  }
}
