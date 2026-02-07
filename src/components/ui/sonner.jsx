import { useTheme } from "@/components/layout/ThemeProvider"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({
  theme,
  ...props
}) => {
  const { resolvedTheme } = useTheme()
  const appliedTheme = theme || resolvedTheme || "dark"

  return (
    <Sonner
      theme={appliedTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />
  );
}

export { Toaster, toast }
