"use client"

import { ConfigSection } from "@/app/[[...slug]]/page"
import { LayoutContext } from "@/app/context/LayoutContext"
import { useContext, useEffect } from "react"

export const SetLayout = ({ layout }: {layout: ConfigSection}) => {
  const { updateConfig } = useContext(LayoutContext)
  
  useEffect(() => {
    updateConfig(layout)
  }, [layout, updateConfig])

  return null
}
