"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-ipnu-600" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-ipnu-600" />,
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#1a2e24",
          "--normal-border": "#f1f5f3",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-100 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          title: "text-sm font-black text-gray-900",
          description: "text-xs font-bold text-gray-400",
          closeButton: "group-[.toast]:bg-white group-[.toast]:border-gray-100 group-[.toast]:text-gray-400 hover:group-[.toast]:text-ipnu-600 transition-colors",
          success: "group-[.toast]:border-ipnu-100",
          error: "group-[.toast]:border-red-100",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
