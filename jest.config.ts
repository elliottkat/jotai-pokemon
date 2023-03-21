import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        coveragePathIgnorePatterns: ['/node_modules/'],
        globalSetup: './setupTestEnv.ts',
        moduleNameMapper: {
            '\\.(css|less)$': 'identity-obj-proxy',
        },
    };
};
