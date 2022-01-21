import http from "./http";

const getSchools = async (q: string): Promise<School[]> => {
    const { data } = await http.get<{ results: School[] }>('/api-public/eligibility/school/search', {
        params: {
            q,
        }
    });
    return data?.results || [];
}

const check = async (request: CheckEligibilityRequest): Promise<boolean> => {
    const { data } = await http.post<{ isEligible?: boolean }>('/api-public/eligibility/check', request);
    const { isEligible } = data;
    return isEligible !== undefined ? isEligible : true;
}

export const eligibilityService = { getSchools, check };