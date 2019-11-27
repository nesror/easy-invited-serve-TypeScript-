// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivity from '../../../app/model/activity';
import ExportEncryptedComponent from '../../../app/model/encryptedComponent';
import ExportHttpResponse from '../../../app/model/httpResponse';
import ExportJscode2session from '../../../app/model/jscode2session';
import ExportUser from '../../../app/model/user';
import ExportUserJoin from '../../../app/model/userJoin';
import ExportWxCtx from '../../../app/model/wxCtx';

declare module 'egg' {
  interface IModel {
    Activity: ReturnType<typeof ExportActivity>;
    EncryptedComponent: ReturnType<typeof ExportEncryptedComponent>;
    HttpResponse: ReturnType<typeof ExportHttpResponse>;
    Jscode2session: ReturnType<typeof ExportJscode2session>;
    User: ReturnType<typeof ExportUser>;
    UserJoin: ReturnType<typeof ExportUserJoin>;
    WxCtx: ReturnType<typeof ExportWxCtx>;
  }
}
