"use client";
import React, { useState, useEffect } from 'react';
import styles from './Testimonial.module.scss';
import useDeviceType from '@/utils/useDeviceType';

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const deviceType = useDeviceType();

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      text: "Blackout Bingo is one of my favorite games. Very fare winnings and prize amounts.",
      author: "YohndaMama89",
      rating: 5
    },
    {
      id: 2,
      text: "Keeps my attention and at times gives me a bit of an adrenaline rush, when you wish you just had a few more seconds.",
      author: "ABentley1027S",
      rating: 5
    },
    {
      id: 3,
      text: "Fun to play. Can play for fun if you want or play for cash. I have only played for fun so far.",
      author: "Priceless777",
      rating: 5
    },
    {
      id: 4,
      text: "The graphics are amazing and the gameplay is smooth. Highly recommend!",
      author: "GamerPro123",
      rating: 5
    },
    {
      id: 5,
      text: "Great prizes and fair competition. Love the variety of games available.",
      author: "BingoFan456",
      rating: 5
    }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % testimonials.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`${styles.star} ${index < rating ? styles.filled : ''}`}>
        ⭐
      </span>
    ));
  };

  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[currentSlide]];
    }
    
    // Desktop: show 3 cards
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentSlide + i) % testimonials.length]);
    }
    return visible;
  };

  // Calculate if arrows should be disabled
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === testimonials.length - 3; // Last possible position for 3 cards
  
  // For mobile, different logic since we show 1 card
  const mobileIsLastSlide = currentSlide === testimonials.length - 1;

  return (
    <div className={styles.testimonialSection}>
      {/* Background Image */}
      <img 
        src={deviceType === "mobile" ? "/images/testimonial-bg-image-mob.webp" : "/images/testimonial-bg-image-desk.webp"}
        alt="Testimonial Background" 
        className={styles.bgImage} 
      />
      
      {/* Content Overlay */}
      <div className={styles.contentOverlay}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialsWrapper}>
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.rating} key={index}>
                  {renderStars(testimonial.rating)}
                </div>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <p className={styles.author}>{testimonial.author}</p>
              </div>
            ))}
          </div>
          
          {/* Desktop Navigation with disabled states */}
          {!isMobile && (
            <div className={styles.desktopNavigation}>
              <button 
                onClick={prevSlide} 
                className={`${styles.navButton} ${styles.prev}`}
                disabled={isFirstSlide}
                aria-label="Previous testimonials"
              >
                <img src="/images/left-arrow.svg" alt="Previous" />
              </button>
              <button 
                onClick={nextSlide} 
                className={`${styles.navButton} ${styles.next}`}
                disabled={isLastSlide}
                aria-label="Next testimonials"
              >
                <img src="/images/right-arrow.svg" alt="Next" />
              </button>
            </div>
          )}
          
          {/* Mobile Dots */}
          {isMobile && (
            <div className={styles.mobileDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;