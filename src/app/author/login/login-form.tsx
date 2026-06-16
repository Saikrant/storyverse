"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LockKeyhole } from "lucide-react";

import { loginAuthor, type LoginActionState } from "@/app/author/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormProps = {
  next: string;
};

const initialState: LoginActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="h-11 w-full rounded-full" disabled={pending}>
      <LockKeyhole className="size-4" aria-hidden="true" />
      {pending ? "Unlocking..." : "Enter Studio"}
    </Button>
  );
}

export function LoginForm({ next }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAuthor, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="text-sm font-medium text-foreground">Author password</span>
        <Input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 h-11 rounded-full bg-background/70 px-4"
        />
      </label>
      {state.error ? (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
