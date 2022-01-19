import http from "./http";

const getSchools = async (q: string): Promise<School[]> => {
    const { data } = await http.get<{ results: School[] }>('/api-public/eligibility/school/search', {
        params: {
            q,
        }
    });
    return data?.results || [];
}

export const eligibilityService = { getSchools };