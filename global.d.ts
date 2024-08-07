// global.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        USERNAME: string;
        PASSWORD: string;
        URL: string;
    }
}
