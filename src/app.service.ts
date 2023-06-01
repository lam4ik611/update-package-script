import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PackageDetailsDto, updatePackageDto } from './app.dto';
import { writeFile, readFileSync } from 'fs';
import { Octokit } from 'octokit';

const errorFileHandler = (err: any) => {
  throw new Error(JSON.stringify(err));
};

@Injectable()
export class AppService {
  updatePackage(body: updatePackageDto) {
    const updatedFile = this.updateFile({
      name: body.name,
      version: body.version,
    });

    updatedFile
      .then(async () => {
        try {
          const res = await this.createPullRequest(body.repoDetails);

          // TODO: handle the response
          console.log(`Pull Request is created! The response: ${res}`);
        } catch (err) {
          // TODO: handle the error
          console.log('Pull Request errored: ', err.response.data.message);
        }
      })
      .catch(errorFileHandler);

    return `Now ${body.name} version is "${body.version}"`;
  }

  // TODO: it's better to move it into another module
  async createPullRequest({ owner, repo }): Promise<any> {
    const octokit = new Octokit({
      auth: process.env.AUTH_TOKEN,
    });

    return await octokit.request(`POST /repos/${owner}/${repo}/pulls`, {
      owner,
      repo,
      title: 'Update version of a package in package.json',
      head: 'octocat:new-version',
      base: 'master',
    });
  }

  // TODO: file functionality better to move to another module or make them like helpers
  private async updateFile({
    name,
    version,
  }: PackageDetailsDto): Promise<void> {
    const fileName = 'test-package.json';
    const parsedFile = JSON.parse(this.getFileData(fileName));
    const updatedFile = JSON.stringify(
      this.updateJsonByKey(parsedFile, name, version),
    );

    return await this.writeFileData(fileName, updatedFile);
  }

  private writeFileData(fileName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      writeFile(fileName, data, (err) => {
        if (err) {
          reject();

          errorFileHandler(err);
        }

        resolve();
      });
    });
  }

  private getFileData(fileName: string) {
    return readFileSync(fileName, 'utf-8');
  }

  // TODO: it's better to make it kind of helpers
  private updateJsonByKey = (data: any, key: string, value: string) => {
    return _.cloneDeepWith(data, (item) => {
      return item[key]
        ? {
            ...item,
            [key]: value,
          }
        : _.noop();
    });
  };
}
