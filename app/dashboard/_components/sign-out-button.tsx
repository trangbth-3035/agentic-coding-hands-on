import { signOut } from "@/app/auth/actions";

// Submits the sign-out Server Action. Server Component — no client JS needed.
export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-[#FFEA9E] px-6 py-3 font-semibold text-[#00101A] transition-[background-color,transform] duration-200 ease-out hover:bg-[#FFE07A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px motion-reduce:transition-none"
      >
        Sign out
      </button>
    </form>
  );
}
