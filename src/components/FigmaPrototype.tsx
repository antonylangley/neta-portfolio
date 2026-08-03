type FigmaPrototypeProps = {
  title: string;
  figmaEmbedUrl: string;
  figmaPrototypeUrl: string;
  aspectRatio?: string;
};

export function FigmaPrototype({
  title,
  figmaEmbedUrl,
  figmaPrototypeUrl,
  aspectRatio = "16 / 9.5",
}: FigmaPrototypeProps) {
  return (
    <div className="prototype-wrap">
      <div className="prototype-header">
        <span>Interactive prototype</span>
        <a href={figmaPrototypeUrl} rel="noopener noreferrer" target="_blank">
          Open in Figma -&gt;
        </a>
      </div>
      <div className="prototype-frame" style={{ aspectRatio }}>
        <iframe allowFullScreen loading="lazy" src={figmaEmbedUrl} title={`${title} Figma prototype`} />
      </div>
    </div>
  );
}
