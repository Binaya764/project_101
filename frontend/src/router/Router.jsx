import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {}
});

export function useRouter() {
  return useContext(RouterContext);
}

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to) => {
    if (to === currentPath) return;
    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({ to, children, className = '', activeClassName = 'is-active', onClick, ...props }) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));

  const handleClick = (e) => {
    // allow ctrl/cmd + click to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  const combinedClass = [className, isActive ? activeClassName : ''].filter(Boolean).join(' ');

  return (
    <a href={to} onClick={handleClick} className={combinedClass} {...props}>
      {children}
    </a>
  );
}

export function Routes({ children }) {
  const { currentPath } = useRouter();
  const childrenArray = React.Children.toArray(children);

  let match = null;

  for (const child of childrenArray) {
    if (!React.isValidElement(child)) continue;
    const { path, exact = true } = child.props;

    if (exact) {
      if (currentPath === path) {
        match = child;
        break;
      }
    } else {
      if (path === '/' || currentPath.startsWith(path)) {
        match = child;
        break;
      }
    }
  }

  // If no match found, render fallback/404 child if provided
  if (!match) {
    const fallback = childrenArray.find(c => React.isValidElement(c) && !c.props.path);
    return fallback ? fallback.props.element : null;
  }

  return match.props.element;
}

export function Route({ path, element }) {
  return element;
}
