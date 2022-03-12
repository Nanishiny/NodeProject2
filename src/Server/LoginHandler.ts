import { timeStamp } from 'console';
import { IncomingMessage, ServerResponse } from 'http';
import { Account, Handler, TokenGenerator } from '../Server/Model';
import { HTTP_CODES, HTTP_METHOD } from '../Shared/Models';

export class LoginHandler implements Handler {
  private req: IncomingMessage;
  private res: ServerResponse;
  private tokenGenerator: TokenGenerator;

  public constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokengenerator: TokenGenerator
  ) {
    this.req = req;
    this.res = res;
    this.tokenGenerator = tokengenerator;
  }

  public async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHOD.POST:
        await this.handlePost();
        break;

      default:
        this.handleNotFound();
        break;
    }
  }

  private async handleNotFound() {
    this.res.statusCode = HTTP_CODES.NOT_FOUND;
    this.res.write('Wrong username or password');
  }

  private async handlePost() {
    try {
      const body = await this.getRequestBody();
      const sessionToken = await this.tokenGenerator.generateToken(body);
      if (sessionToken) {
        this.res.statusCode = HTTP_CODES.CREATED;
        this.res.writeHead(HTTP_CODES.CREATED, {
          'Content-Type': 'application/JSON'
        });
        this.res.write(JSON.stringify(sessionToken));
      } else {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Wrong username or password');
      }
    } catch (error) {
      this.res.write('error' + error);
    }
  }

  private async getRequestBody(): Promise<Account> {
    return new Promise((resolve, reject) => {
      let body = '';
      this.req.on('data', (data: string) => {
        body += data;
      });
      this.req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
      this.req.on('error', (error: any) => {
        reject(error);
      });
    });
  }
}
