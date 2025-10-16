// src/helpers/PasswordValidation.tsx
import React, { useMemo } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type PasswordValidationProps = {
  password: string;
};

export const PasswordValidation: React.FC<PasswordValidationProps> = ({ password }) => {
  const checks = useMemo(() => {
    return [
      { text: "At least 8 characters", valid: password.length >= 8 },
      { text: "At least one uppercase letter", valid: /[A-Z]/.test(password) },
      { text: "At least one number", valid: /\d/.test(password) },
      { text: "At least one special character", valid: /[^a-zA-Z0-9]/.test(password) },
    ];
  }, [password]);

  return (
    <div className="grid gap-1.5 pl-1">
      {checks.map((check, idx) => (
        <div key={idx} className="flex items-center text-sm">
          {check.valid ? (
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 mr-2 text-slate-400" />
          )}
          <span className={check.valid ? "text-slate-800" : "text-slate-500"}>
            {check.text}
          </span>
        </div>
      ))}
    </div>
  );
};
