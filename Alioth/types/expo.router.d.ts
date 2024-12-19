import '@expo/metro-runtime';

declare module 'expo-router' {
  export type PathSegment = 
    | ""
    | "timetable"
    | "profile"
    | "(auth)"
    | "(auth)login"
    | "(tabs)"
    | "_sitemap";

  export function useSegments(): PathSegment[];
}