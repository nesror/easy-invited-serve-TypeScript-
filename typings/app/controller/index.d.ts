// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivity from '../../../app/controller/activity';
import ExportMyprivacy from '../../../app/controller/myprivacy';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    activity: ExportActivity;
    myprivacy: ExportMyprivacy;
    user: ExportUser;
  }
}
