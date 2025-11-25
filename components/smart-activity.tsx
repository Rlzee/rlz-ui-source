/* Warning: The Activity component is not yet available in a stable version of React, only in Canary builds. */

import { Activity } from "react";
import type { ReactNode } from "react";

/* ------------------------------ Smart Activity ------------------------------ */

type SmartActivityProps = {
  visible: boolean;
  loading?: boolean;
  children: ReactNode;
};

const SmartActivity = ({
  visible,
  loading = false,
  children,
}: SmartActivityProps) => {
  let loadingFallback: ReactNode = null;
  let hiddenFallback: ReactNode = null;
  let visibleContent: ReactNode = null;

  const childArray = Array.isArray(children) ? children : [children];

  childArray.forEach((child: any) => {
    if (!child?.type) return;

    if (child.type === SmartActivityLoading) {
      loadingFallback = child.props.fallback ?? child.props.children;
    }

    if (child.type === SmartActivityHidden) {
      hiddenFallback = child.props.children;
    }

    if (child.type === SmartActivityVisible) {
      visibleContent = child.props.children;
    }
  });

  // Phase 1: Loading
  if (loading) {
    return loadingFallback ?? null;
  }

  // Phase 2: Hidden
  if (!visible) {
    return (
      <>
        {hiddenFallback}
        <Activity mode="hidden">{visibleContent}</Activity>
      </>
    );
  }

  // Phase 3: Visible
  return <Activity mode="visible">{visibleContent}</Activity>;
};

/* ------------------------------ Smart Activity Loading ------------------------------ */

type SmartActivityLoadingProps = {
  fallback?: ReactNode;
  children?: ReactNode;
};

const SmartActivityLoading = ({
  fallback,
  children,
}: SmartActivityLoadingProps) => {
  return <>{fallback ?? children}</>;
};

/* ------------------------------ Smart Activity State ------------------------------ */

type SmartActivityStateProps = {
  children: ReactNode;
};

const SmartActivityVisible = ({ children }: SmartActivityStateProps) => (
  <>{children}</>
);
const SmartActivityHidden = ({ children }: SmartActivityStateProps) => (
  <>{children}</>
);

/* ------------------------------ Exports ------------------------------ */

const SmartActivityComposed = Object.assign(SmartActivity, {
  Loading: SmartActivityLoading,
  Visible: SmartActivityVisible,
  Hidden: SmartActivityHidden,
});

export {
  SmartActivityComposed as SmartActivity,
  SmartActivityLoading,
  SmartActivityVisible,
  SmartActivityHidden,
};
