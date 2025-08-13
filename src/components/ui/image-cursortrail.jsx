"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "../../lib/utils"

export function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 10,
  imgClass = "w-40 h-48",
  distance = 25,
  fadeAnimation = false,
}) {
  const containerRef = useRef(null)
  const [activeImages, setActiveImages] = useState([])
  const imageIndexRef = useRef(0)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Only add new image if mouse moved significantly
    const distance = Math.hypot(x - lastMousePosition.current.x, y - lastMousePosition.current.y)
    
    if (distance > 30) { // Add image every 30px of movement
      const newImage = {
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        src: items[imageIndexRef.current % items.length],
        index: imageIndexRef.current
      }
      
      setActiveImages(prev => {
        const newImages = [...prev, newImage]
        // Keep only the latest maxNumberOfImages
        if (newImages.length > maxNumberOfImages) {
          return newImages.slice(-maxNumberOfImages)
        }
        return newImages
      })
      
      imageIndexRef.current++
      lastMousePosition.current = { x, y }
      
      // Remove image after delay
      setTimeout(() => {
        setActiveImages(prev => prev.filter(img => img.id !== newImage.id))
      }, 3000)
    }
  }, [items, maxNumberOfImages, activeImages.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <div
      ref={containerRef}
      className={cn(
        "image-cursor-trail relative w-full h-full overflow-hidden",
        className
      )}
    >
      {/* Render active images */}
      {activeImages.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt={`travel-image-${image.index}`}
          className={cn(
            "absolute rounded-3xl object-cover transition-all duration-300 ease-out shadow-lg",
            imgClass
          )}
          style={{
            left: image.x,
            top: image.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 5, // Fixed low z-index to stay behind text
            opacity: 1,
            scale: 1
          }}
        />
      ))}
      
      {/* Render children (hero content) */}
      {children}
    </div>
  )
}
