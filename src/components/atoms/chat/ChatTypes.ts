export type messageUserType = 'student' | 'volunteer' | 'chatbot';
export type Message = {
    _id: string,
    user: string,
    contents: string,
    createdAt: string,
}
