export interface Website {
    name: string;
    url: string;
}

export interface AuditCategory {
    id: string;
    title: string;
    score: number;
}

export interface LighthouseAudit {
    categories: Record<string, AuditCategory>;
    fetchTime: string;
    audits: {
        'final-screenshot': {
            details: {
                data: string;
            };
        };
    };
} 