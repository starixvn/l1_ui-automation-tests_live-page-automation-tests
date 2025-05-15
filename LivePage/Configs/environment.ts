export interface EnvConfig {
  baseUrl: string;
  username: string;
  password: string;
  auth?: { username: string; password: string };
}

const envConfig: Record<string, EnvConfig> = {
  PRO_SG: {
    baseUrl: 'https://www.viva88.com/',
    username: 'supertest30102094',
    password: '12345bb',
  },
  PROVG_Credit: {
    baseUrl: 'https://www.nova88.com/',
    username: 'MemIBCINDOSB52',
    password: '123456',
  },
  PROVG_Cash: {
    baseUrl: 'https://www.spondemo.com/',
    username: 'vntest029',
    password: '1q2w3e4r',
  },
};

export default envConfig;

/*export async function openLivePage(page: Page, env: string) {
  if (!env) {
    throw new Error('ENV không được để trống trong OpenLivepage');
  }
  
  console.log(`📺 Đang chuyển vào sảnh Live (${env})...`);
  // ... phần code còn lại
}*/