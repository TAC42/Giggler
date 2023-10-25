import { useRef, useState, useEffect } from 'react'
import SvgIcon from './SvgIcon'
import { Link } from 'react-router-dom'

export function ImageCarousel({ images, gigId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [parentWidth, setParentWidth] = useState(0)
  const [arrowSize, setArrowSize] = useState(0)
  const [dotSize, setDotSize] = useState(0)
  const carouselRef = useRef()
  const numImages = images.length
  let imageWidth = parentWidth

  useEffect(() => {
    const totalCarouselWidth = imageWidth * numImages
    carouselRef.current.style.width = `${totalCarouselWidth}px`
    carouselRef.current.style.transform = `translateX(-${
      imageWidth * currentIndex
    }px`
  }, [imageWidth, currentIndex, numImages])

  useEffect(() => {
    const updateParentWidth = () => {
      if (carouselRef.current && carouselRef.current.parentElement) {
        const newParentWidth = carouselRef.current.parentElement.clientWidth
        if (newParentWidth > 0) {
          setParentWidth(newParentWidth)
        }

        const newArrowSize = newParentWidth * 0.1 // Adjust as needed
        const newDotSize = newParentWidth * 0.03
        setArrowSize(newArrowSize)
        setDotSize(newDotSize)
      }
    }

    updateParentWidth()

    window.addEventListener('resize', updateParentWidth)

    return () => {
      window.removeEventListener('resize', updateParentWidth)
    }
  }, [])

  function nextImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numImages)
  }

  function prevImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numImages - 1 : prevIndex - 1
    )
  }

  function handleDotClick(index, event) {
    event.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <div className="carousel-container">
      <button
        className="arrow left"
        onClick={(e) => prevImage(e)}
        style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}
      >
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <div
        className="carousel"
        ref={carouselRef}
        style={{
          width: `${imageWidth * numImages}px`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{
              width: `${imageWidth}px`,
            }}
          >
            <Link to={`/gig/${gigId}`}>
              <img
                src={image}
                alt={`Image ${index}`}
                className={index === currentIndex ? 'active' : ''}
              />
            </Link>
          </div>
        ))}
      </div>

      <button
        className="arrow right"
        onClick={(e) => nextImage(e)}
        style={{ width: arrowSize, height: arrowSize }}
      >
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <ul className="dot-container">
        {images.map((_, index) => (
          <li
            key={index}
            onClick={(e) => handleDotClick(index, e)}
            style={{fontSize: dotSize }}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          ></li>
        ))}
      </ul>
    </div>
  )
}
