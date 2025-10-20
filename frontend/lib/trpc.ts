import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../kapybara/src/server/api/root';

export const trpc = createTRPCReact<AppRouter>();
