import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { AppwriteException, ID, Models } from 'appwrite';
import { account } from '@/models/client/config'; // client side config "appwrite"

// Reputations
export interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean; // dependent on zustand

  // methods
  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
}

// zustand store
// () () -> method and chaining on method
export const useAuthStore = create<IAuthStore>()(
  // store API's
  // "persist" -> to keep everything in local storage
  persist(
    // take care states are mutated or not
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession('current');
          set({ session });
        } catch (error) {
          console.log(error);
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(email, password);
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);

          if (!user.prefs?.reputation)
            await account.updatePrefs({
              reputation: 0,
            });

          set({ session, user, jwt });
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error: error instanceof AppwriteException ? error : null };
        }
      },
      async createAccount(name: string, email: string, password: string) {
        try {
            await account.create(ID.unique(), email, password, name);
            return { success: true };
          } catch (error) {
            console.log(error);
            return { success: false, error: error instanceof AppwriteException ? error : null };
          }
      },
      async logout() {
        try {
            await account.deleteSessions();
            set({session: null, jwt: null, user: null});
          } catch (error) {
            console.log(error);
          }
      },
    })),


    {
      name: 'auth',

    //   brings back the data from the storage and update the state
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated;
        };
      },
    },

  ),
);
