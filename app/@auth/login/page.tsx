// app/login/page.tsx
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#eee8dc] px-4">
      <div className="flex absolute top-4 left-4">
        <img src="./static/if_logo_nome.png" alt="" className="w-16" />
      </div>
      <LoginForm />
    </div>
  );
}
