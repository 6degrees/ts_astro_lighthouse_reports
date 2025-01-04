import { globby } from 'globby';
import path from 'path';
import dayjs from 'dayjs';

export interface HistoricalReport {
    date: string;
    formattedDate: string;
    path: string;
}

export const getHistoricalReports = async (siteName: string): Promise<HistoricalReport[]> => {
    const reportsPath = path.join('public', 'reports', siteName);
    const reports = await globby(['*/report.json'], {
        cwd: reportsPath,
        onlyFiles: true,
        deep: 1,
        ignore: ['live/**']
    });

    return reports
        .map(report => {
            const date = path.dirname(report);
            if (date === 'live') return null;
            
            return {
                date,
                formattedDate: dayjs(date).format('MMMM D, YYYY'),
                path: `/reports/${siteName}/${date}/report.html`
            };
        })
        .filter((report): report is HistoricalReport => report !== null)
        .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
}; 