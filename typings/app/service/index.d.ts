// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDatebase from '../../../app/service/datebase';
import ExportMyprivacy from '../../../app/service/myprivacy';
import ExportWxMsg from '../../../app/service/wxMsg';

declare module 'egg' {
  interface IService {
    datebase: ExportDatebase;
    myprivacy: ExportMyprivacy;
    wxMsg: ExportWxMsg;
  }
}
