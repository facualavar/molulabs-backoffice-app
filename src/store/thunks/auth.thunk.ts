import { createAsyncThunk } from '@reduxjs/toolkit';

import { getToken } from '@/shared/utilities/storage.utility';

export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async () => getToken());
