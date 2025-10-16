import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { StepOneBasicInfo } from "@/features/profile/components/StepOneBasicInfo";
import { StepTwoAdditionalInfo } from "@/features/profile/components/StepTwoAdditionalInfo";
import { completeProfile } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CompleteProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bio", bio);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    dispatch(completeProfile(formData))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="w-full max-w-5xl space-y-10">
        {/* Wizard Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 text-left">
            Complete Your Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1 text-left">
            Let's set up your account step-by-step
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <Progress
            value={step === 1 ? 50 : 100}
            className="h-2 rounded-full"
          />
          <div className="flex justify-between text-sm text-slate-600">
            <span className={step === 1 ? "font-semibold" : ""}>
              Step 1 — Basic Info
            </span>
            <span className={step === 2 ? "font-semibold" : ""}>
              Step 2 — Additional Info
            </span>
          </div>
        </div>

        {/* Wizard Steps */}
        <Card className="shadow-xl border border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">
              {step === 1
                ? "Step 1 — Basic Information"
                : "Step 2 — Additional Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === 1 ? (
              <StepOneBasicInfo
                firstName={firstName}
                lastName={lastName}
                username={username}
                phoneNumber={phoneNumber}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setUsername={setUsername}
                setPhoneNumber={setPhoneNumber}
                onNext={() => setStep(2)}
              />
            ) : (
              <StepTwoAdditionalInfo
                bio={bio}
                profilePicture={profilePicture}
                setBio={setBio}
                setProfilePicture={setProfilePicture}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                loading={status === "loading"}
                error={error}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
