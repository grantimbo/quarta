import Logo from "./Header/Logo";

export const FormWrapper = ({ title, children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <div className="grid w-full max-w-sm gap-2 rounded-xl bg-white p-10 shadow-md">
        <Logo />

        {children}
      </div>
    </div>
  );
};
