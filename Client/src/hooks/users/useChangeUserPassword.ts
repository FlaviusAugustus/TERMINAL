import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

/**
 * ChangeUserPasswordDto Interface
 *
 * Defines the properties for changing a user's password.
 * @interface
 * @property {string} id - The ID of the user whose password is being changed.
 * @property {string} newPassword - The new password for the user.
 */
interface ChangeUserPasswordDto {
    id: string;
    newPassword: string;
}

/**
 * changeUserPassword Function
 * @function
 * @param id
 * @param newPassword
 */
async function changeUserPassword({id, newPassword} : ChangeUserPasswordDto) {
    return await apiClient.patch(`users/${id}/password`, { newPassword });
}

/**
 * useChangeUserPassword Hook
 *
 * A custom hook that provides a mutation function to change a user's password.
 */
export function useChangeUserPassword() {

    return useMutation({
        mutationFn: (data: ChangeUserPasswordDto) => changeUserPassword(data),
    });
}