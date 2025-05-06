import home from "./home.json";
import catalog from "./catalog.json";
import { generateLargeConfig } from "./largeDemoConfig";

export const configs: Record<string, any> = {
  [home.path]: {
    ...home,
    layout: [
      ...generateLargeConfig(5000),
      ...home.layout,
    ]
  },
  [catalog.path]: catalog,
};

// {
//   "mui": "Box",
//   "props": { "sx": { "border": "2px solid black", "padding": 2, "backgroundColor": "#f5f5f5" } },
//   "children": {
//     "mui": "Card",
//     "props": { "sx": { "padding": 2, "backgroundColor": "#e8f0fe" } },
//     "children": {
//       "mui": "Container",
//       "props": { "sx": { "padding": 2, "backgroundColor": "#fffde7" } },
//       "children": {
//         "mui": "Grid",
//         "props": { "container": true, "spacing": 2, "sx": { "backgroundColor": "#e0f7fa", "padding": 2 } },
//         "children": {
//           "mui": "Paper",
//           "props": { "sx": { "padding": 2, "backgroundColor": "#fce4ec" } },
//           "children": {
//             "mui": "Stack",
//             "props": { "spacing": 2, "sx": { "backgroundColor": "#ede7f6", "padding": 2 } },
//             "children": {
//               "mui": "List",
//               "props": {
//                 "dynamic": {
//                   "url": "https://jsonplaceholder.typicode.com/todos",
//                   "map": {
//                     "mui": "ListItem",
//                     "props": { "divider": true },
//                     "children": {
//                       "mui": "Typography",
//                       "props": { "variant": "body2" },
//                       "children": "{title}"
//                     }
//                   }
//                 },
//                 "sx": { "backgroundColor": "#fff3e0" }
//               },
//               "children": {
//                 "mui": "ListItem",
//                 "children": {
//                   "mui": "Typography",
//                   "props": { "variant": "h6" },
//                   "children": {
//                     "mui": "Button",
//                     "props": { "variant": "contained", "color": "secondary" },
//                     "children": {
//                       "mui": "CardContent",
//                       "children": {
//                         "mui": "Typography",
//                         "props": { "variant": "body1" },
//                         "children": "Deeply nested content with button ✅"
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// },