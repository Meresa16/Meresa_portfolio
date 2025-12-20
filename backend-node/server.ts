

// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import { BigQuery } from '@google-cloud/bigquery';
// import path from 'path';
// import fs from 'fs';
// // New import for type safety with BigQuery credentials
// import { Credentials } from 'google-auth-library'; 

// const app = express();
// // PORT is essential for Render deployment
// const PORT = process.env.PORT || 8000; 
// const PROJECT_ID = 'loyal-weaver-471905-p9';

// // The local path is only used for local development fallback
// const KEY_PATH = 'loyal-weaver-471905-p9-44de225b313c.json';

// // --- MIDDLEWARE ---
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());

// // --- LOGGING UTILITY ---
// const log = (msg: string) => {
//     // Ensure this doesn't crash on undefined split
//     const timestamp = new Date().toISOString().split('T')[1]?.split('.')[0] || 'TIME';
//     console.log(`${timestamp} [INFO] ${msg}`);
// };

// // Add a temporary file path constant
// const TEMP_KEY_PATH = '/tmp/gcp-key.json';

// const getBigQueryClient = () => {

//     // 1. Check for Environment Variable (Render's SECURE Method)
//     const keyString = process.env.GCP_SERVICE_ACCOUNT_KEY;

//     if (keyString) {
//         log('🔑 Authenticating via secure Environment Variable (Writing temp file)');

//         try {
//             // Write the environment variable content to a temporary file
//             fs.writeFileSync(TEMP_KEY_PATH, keyString);

//             // Now, authenticate using the keyFilename property, which is fully supported
//             return new BigQuery({
//                 projectId: PROJECT_ID,
//                 keyFilename: TEMP_KEY_PATH, // Points to the temporary file
//             });
//         } catch (e) {
//             console.error("CRITICAL: Failed to write/read temporary key file:", e);
//             throw new Error(`CRITICAL: Deployment failure in secure authentication step.`);
//         }
//     } 

//     // 2. Fallback to Local File (Local Development Only)
//     const localKeyPath = path.join(__dirname, KEY_PATH);
//     if (fs.existsSync(localKeyPath)) {
//         log(`⚠️ Authenticating via local file: ${path.basename(localKeyPath)}`);
//         return new BigQuery({
//             projectId: PROJECT_ID,
//             keyFilename: localKeyPath,
//         });
//     }

//     // If neither works, throw a descriptive error
//     throw new Error(`CRITICAL: GCP Key NOT FOUND. Please ensure 'GCP_SERVICE_ACCOUNT_KEY' is set in Render.`);
// };

// // --- ENDPOINTS ---

// // Root Check
// app.get('/', (req: Request, res: Response) => {
//     res.json({ status: 'online', message: 'Crypto Backend is running' });
// });

// // 1. Market Overview (All Coins - Fuels Treemap/Table)
// app.get('/api/market-overview', async (req: Request, res: Response) => {
//     try {
//         const bigquery = getBigQueryClient();
//         log('📡 Request: All-Asset Market Overview');

//         const query = `
//             SELECT 
//                 symbol,
//                 name,
//                 price_usd,
//                 market_cap,
//                 total_volume,
//                 change_24h_pct,
//                 drawdown_pct,
//                 logo_url,
//                 rank
//             FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
//             WHERE report_date = (
//                 SELECT MAX(report_date) FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
//             )
//             ORDER BY market_cap DESC
//         `;

//         const [rows] = await bigquery.query({ query });
//         log(`✅ Success! Sent ${rows.length} assets.`);
//         res.json(rows);
//     } catch (error: any) {
//         console.error('🔥 BQ Error:', error.message);
//         res.status(500).json({ error: "Internal Server Error: " + error.message });
//     }
// });

