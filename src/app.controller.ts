import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { updatePackageDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  updatePackage(@Body() body: updatePackageDto): string {
    return this.appService.updatePackage(body);
  }
}
