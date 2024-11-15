import { CosmosConfig } from '../cosmosConfig/types.js';
export declare function mockFile(filePath: string, fileMock: {}): Promise<void>;
export declare function mockCosmosConfig(cosmosConfigPath: string, cosmosConfig: Partial<CosmosConfig>): Promise<void>;
export declare function mockCwdModuleDefault(filePath: string, fileMock: {}): Promise<void>;
export declare function resetFsMock(): Promise<void>;
