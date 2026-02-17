import { createContext, useContext, type ReactNode } from 'react';
import type { FormProvider } from './form-provider';

/**
 * Context for form data provider
 */
export const FormDataContext = createContext<FormProvider | null>(null);

/**
 * Props for FormDataProvider component
 */
interface FormDataProviderProps {
  children: ReactNode;
  provider: FormProvider;
}

/**
 * Provider component that wraps the app with a form data provider
 */
export function FormDataProvider({ children, provider }: FormDataProviderProps) {
  return <FormDataContext.Provider value={provider}>{children}</FormDataContext.Provider>;
}

/**
 * Hook to access the form data provider
 * @throws Error if used outside of FormDataProvider
 */
export function useFormData(): FormProvider {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }

  return context;
}
