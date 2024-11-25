import { useIsFetching } from "@tanstack/react-query";
export default function Header({ children }) {
  const fetching = useIsFetching(); // this React Query function allows us to know if the app is fetching anything,
  // anywhere in the application. Fetching: 0 -> not fetching. Higher than 0 -> if it is fetching
  return (
    <>
      <div id="main-header-loading">
        {fetching > 0 && <progress/>}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
