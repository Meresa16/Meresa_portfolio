








// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import { BigQuery } from '@google-cloud/bigquery';
// import path from 'path';
// import fs from 'fs';
// // Note: Credentials import is no longer strictly necessary but kept for full historical context
// // import { Credentials } from 'google-auth-library'; 

// const app = express();
// const PORT = process.env.PORT || 8000;
// const PROJECT_ID = 'loyal-weaver-471905-p9';

// // The local path is only used for local development fallback
// const KEY_PATH = 'loyal-weaver-471905-p9-44de225b313c.json';
// const TEMP_KEY_PATH = '/tmp/gcp-key.json';

// // --- CORS Configuration (Simplified and Robust) ---
// // Define the allowed origins as a single array (including the Vercel Regex)
// const ALLOWED_ORIGINS = [
//     'http://localhost:3000',         // Local React Frontend
//     'https://meresa.vercel.app',     // Production Domain
//     'https://meresa-portfolio-git-feature-x.vercel.app', // Example Staging Domain
//     /https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/, // Allows ALL Vercel preview/staging subdomains
// ];

// app.use(cors({
//     // Pass the array directly. The 'cors' library internally checks strings and RegExp.
//     origin: ALLOWED_ORIGINS,
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
// Note: We use Credentials for type context, even if not used directly
import { Credentials } from 'google-auth-library'; 

const app = express();
const PORT = process.env.PORT || 8000;
const PROJECT_ID = 'loyal-weaver-471905-p9';

// The local path is only used for local development fallback
const KEY_PATH = 'loyal-weaver-471905-p9-44de225b313c.json';
const TEMP_KEY_PATH = '/tmp/gcp-key.json'; // Render's writable path

// --- CORS Configuration ---
// Define the allowed origins as a simple array of strings and RegExp
const ALLOWED_ORIGINS = [
    'http://localhost:3000',         
    'https://meresa.vercel.app',     
    /https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/, // Allows ALL Vercel preview/staging subdomains
];

app.use(cors({
    // FIX: Pass the array directly. The 'cors' library handles all the internal logic perfectly.
    origin: ALLOWED_ORIGINS, 
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
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

// NEW: RENDER HEALTH CHECK ROUTE (CRITICAL FIX)
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'Crypto Backend' });
});

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

// --- FINAL FIX: 404 CATCH-ALL (MUST be the last route definition!) ---
app.use((req: Request, res: Response) => {
    console.warn(`404: Unhandled route requested: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "404: Endpoint not found. Check API path and method." });
});


// --- START SERVER ---
app.listen(PORT, () => {
    console.log('----------------------------------------------------------');
    console.log(`⚡ NODE BACKEND READY: http://localhost:${PORT}`);
    console.log(`🔑 USING PROJECT: ${PROJECT_ID}`);
    console.log('----------------------------------------------------------');
});
