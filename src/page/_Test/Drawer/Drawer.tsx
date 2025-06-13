
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard'
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { Book } from '../Book/Book';
import { BookAIcon } from 'lucide-react';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({
  pathname,
}: {
  pathname: string;
  navigate: (path: string | URL) => void;
}) {
  return (
    <div style={{margin:20}}>   
      {pathname.startsWith('/books') ? (
        <Book/>
      ) : null}
    </div>


  );
}

interface DemoProps {window?: () => Window}

export function DashboardLayoutPattern(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/orders');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={[
          {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
          },
          {
            segment: 'books',
            title: 'Books',
            icon: <BookAIcon />,
            pattern: 'books{/:BookID}*',
          },
        ]}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} navigate={router.navigate} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
