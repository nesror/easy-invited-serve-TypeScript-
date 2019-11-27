import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { bizConfig } from './bizConfig';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573700843490_3607';

  // add your egg config in here
  config.middleware = ['interceptor'];

  const bodyParserConfig: any = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };
  // 覆盖egg自带的配置
  config.bodyParser = bodyParserConfig;

  config.security = {
    csrf: {
      enable: false,
      //ignoreJSON: true
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig
  };
};
