
import { Toaster } from "react-hot-toast";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          success: {
            style: {
              boxShadow: "0 0 4px #1e8a00",
            },
          },
          error: {
            style: {
              boxShadow: "0 0 4px red",
            },
          },
          style: {
            fontFamily: "var(--vazirFont)",
            textAlign: "right",
            background: "var(--backgroundColorTheme_1)",
            color: "var(--textColorTheme)",
          },
        }}
      />
      {children}
    </div>
  );
}
