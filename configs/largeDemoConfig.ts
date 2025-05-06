// /src/configs/largeDemoConfig.ts
// import { ConfigNode } from '@/renderer/types';

const HEADER_AND_HERO = [
  {
    mui: 'AppBar',
    props: {
      position: 'static',
      sx: { backgroundColor: 'white', color: 'black', boxShadow: 'none' }
    },
    children: [
      {
        mui: 'Toolbar',
        children: [
          {
            mui: 'Typography',
            props: { variant: 'h6', sx: { flexGrow: 1 } },
            children: 'Giovanni Menswear'
          },
          {
            mui: 'Box',
            props: { sx: { display: 'flex', gap: 2 } },
            children: [
              // ... ссылки меню
            ]
          }
        ]
      }
    ]
  },
];

export function generateLargeConfig(totalItems: number) {
  const dynamicItems = Array.from({ length: totalItems }, (_, i) => ({
    mui: 'Box',
    props: {
      sx: {
        p: 1,
        border: '1px solid #ccc',
        mb: 1,
      }
    },
    children: `Item #${i + 1}`
  }));

  return [
    ...HEADER_AND_HERO,
    ...dynamicItems,
  ];
}
