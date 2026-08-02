import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '@/services/user.service';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            queryClient.setQueryData(['profile'], data);
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        }
    });
};
