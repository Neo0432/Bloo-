import { createAccount } from "@/app/api/auth/postUserAuthData";

export async function createNewAccount(formNode: HTMLFormElement) {
    const serializedForm = new FormData(formNode)
    const response = await createAccount(serializedForm)
    return response;
}