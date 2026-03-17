
export function randomString(length = 64): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < array.length; i++) {
        result += chars[array[i] % chars.length];
    }

    return result;
}

export async function sha256(plain: string): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer);
}

export function base64url(buffer: Uint8Array): string {
    return btoa(String.fromCharCode(...Array.from(buffer)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
