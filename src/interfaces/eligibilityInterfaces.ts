interface School {
    _id: string,
    upchieveId: string,
    name: string,
    districtName: string,
    city: string,
    state: string,
}

interface CheckEligibilityRequest {
    schoolUpchieveId: string,
    email: string,
    zipCode: string,
    referredByCode?: string,
    currentGrade?: string
}