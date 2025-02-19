export const darkModeHandler = (theme, setTheme) => {
  setTheme((curr) => (curr === 'dark' ? '' : 'dark'))
  localStorage.setItem('displayMode', theme === "" ? "dark" : "");
}