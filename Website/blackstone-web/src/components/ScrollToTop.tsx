import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Resets scroll on every client-side navigation. Without this, React Router
// preserves the previous scrollY when entering a new route — jarring on a
// site with very tall pages.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 'instant' overrides the global scroll-behavior: smooth in CSS so the
    // user doesn't see a flash of the old position scrolling away.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}
