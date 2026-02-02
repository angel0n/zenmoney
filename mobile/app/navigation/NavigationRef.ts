import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
}

export function replace(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name }],
    });
  }
}
