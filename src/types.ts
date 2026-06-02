
export enum JobStatus {
    APPLIED = 'APPLIED',
    INTERVIEWING = 'INTERVIEWING',
    OFFERT = 'OFFERT',
    REJECTED = 'REJECTED'
}

export interface JobApplication {
    id: string,
    companyName: string,
    role: string,
    status: JobStatus,
    appliedDate: string
}

