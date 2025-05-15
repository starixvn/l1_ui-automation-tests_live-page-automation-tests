import minimist from 'minimist';

export const getTestConfig = () => {
    const argv = minimist(process.argv.slice(2));
    
    // Thêm validation nếu cần
    if (argv.env && !['PRO_SG', 'PROVG_Credit', 'PROVG_Cash'].includes(argv.env)) {
        throw new Error(`Invalid environment: ${argv.env}`);
    }

    return {
        env: argv.env || 'PRO_SG',
        gameId: parseInt(argv.gameid || '2')
    };
}; 