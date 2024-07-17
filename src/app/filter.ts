export interface Filter {
    ids: string[];
    name: string;
    dateFrom: Date;
    dateTo: Date;
    gradeMin: string;
    gradeMax: string;
    subject: string; 
    showPassed: string;
    showFailed: string;
    subjects: string[];
}