// // 2. Historical Trends (Specific Coin - Fuels Charts/Details)
// app.get('/api/crypto-trends', async (req: Request, res: Response) => {
//     try {
//         const bigquery = getBigQueryClient();
//         const symbol = (req.query.symbol as string) || 'btc';
//         log(`📡 Request: Historical Intelligence for ${symbol}`);

//         const query = `
//             SELECT 
//                 CAST(report_date AS STRING) as date,
//                 price_usd,
//                 moving_avg_7d,
//                 total_volume
//             FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
//             WHERE lower(symbol) = @symbol
//             ORDER BY report_date ASC
//         `;

//         const options = {
//             query: query,
//             params: { symbol: symbol.toLowerCase() },
//         };

//         const [rows] = await bigquery.query(options);
//         log(`✅ Success! Sent ${rows.length} historical data points for ${symbol}.`);
//         res.json(rows);
//     } catch (error: any) {
//         console.error('🔥 BQ Error:', error.message);
//         res.status(500).json({ error: "Internal Server Error: " + error.message });
//     }
// });

// // --- START SERVER ---
// app.listen(PORT, () => {
//     console.log('----------------------------------------------------------');
//     console.log(`⚡ NODE BACKEND READY: http://localhost:${PORT}`);
//     console.log(`🔑 USING PROJECT: ${PROJECT_ID}`);
//     console.log('----------------------------------------------------------');
// });
















// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import { BigQuery } from '@google-cloud/bigquery';
// import path from 'path';
// import fs from 'fs';
// import { Credentials } from 'google-auth-library'; 

// const app = express();
// const PORT = process.env.PORT || 8000; 
// const PROJECT_ID = 'loyal-weaver-471905-p9';

// // The local path is only used for local development fallback
// const KEY_PATH = 'loyal-weaver-471905-p9-44de225b313c.json';
// const TEMP_KEY_PATH = '/tmp/gcp-key.json';

// // --- CORS Configuration ---
// const ALLOWED_ORIGINS = [
//     'http://localhost:3000',         // Local React Frontend
//     'https://meresa.vercel.app',     // Your live Vercel domain (without trailing slash)
//     // Add your Render URL here when you get it (e.g., 'https://crypto-api-gateway.onrender.com')
// ];

// app.use(cors({ 
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true); 

//         if (ALLOWED_ORIGINS.includes(origin)) {
//             callback(null, true);
//         } else {
//             console.error(`CORS BLOCKED: Origin ${origin} not allowed.`);
//             callback(new Error('Not allowed by CORS'), false);
//         }
//     },
//     methods: ['GET', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
// }));
// app.use(express.json());


// // --- LOGGING UTILITY ---
// const log = (msg: string) => {
//     const timestamp = new Date().toISOString().split('T')[1]?.split('.')[0] || 'TIME';
//     console.log(`${timestamp} [INFO] ${msg}`);
// };

// // --- BIGQUERY CLIENT (SECURE, ENVIRONMENT-AWARE FUNCTION) ---
// const getBigQueryClient = () => {

//     // 1. Check for Environment Variable (Render's SECURE Method)
//     const keyString = process.env.GCP_SERVICE_ACCOUNT_KEY;

//     if (keyString) {
//         log('🔑 Authenticating via secure Environment Variable (Writing temp file)');

//         try {
//             // Write the environment variable content to a temporary file
//             fs.writeFileSync(TEMP_KEY_PATH, keyString);

//             // Now, authenticate using the keyFilename property
//             return new BigQuery({
//                 projectId: PROJECT_ID,
//                 keyFilename: TEMP_KEY_PATH,
//             });
//         } catch (e) {
//             console.error("CRITICAL: Failed to write/read temporary key file:", e);
//             throw new Error(`CRITICAL: Deployment failure in secure authentication step.`);
//         }
//     } 

//     // 2. Fallback to Local File (Local Development Only)
//     const localKeyPath = path.join(__dirname, KEY_PATH);
//     if (fs.existsSync(localKeyPath)) {
//         log(`⚠️ Authenticating via local file: ${path.basename(localKeyPath)}`);
//         return new BigQuery({
//             projectId: PROJECT_ID,
//             keyFilename: localKeyPath,
//         });
//     }

