import fs from 'fs';
import lighthouse, { type Flags, type RunnerResult } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import dayjs from 'dayjs';
import path from 'path';
import pLimit from 'p-limit';

import { websites } from './websites.json';

const __dirname = './public/';
const limit = pLimit(4); // Limit concurrency to 4

const runLighthouse = async (url: string) => {
    const chrome = await chromeLauncher.launch({
        chromeFlags: [
            '--headless',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-web-security',
            '--allow-insecure-localhost',
            '--ignore-certificate-errors-spki-list',
            '--ignore-ssl-errors',
            '--disable-storage-reset',
            '--enable-surface-synchronization',
            '--ignore-certificate-errors'
        ]
    });

    const options: Flags = {
        logLevel: 'info',
        output: ['html', 'json'],
        port: chrome.port,
        formFactor: 'desktop',
        throttling: {
            
            // 100Mbps = 100,000 Kbps
            // rttMs: 20, // Low latency for high-speed connection
            // throughputKbps: 100000,
            // cpuSlowdownMultiplier: 1, // No CPU throttling
            // requestLatencyMs: 0,
            // downloadThroughputKbps: 100000,
            // uploadThroughputKbps: 100000
        },
        screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
        },
        maxWaitForLoad: 60000,
        skipAudits: ['uses-http2'],
    };

    try {
        const runnerResult = await lighthouse(url, options);

        const date = dayjs().format('YYYY-MM-DD');
        const siteName = new URL(url).hostname;
        const reportPath = path.join(__dirname, 'reports', siteName, date);
        const livePath = path.join(__dirname, 'reports', siteName, 'live');

        if (!fs.existsSync(reportPath)) {
            fs.mkdirSync(reportPath, { recursive: true });
        }

        if (!fs.existsSync(livePath)) {
            fs.mkdirSync(livePath, { recursive: true });
        }

        // Write HTML report
        const reportHtml = runnerResult.report[0];
        fs.writeFileSync(path.join(reportPath, `report.html`), reportHtml);
        fs.writeFileSync(path.join(livePath, `report.html`), reportHtml);

        // Write JSON report
        const reportJson = runnerResult.report[1];
        fs.writeFileSync(path.join(reportPath, `report.json`), reportJson);
        fs.writeFileSync(path.join(livePath, `report.json`), reportJson);

        console.log(`Report is done for ${runnerResult.lhr.finalDisplayedUrl}`);
        console.log(`Performance score was ${runnerResult.lhr.categories.performance.score * 100}`);
    } catch (error) {
        console.error(`Error running Lighthouse for ${url}:`, error);
    } finally {
        await chrome.kill();
    }
};

const runAllLighthouse = async () => {
    const promises = websites.map((site) => limit(() => runLighthouse(site.url)));
    await Promise.all(promises);
};

runAllLighthouse().catch((error) => {
    console.error('Error running Lighthouse:', error);
});