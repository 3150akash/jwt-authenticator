import { HttpService } from '@nestjs/axios';
import { Controller, Get, Headers, Post } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { map } from 'rxjs';
import { AppService } from './app.service';
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/login')
  userLogin() {
    const privateKey = fs.readFileSync('ssh/jwtRS256.key', 'utf8');
    const privateKeyObj = {
      key: privateKey,
      // passphrase: 'test',
    };
    const accesstoken = jwt.sign(
      { userName: 'Akash', eat: 3600 },
      privateKeyObj,
      {
        algorithm: 'RS256',
        keyid: 'key1',
      },
    );
    return { accesstoken };
  }

  @Get('/jwks')
  async getJwks() {
    console.log('I am called');
    const publicKey = fs.readFileSync('ssh/jwtRS256.key.pub', 'utf8');
    return [
      {
        keyid: 'key1',
        publicKey,
      },
      {
        keyid: 'key2',
        publicKey: 'some Random RSA Public Key',
      },
    ];
  }
}
// ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
// openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