//     // If neither works, throw a descriptive error
//     throw new Error(`CRITICAL: GCP Key NOT FOUND. Please ensure 'GCP_SERVICE_ACCOUNT_KEY' is set in Render.`);
// };

// // --- ENDPOINTS (Remain the same) ---

// // Root Check
// app.get('/', (req: Request, res: Response) => {
//     res.json({ status: 'online', message: 'Crypto Backend is running' });
// });

// // 1. Market Overview (All Coins - Fuels Treemap/Table)
// app.get('/api/market-overview', async (req: Request, res: Response) => {
//     try {
//         const bigquery = getBigQueryClient();
//         log('📡 Request: All-Asset Market Overview');

//         const query = `
//             SELECT 
//                 symbol, name, price_usd, market_cap, total_volume, change_24h_pct, drawdown_pct, logo_url, rank
//             FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
//             WHERE report_date = (
//                 SELECT MAX(report_date) FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
//             )
//             ORDER BY market_cap DESC
//         `;

//         const [rows] = await bigquery.query({ query });
//         log(`✅ Success! Sent ${rows.length} assets.`);
//         res.json(rows);
//     } catch (error: any) {
//         console.error('🔥 BQ Error:', error.message);
//         res.status(500).json({ error: "Internal Server Error: " + error.message });
//     }
// });

// // 2. Historical Trends (Specific Coin - Fuels Charts/Details)
// app.get('/api/crypto-trends', async (req: Request, res: Response) => {
//     try {
//         const bigquery = getBigQueryClient();
//         const symbol = (req.query.symbol as string) || 'btc';
//         log(`📡 Request: Historical Intelligence for ${symbol}`);

//         const query = `
//             SELECT 
//                 CAST(report_date AS STRING) as date,
//                 price_usd,
//                 moving_avg_7d,
//                 total_volume
//             FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
//             WHERE lower(symbol) = @symbol
//             ORDER BY report_date ASC
//         `;

//         const options = {
//             query: query,
//             params: { symbol: symbol.toLowerCase() },
//         };

//         const [rows] = await bigquery.query(options);
//         log(`✅ Success! Sent ${rows.length} historical data points for ${symbol}.`);
//         res.json(rows);
//     } catch (error: any) {
//         console.error('🔥 BQ Error:', error.message);
//         res.status(500).json({ error: "Internal Server Error: " + error.message });
//     }
// });

// // --- START SERVER ---
// app.listen(PORT, () => {
//     console.log('----------------------------------------------------------');
//     console.log(`⚡ NODE BACKEND READY: http://localhost:${PORT}`);
//     console.log(`🔑 USING PROJECT: ${PROJECT_ID}`);
//     console.log('----------------------------------------------------------');
// });

















import express, { Request, Response } from 'express';
import cors from 'cors';
import { BigQuery } from '@google-cloud/bigquery';
import path from 'path';
import fs from 'fs';
import { Credentials } from 'google-auth-library';

const app = express();
const PORT = process.env.PORT || 8000;
const PROJECT_ID = 'loyal-weaver-471905-p9';

// The local path is only used for local development fallback
const KEY_PATH = 'loyal-weaver-471905-p9-44de225b313c.json';
const TEMP_KEY_PATH = '/tmp/gcp-key.json';

// --- CORS Configuration (The Fix) ---
const ALLOWED_ORIGINS = [
    'http://localhost:3000',         // 1. Local Dev
    'https://meresa.vercel.app',     // 2. Production Domain (NO trailing slash)
    // 3. Vercel Preview/Subdomain Regex (Allows all staging builds)
    /https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/,
];

