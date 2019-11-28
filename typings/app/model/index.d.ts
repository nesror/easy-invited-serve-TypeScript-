// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivityModel from '../../../app/model/activity.model';
import ExportEncryptedComponent from '../../../app/model/encryptedComponent';
import ExportHttpResponse from '../../../app/model/httpResponse';
import ExportJscode2session from '../../../app/model/jscode2session';
import ExportMyprivacyModel from '../../../app/model/myprivacy.model';
import ExportUserModel from '../../../app/model/user.model';
import ExportUserJoinModel from '../../../app/model/userJoin.model';
import ExportWxCtx from '../../../app/model/wxCtx';

declare module 'egg' {
  interface IModel {
    ActivityModel: ReturnType<typeof ExportActivityModel>;
    EncryptedComponent: ReturnType<typeof ExportEncryptedComponent>;
    HttpResponse: ReturnType<typeof ExportHttpResponse>;
    Jscode2session: ReturnType<typeof ExportJscode2session>;
    MyprivacyModel: ReturnType<typeof ExportMyprivacyModel>;
    UserModel: ReturnType<typeof ExportUserModel>;
    UserJoinModel: ReturnType<typeof ExportUserJoinModel>;
    WxCtx: ReturnType<typeof ExportWxCtx>;
  }
}
