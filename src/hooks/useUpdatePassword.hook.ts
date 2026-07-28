import { useMutation } from '@tanstack/react-query';

import { updatePassword } from '@/services/user.service';

export const useUpdatePassword = () =>
    useMutation({
        mutationFn: updatePassword
    });
