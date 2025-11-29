import { type FullConfig } from '@playwright/test';

async function globalTerdown(config: FullConfig) {
  console.log('run globalTerdown~~~');
}

export default globalTerdown;