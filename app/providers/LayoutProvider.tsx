
import { RenderComponent } from "@/components/RenderComponents";
import { PageConfig } from "../[[...slug]]/page";

export default function LayoutProvider({ config, children }: { config: PageConfig, children: React.ReactNode}) {
  // const grid = config?.layoutGrid || 'Header main Footer';
  const layoutComponents = config?.layout || [];
  // const mainComponents = config?.main || [];
  // console.log('%capp/providers/LayoutProvider.tsx:7 config.layout', 'color: #007acc;', config.layout);
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      {(
        <div>
          {layoutComponents
            .map((section, idx) => (
              <RenderComponent key={`main-${idx}`} section={section} />
              ))}
              </div>
              )}

      <main>
        {/* main components from config */}
        {/* {mainComponents.map((section, idx) => (
          <RenderComponent key={`main-${idx}`} section={section} />
        ))} */}

        {/* page content */}
        {children}
      </main>

      {/* {grid.includes('Footer') && (
        <div>
          {layoutComponents
            .filter((c) => c.zone === 'footer')
            .map((section, idx) => (
              <RenderComponent key={`footer-${idx}`} section={section} />
            ))}
        </div>
      )} */}
    </div>
  );
}
