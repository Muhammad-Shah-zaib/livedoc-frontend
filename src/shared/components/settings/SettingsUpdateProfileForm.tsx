import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/store";
import type { UpdateUserProfileRequest } from "@/store/auth/types";
import { updateUserPorifleThunk } from "@/store/auth/authThunk";
import { Loader2 } from "lucide-react"; // 👈 Spinner icon

function SettingsUpdateProfileForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileRequest>({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  const onSubmit = (data: UpdateUserProfileRequest) => {
    dispatch(updateUserPorifleThunk(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 pb-4 space-y-4 border-t border-slate-200 dark:border-slate-700 mt-2 pt-4"
    >
      <div className="grid grid-cols-3 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="drawerFirstName" className="text-sm font-medium">
            First Name
          </Label>
          <Input
            id="drawerFirstName"
            className="h-9"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="drawerLastName" className="text-sm font-medium">
            Last Name
          </Label>
          <Input
            id="drawerLastName"
            className="h-9"
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="drawerEmail" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="drawerEmail"
          type="email"
          disabled={true}
          className="h-9"
          value={user?.email}
        />
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}

export default SettingsUpdateProfileForm;
