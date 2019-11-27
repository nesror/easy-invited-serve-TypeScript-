import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/invited/login', controller.user.login);
  router.get('/invited/user/update', controller.user.userUpdate);
  router.get('/invited/activity/creat', controller.activity.activityCreat);
  router.get('/invited/activity/update', controller.activity.activityUpdate);
  router.get('/invited/activity/id', controller.activity.activityWithId);
  router.get('/invited/activity/userid', controller.activity.activityWithUserId);
  router.get('/invited/activity/delect', controller.activity.activityDeleteWithId);
  router.get('/invited/activity/findjoin', controller.activity.findUserJoinActivityWithUserId);
  router.get('/invited/activity/findUsers', controller.activity.findJoinUserWithActivityId);
  router.get('/invited/activity/join', controller.activity.joinActivity);
  router.get('/invited/activity/quit', controller.activity.quitActivity);

};
