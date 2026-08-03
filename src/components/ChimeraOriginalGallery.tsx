import { InspectableGallery, type InspectableImage } from "@/components/ImageInspector";

const chimeraOriginalScreens: InspectableImage[] = [
  {
    alt: "Original Chimera login screen with a password modal.",
    height: 1154,
    src: "/images/chimera-original/1.png",
    width: 2364,
  },
  {
    alt: "Original Chimera live video screen for a front door camera.",
    height: 1326,
    src: "/images/chimera-original/2.png",
    width: 758,
  },
  {
    alt: "Original Chimera scrubber screen with timeline controls.",
    height: 1326,
    src: "/images/chimera-original/3.png",
    width: 768,
  },
  {
    alt: "Original Chimera scrubber screen with camera selection buttons.",
    height: 1326,
    src: "/images/chimera-original/4.png",
    width: 766,
  },
  {
    alt: "Original Chimera processes screen with video download and delete actions.",
    height: 1326,
    src: "/images/chimera-original/5.png",
    width: 756,
  },
  {
    alt: "Original Chimera process actions with notes about scheduled tasks.",
    height: 1324,
    src: "/images/chimera-original/6.png",
    width: 754,
  },
  {
    alt: "Original Chimera processes screen showing a running video task.",
    height: 1322,
    src: "/images/chimera-original/7.png",
    width: 752,
  },
  {
    alt: "Original Chimera stats screen with camera storage charts.",
    height: 1320,
    src: "/images/chimera-original/8.png",
    width: 772,
  },
  {
    alt: "Original Chimera stats screen with a delete files confirmation modal.",
    height: 1330,
    src: "/images/chimera-original/9.png",
    width: 766,
  },
];

export function ChimeraOriginalGallery() {
  return (
    <InspectableGallery
      images={chimeraOriginalScreens}
      initialZoom={1.1}
      modalTitle="Chimera Original UI"
      previewIndex={1}
    />
  );
}
