import type { Company } from '@/domain/models/company.model';

export interface CurrentUser {
    email: string;
    firstname: string;
    id: number;
    lastname: string;
    role: string;
}

export interface User extends CurrentUser {
    company: Pick<Company, 'id' | 'name'>;
}
