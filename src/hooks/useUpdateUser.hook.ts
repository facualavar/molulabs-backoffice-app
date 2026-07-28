import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UserPayload } from '@/services/user.service';
import { updateUser } from '@/services/user.service';

interface UpdateUserVariables {
    id: number;
    payload: UserPayload;
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdateUserVariables) => updateUser(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
};
