import React from "react";
import FormError from "./FormError";

interface LoginFormProps {
  error: string;
  isLoading: boolean;
  onGoogleLogin: () => void;
}

export default function LoginForm({ error, isLoading, onGoogleLogin }: LoginFormProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-8 py-12 md:px-16 lg:px-24">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-2">
            Welcome Back!
          </h2>
        </div>

        <FormError message={error} />

        <div className="flex flex-col gap-4">
          <button 
            onClick={onGoogleLogin}
            disabled={isLoading}
            type="button" 
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium py-3 rounded-md transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99] text-sm"
          >
            {isLoading ? <span>Connecting securely...</span> : <span>Login Now with Google Account</span>}
          </button>
        </div>

        {/* Mobile View Copyright backup included */}
        <div className="block md:hidden text-center text-xs text-[var(--text-disabled)] mt-8">
          All rights reserved.
        </div>
      </div>
    </div>
  );
}