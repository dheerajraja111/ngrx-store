export type Payload = {
    sub: number,
    user: string
};

export const extractToken = (token: string): Payload | null => {
    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload: Payload = JSON.parse(payloadJson);
        return payload;
    } catch {
        return null;
    }
}