import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

type StepTwoAdditionalInfoProps = {
  bio: string;
  profilePicture: File | null;
  setBio: (v: string) => void;
  setProfilePicture: (file: File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string | null;
};

export function StepTwoAdditionalInfo({
  bio,
  profilePicture,
  setBio,
  setProfilePicture,
  onBack,
  onSubmit,
  loading,
  error,
}: StepTwoAdditionalInfoProps) {
  return (
    <form className="space-y-6 max-w-md mx-auto text-left">
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Bio */}
      <div className="flex flex-col">
        <Label htmlFor="bio" className="font-medium text-slate-700 mb-1">
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Write something about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col">
        <Label htmlFor="profilePicture" className="font-medium text-slate-700 mb-1">
          Profile Picture
        </Label>
        <Input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
        />
        {profilePicture && (
          <p className="text-sm text-green-600 mt-1">
            Selected: {profilePicture.name}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Saving..." : "Complete Profile"}
        </Button>
      </div>
    </form>
  );
}
