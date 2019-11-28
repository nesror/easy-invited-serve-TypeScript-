import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.isLocal = true

  // redis
  config.redis = {
    client: {
      cluster: true,
      nodes: [{
        host: '',
        port: 6379,
        password: '',
        db: 0,
      }, {
        host: '',
        port: 6379,
        password: '',
        db: 0,
      }]
    },
  };

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  return config;
};
