import { IntersectionType } from '@nestjs/swagger';

class PackageDetailsDto {
  name: string;
  version: string;
}

class RepoDetailsDto {
  repoDetails: {
    owner: string;
    repo: string;
  };
}

class updatePackageDto extends IntersectionType(
  PackageDetailsDto,
  RepoDetailsDto,
) {}

export { PackageDetailsDto, RepoDetailsDto, updatePackageDto };
