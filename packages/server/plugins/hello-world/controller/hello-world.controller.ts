import { Controller, Res, Get } from '@nestjs/common';
import { Response } from 'express';

@Controller('hello-world')
export class HelloWorldController {
  @Get('')
  async upload(@Res() res: Response) {
    return res.status(200).json({ message: 'hello world' });
  }
}
