export function useLocation() {
    return useLocalStorage("location", { lat: 54.9783, lng: -1.61396 });
}
