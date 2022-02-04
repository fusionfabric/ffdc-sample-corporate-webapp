// Routes
export const routes = [
  {
    path: '',
    loadChildren: () =>
      import('@ffdc-corporate-banking-sample/ui/features/home').then(
        (m) => m.HomeModule
      ),
    icon: 'home',
    title: 'Home',
    tooltip: 'Home',
  },
];
