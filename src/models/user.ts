export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    isBanned: boolean;
    password: string;
    pastSessions: string[];
    isVolunteer: boolean;
    isAdmin: boolean;
    verified: boolean;
    isFakeUser: boolean;
    isTestUser: boolean;
    isDeactivated: boolean;
    referralCode: string;
    type: string;
    heardFrom: string;
    createdAt: Date;
}

export interface Student extends User {
    ApprovedHighSchool: string; 
    highschool: string;
}

export interface Volunteer extends User {

}