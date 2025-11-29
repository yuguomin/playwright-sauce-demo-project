import { type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // 在这里可以做一些全局的数据获取与配置，比如复用登陆，然后透传到page中，或则存在browserContext，还可以配置全局的环境变量
  console.log('run globalSetup~~~');
}

export default globalSetup;