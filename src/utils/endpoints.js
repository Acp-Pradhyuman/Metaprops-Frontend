import { devConfiguration, devAbiConfig } from './config.dev';
import { prodConfiguration, prodAbiConfig } from './config.prod';

let env = 'development';
// let env = "production";
export const endpoints =
	env === 'development' ? devConfiguration : prodConfiguration;
export const abi = env === 'development' ? devAbiConfig : prodAbiConfig;