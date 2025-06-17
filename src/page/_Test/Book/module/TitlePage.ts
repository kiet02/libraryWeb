export function getPageTitle(pathname: string) {
  if (pathname === '/notes') return 'Notes List';
  if (pathname.match(/^\/notes\/\d+$/)) return `View Note`;
  if (pathname.match(/^\/notes\/\d+\/edit$/)) {
    const id = pathname.split('/')[2];
    return `Edit Note ${id}`;
  }
  return 'Notes';
}