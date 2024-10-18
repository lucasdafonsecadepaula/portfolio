export const scrollTo = (targetPosition: number) => () => {
  const startScrollPos = window.scrollY
  const distance = targetPosition - startScrollPos // Calculate the total distance to scroll
  const duration = 1000 // Total duration of the scroll in ms
  const startTime = performance.now()
  const maxSpeed = 50 // Max scroll speed (pixels per frame)

  // Ease-in-out cubic function
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - --t * t * t * 4

  const scrollStep = (currentTime: number) => {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1) // Ensure progress is between 0 and 1
    const easedProgress = easeInOutCubic(progress)

    // Calculate the new scroll position based on eased progress
    const newScrollPos = startScrollPos + distance * easedProgress

    // Cap the scroll speed
    const scrollDistance = window.scrollY - newScrollPos
    if (Math.abs(scrollDistance) > maxSpeed) {
      const cappedDistance = scrollDistance > 0 ? maxSpeed : -maxSpeed
      window.scrollBy(0, -cappedDistance)
    } else {
      window.scrollTo(0, newScrollPos)
    }

    if (
      timeElapsed < duration &&
      Math.abs(window.scrollY - targetPosition) > 1
    ) {
      requestAnimationFrame(scrollStep)
    } else {
      window.scrollTo(0, targetPosition) // Ensure it ends exactly at the target position
    }
  }

  requestAnimationFrame(scrollStep)
}
