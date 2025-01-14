import fs from 'fs';
import lighthouse, { type Flags, type RunnerResult } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import dayjs from 'dayjs';
import path from 'path';
import pLimit from 'p-limit';

import {websites} from './websites.json';

const __dirname = './public/';
const limit = pLimit(1); // Limit concurrency to 4

const runLighthouse = async (url: string) => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    const options: Flags = {
        logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        output: ['html', 'json'],
        port: chrome.port,
        disableFullPageScreenshot: true,
        formFactor: 'desktop',
        screenEmulation: {
            disabled: true,
        },
    };

    const runnerResult: RunnerResult = await lighthouse(url, options);

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

    await chrome.kill();
};

const runAllLighthouse = async () => {
    const promises = websites.map((site) => limit(() => runLighthouse(site.url)));
    await Promise.all(promises);
};

runAllLighthouse().catch((error) => {
    console.error('Error running Lighthouse:', error);
});