app.use(cors({
    // Allowing the specific domains (Vercel, Localhost) and letting the browser handle the rest
    origin: ['http://localhost:3000', 'https://meresa.vercel.app', /https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/],
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add Authorization just in case
}));

app.use(express.json());


// --- LOGGING UTILITY ---
const log = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1]?.split('.')[0] || 'TIME';
    console.log(`${timestamp} [INFO] ${msg}`);
};

// --- BIGQUERY CLIENT (SECURE, ENVIRONMENT-AWARE FUNCTION) ---
const getBigQueryClient = () => {

    // 1. Check for Environment Variable (Render's SECURE Method)
    const keyString = process.env.GCP_SERVICE_ACCOUNT_KEY;

    if (keyString) {
        log('🔑 Authenticating via secure Environment Variable (Writing temp file)');

        try {
            // Write the environment variable content to a temporary file
            fs.writeFileSync(TEMP_KEY_PATH, keyString);

            // Now, authenticate using the keyFilename property
            return new BigQuery({
                projectId: PROJECT_ID,
                keyFilename: TEMP_KEY_PATH,
            });
        } catch (e) {
            console.error("CRITICAL: Failed to write/read temporary key file:", e);
            throw new Error(`CRITICAL: Deployment failure in secure authentication step.`);
        }
    }

    // 2. Fallback to Local File (Local Development Only)
    const localKeyPath = path.join(__dirname, KEY_PATH);
    if (fs.existsSync(localKeyPath)) {
        log(`⚠️ Authenticating via local file: ${path.basename(localKeyPath)}`);
        return new BigQuery({
            projectId: PROJECT_ID,
            keyFilename: localKeyPath,
        });
    }

    // If neither works, throw a descriptive error
    throw new Error(`CRITICAL: GCP Key NOT FOUND. Please ensure 'GCP_SERVICE_ACCOUNT_KEY' is set in Render.`);
};

// --- ENDPOINTS ---

// Root Check
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'online', message: 'Crypto Backend is running' });
});

// 1. Market Overview (All Coins - Fuels Treemap/Table)
app.get('/api/market-overview', async (req: Request, res: Response) => {
    try {
        const bigquery = getBigQueryClient();
        log('📡 Request: All-Asset Market Overview');

        const query = `
            SELECT 
                symbol, name, price_usd, market_cap, total_volume, change_24h_pct, drawdown_pct, logo_url, rank
            FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
            WHERE report_date = (
                SELECT MAX(report_date) FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
            )
            ORDER BY market_cap DESC
        `;

        const [rows] = await bigquery.query({ query });
        log(`✅ Success! Sent ${rows.length} assets.`);
        res.json(rows);
    } catch (error: any) {
        console.error('🔥 BQ Error:', error.message);
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
});

// 2. Historical Trends (Specific Coin - Fuels Charts/Details)
app.get('/api/crypto-trends', async (req: Request, res: Response) => {
    try {
        const bigquery = getBigQueryClient();
        const symbol = (req.query.symbol as string) || 'btc';
        log(`📡 Request: Historical Intelligence for ${symbol}`);

        const query = `
            SELECT 
                CAST(report_date AS STRING) as date,
                price_usd,
                moving_avg_7d,
                total_volume
            FROM \`loyal-weaver-471905-p9.dbt_prod.fact_daily_trends\`
            WHERE lower(symbol) = @symbol
            ORDER BY report_date ASC
        `;

        const options = {
            query: query,
            params: { symbol: symbol.toLowerCase() },
        };

        const [rows] = await bigquery.query(options);
        log(`✅ Success! Sent ${rows.length} historical data points for ${symbol}.`);
        res.json(rows);
    } catch (error: any) {
        console.error('🔥 BQ Error:', error.message);
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log('----------------------------------------------------------');
    console.log(`⚡ NODE BACKEND READY: http://localhost:${PORT}`);
    console.log(`🔑 USING PROJECT: ${PROJECT_ID}`);
    console.log('----------------------------------------------------------');
});